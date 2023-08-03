import { NextButton,PrevButton } from '@/shared-components/buttons/components/SliderControls';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import FHSlider from '@/shared-components/sliders/components/FHSlider';
import Text from '@/shared-components/text/components/Text';

import './styles/FiltersRenderer.css';

function FiltersRendererItem({ queryKey, displayText, removeFilterItem }) {
  return (
    <>
      <div className="filters-renderer-item__container element-non-selectable">
        <Text className="filters-renderer-item__text dots-on-overflow" small>
          <span>
            {queryKey}:{" "}
          </span> 

          {displayText}
        </Text>
                
        <XIcon onClick={removeFilterItem}/>
      </div>
    </>
  );
}

/** 
 * @note This component can no longer be generic because each queryKey can have it's own structure because you are now able to customize your query as you want with useQuery! 
 * So, we will have to "re-do" this component for each query object (in case there's multiple search pages with different queries, which is strange xd). 
 * Not a big problem compared to the advantages that we now have with customization :) 
 */
export default function FiltersRenderer({ query, setQuery }) {
  const listLength = getListLength();

  function getListLength() {
    let length = 0;
    length = query.artist ? length + query.artist.length : length;
    length = query.theme ? length + query.theme.length : length;
    length = query.emotion ? length + query.emotion.length : length;
    length = query.medium ? length + query.medium.length : length;
    length = query.color ? length + query.color.length : length;
    length = query.gallery ? length + query.gallery.length : length;
    length = query.size ? length + 1 : length;
    length = query.price ? length + 1 : length;
    return length;
  }

  if(listLength === 0) {
    return <></>;
  }

  return (
    <>
      <FHSlider className="filters-renderer-slider" customPrevButton={<PrevButton/>} customNextButton={<NextButton/>} listLength={listLength}>
        {query.artist?.map(item => (
          <FiltersRendererItem 
            key={item._id} 
            queryKey="Artist" 
            displayText={item.gallery_artist ? item.user_name : item.artist_name} 
            removeFilterItem={()=>setQuery({ ...query, artist: query.artist.filter(artistItem => artistItem._id !== item._id) })}
          />
        ))}

        {query.gallery?.map(item => (
          <FiltersRendererItem 
            key={item._id} 
            queryKey="Gallery" 
            displayText={item.user_name} 
            removeFilterItem={()=>setQuery({ ...query, gallery: query.gallery.filter(galleryItem => galleryItem._id !== item._id) })}
          />
        ))}

        {query.price && (
          <FiltersRendererItem 
            queryKey="Price" 
            displayText={query.price.displayText} 
            removeFilterItem={()=>setQuery({ ...query, price: null })}
          />
        )} 

        {query.size && (
          <FiltersRendererItem 
            queryKey="Size" 
            displayText={query.size.displayText} 
            removeFilterItem={()=>setQuery({ ...query, size: null })}
          />
        )}    

        {query.theme?.map(item => (
          <FiltersRendererItem 
            key={item} 
            queryKey="Theme" 
            displayText={item} 
            removeFilterItem={()=>setQuery({ ...query, theme: query.theme.filter(themeItem => themeItem !== item) })}
          />
        ))} 

        {query.emotion?.map(item => (
          <FiltersRendererItem 
            key={item} 
            queryKey="Emotion" 
            displayText={item} 
            removeFilterItem={()=>setQuery({ ...query, emotion: query.emotion.filter(emotionItem => emotionItem !== item) })}
          />
        ))} 

        {query.medium?.map(item => (
          <FiltersRendererItem 
            key={item} 
            queryKey="Medium" 
            displayText={item} 
            removeFilterItem={()=>setQuery({ ...query, medium: query.medium.filter(mediumItem => mediumItem !== item) })}
          />
        ))} 

        {query.color?.map(item => ( 
          <FiltersRendererItem 
            key={item} 
            queryKey="Color" 
            displayText={item} 
            removeFilterItem={()=>setQuery({ ...query, color: query.color.filter(colorItem => colorItem !== item) })}
          />
        ))}             
      </FHSlider>
    </>
  );
}
