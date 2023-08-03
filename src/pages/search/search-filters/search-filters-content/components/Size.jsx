import { useEffect,useState } from 'react';

import config from '@/config';
import ChooseInput from '@/shared-components/inputs/components/ChooseInput';
import Text from '@/shared-components/text/components/Text';

import CategoryItem from './CategoryItem';
import FilterCategory from './FilterCategory';

import './styles/Size.css';

function CustomSize({ query, setQuery, isMobile }) {
  const [customSize, setCustomSize] = useState(query.size?.isCustomSize ? query.size : { unit: "cm", condition: "smaller", width: "", height: "" });

  function updateCustomSizeValue(key, value) {
    const newCustomSize = { ...customSize, [key]: value };

    setCustomSize(newCustomSize);

    if(isMobile) {
      sendToQuery(newCustomSize);
    }
  }

  function sendToQuery(newCustomSize) {
    if(!newCustomSize.width || !newCustomSize.height) return;

    setQuery({
      ...query, 
      size: {
        ...newCustomSize, 
        isCustomSize: true, 
        displayText: `${newCustomSize.width}${newCustomSize.unit} x ${newCustomSize.height}${newCustomSize.unit}`
      }
    });
  }

  function getPreviewStyles() {
    if(!customSize.width || !customSize.height) return;

    const aspectRatio = customSize.width / customSize.height;

    if(aspectRatio <= 1) {
      return {
        aspectRatio, 
        height: "100%"
      };
    } else {
      return {
        aspectRatio, 
        width: "100%"
      };
    }
  }

  return (
    <>
      <div className="custom-size-choose">
        <ChooseInput 
          value={customSize.unit} 
          optionA="cm" 
          optionB="inch"
          onChange={(newOption)=>updateCustomSizeValue("unit", newOption)}
        />
      </div>

      <div className="custom-size-dimensions__container">
        <div className="custom-size-dimensions__inputs">
          <div className="custom-size-dimensions__input-container">
            <Text className="custom-size-dimensions__input-header" extraSmall>
                            Width
            </Text>

            <div className="custom-size-dimensions__input-box">
              <input 
                type="number" 
                className="custom-size-dimensions__input" 
                defaultValue={customSize.width} 
                autoComplete='off' 
                spellCheck={false} 
                onInput={(e)=>updateCustomSizeValue("width", +e.target.value)}
              />

              <Text className="custom-size-dimensions__input-unit" extraSmallPlus>
                {customSize.unit}
              </Text>
            </div>
          </div>

          <div className="custom-size-dimensions__input-container">
            <Text className="custom-size-dimensions__input-header" extraSmall>
                            Height
            </Text>

            <div className="custom-size-dimensions__input-box">
              <input 
                type="number"
                className="custom-size-dimensions__input" 
                defaultValue={customSize.height} 
                autoComplete='off' 
                spellCheck={false} 
                onInput={(e)=>updateCustomSizeValue("height", +e.target.value)}
              />

              <Text className="custom-size-dimensions__input-unit" extraSmallPlus>
                {customSize.unit}
              </Text>
            </div>
          </div>
        </div>

        <div className="custom-size-dimensions__preview-container">
          <div className="custom-size-dimensions__preview" style={getPreviewStyles()}/>
        </div> 
      </div>

      <div className="custom-size-conditions">
        <CategoryItem 
          displayText="Or smaller"
          isSelected={customSize.condition === "smaller"}
          selectItem={()=>updateCustomSizeValue("condition", "smaller")}
        />

        <CategoryItem 
          displayText="Or bigger"
          isSelected={customSize.condition === "bigger"}
          selectItem={()=>updateCustomSizeValue("condition", "bigger")}
        />

        <CategoryItem 
          displayText="Exactly this size"
          isSelected={customSize.condition === "exact"}
          selectItem={()=>updateCustomSizeValue("condition", "exact")}
        />
      </div>

      {!isMobile && (
        <Text className={`custom-size-search-button ${(!customSize.width || !customSize.height) ? "disabled" : ""}`} small onClick={()=>sendToQuery(customSize)}>
                    Search
        </Text>
      )}
    </>
  );
}

export default function Size({ query, setQuery, isMobile }) {
  const [isCustomSizeMode, setIsCustomSizeMode] = useState(query.size?.isCustomSize);
  const items = config.search.main_search.artwork_filters.size;

  useEffect(()=>{
    if(query.size?.isCustomSize) setIsCustomSizeMode(true);
    else setIsCustomSizeMode(false);
  }, [query.size]);

  return (
    <>
      <FilterCategory 
        className={`size-height-animation ${isCustomSizeMode ? "expanded" : ""}`} 
        category="Size"
        hasItems={query.size} 
        isMobile={isMobile}
      >
        <div className="search-filters-content-size__container">
          {items.map((item, index) => (
            <CategoryItem 
              key={index} 
              displayText={item.displayText}
              isSelected={!isCustomSizeMode && query.size?.displayText === item.displayText}
              selectItem={()=>setQuery({ ...query, size: { isCustomSize: false, ...item } })}
              removeItem={()=>setQuery({ ...query, size: null })}
            />
          ))}

          {/* THE ONLY RESPONSABILITY OF THIS COMPONENT IS TO TRIGGER THE CUSTOM SIZE MODE AND REMOVE THE QUERY VALUE ON REMOVAL IF IT WAS IN THE QUERY */}
          <CategoryItem 
            displayText="Custom size"
            isSelected={isCustomSizeMode}
            selectItem={()=>setIsCustomSizeMode(true)}
            removeItem={()=>{
              setIsCustomSizeMode(false);
              if(query.size?.isCustomSize) setQuery({ ...query, size: null });
            }}
          />

          {isCustomSizeMode && (
            <CustomSize 
              query={query} 
              setQuery={setQuery} 
              isMobile={isMobile}
            />
          )}
        </div>
      </FilterCategory>
    </>
  );
}
