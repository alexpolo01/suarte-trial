import { useEffect,useRef, useState } from 'react';

import config from '@/config';
import CustomInputRange from '@/shared-components/inputs/components/CustomInputRange';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import CategoryItem from './CategoryItem';
import FilterCategory from './FilterCategory';

import './styles/Price.css';

function CustomPrice({ query, setQuery }) {
  const RANGE_MAX_VALUE = useRef(50000);
  const [customPrice, setCustomPrice] = useState(getInitValues());

  function getInitValues() {
    if(query.price?.isCustomPrice) {
      if(query.price.maxPrice <= query.price.minPrice) { /** if this happens, it means that the user intentionally modified the search param in the url, we swap values */
        return {
          minPrice: query.price.maxPrice, 
          maxPrice: query.price.minPrice
        };
      } else { 
        return {
          minPrice: query.price.minPrice, 
          maxPrice: query.price.maxPrice
        }; 
      }
    } else {
      return {
        minPrice: 0, 
        maxPrice: RANGE_MAX_VALUE.current
      };
    }
  }

  function onInput(e) {
    const value = +e.target.value;

    if(value > customPrice.maxPrice) {
      setCustomPrice({ ...customPrice, maxPrice: value });
    } else if(value < customPrice.minPrice) {
      setCustomPrice({ ...customPrice, minPrice: value });
    } else {
      const minDiff = Math.abs(value - customPrice.minPrice);
      const maxDiff = Math.abs(value - customPrice.maxPrice);

      if(maxDiff < minDiff) {
        setCustomPrice({ ...customPrice, maxPrice: value });
      } else {
        setCustomPrice({ ...customPrice, minPrice: value });
      }
    }
  }

  function sendInputToQuery() {
    if(customPrice.minPrice === 0 && customPrice.maxPrice === RANGE_MAX_VALUE.current) return;
        
    setQuery({ ...query, price: {
      isCustomPrice: true, 
      minPrice: customPrice.minPrice, 
      maxPrice: customPrice.maxPrice,
      displayText: `$${Utils.numberWithCommas(customPrice.minPrice)} - $${Utils.numberWithCommas(customPrice.maxPrice)}${customPrice.maxPrice === RANGE_MAX_VALUE.current ? '+' : ''}`
    } });
  }

  return (
    <>
      <div className="custom-price__input-container">
        <CustomInputRange 
          className="custom-price__min-selector" 
          value={customPrice.minPrice} 
          minValue={0} 
          maxValue={RANGE_MAX_VALUE.current} 
          step={100} 
          thumb 
          customThumb={
            <Text className="custom-price__custom-thumb element-non-selectable" extraSmall>
                            ${Utils.numberWithCommas(customPrice.minPrice)}
              {customPrice.minPrice === RANGE_MAX_VALUE.current ? "+" : ""}
            </Text>
          } 
          onInput={onInput} 
          onMouseUp={sendInputToQuery} 
          onTouchEnd={sendInputToQuery}
        />

        <CustomInputRange 
          className="custom-price__max-selector" 
          value={customPrice.maxPrice} 
          minValue={0} 
          maxValue={RANGE_MAX_VALUE.current} 
          step={100} 
          thumb 
          customThumb={
            <Text className="custom-price__custom-thumb element-non-selectable" extraSmall>
                            ${Utils.numberWithCommas(customPrice.maxPrice)}
              {customPrice.maxPrice === RANGE_MAX_VALUE.current ? "+" : ""}
            </Text>
          }
        />
      </div>
    </>
  );
}

export default function Price({ query, setQuery, isMobile }) {
  const [isCustomPriceMode, setIsCustomPriceMode] = useState(query.price?.isCustomPrice);
  const items = config.search.main_search.artwork_filters.price;

  useEffect(()=>{
    if(query.price?.isCustomPrice) {
      setIsCustomPriceMode(true);
    } else {
      setIsCustomPriceMode(false);
    }
  }, [query.price]);

  return (
    <>
      <FilterCategory className={`price-height-animation ${isCustomPriceMode ? "expanded" : ""}`} category="Price" hasItems={query.price} isMobile={isMobile}>
        <div className="search-filters-content-price__container">
          {items.map((item, index) => (
            <CategoryItem 
              key={index} 
              displayText={item.displayText}
              isSelected={!isCustomPriceMode && query.price?.maxPrice === item.maxPrice}
              selectItem={()=>setQuery({ ...query, price: { isCustomPrice: false, minPrice: item.minPrice, maxPrice: item.maxPrice, displayText: item.displayText } })}
              removeItem={()=>setQuery({ ...query, price: null })}
            />
          ))}

          <CategoryItem 
            displayText="Custom price range"
            isSelected={isCustomPriceMode}
            selectItem={()=>setIsCustomPriceMode(true)}
            removeItem={() => {
              setIsCustomPriceMode(false);
              if(query.price?.isCustomPrice) setQuery({ ...query, price: null });
            }}
          />

          {isCustomPriceMode && <CustomPrice query={query} setQuery={setQuery}/>}
        </div>
      </FilterCategory>
    </>
  );
}
