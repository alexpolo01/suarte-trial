import { useEffect,useRef, useState  } from 'react';
import { AutoSizer, List, WindowScroller } from 'react-virtualized';

import useIsFirstRender from '@/hooks/useIsFirstRender';
import useNavigateToArtwork from '@/hooks/useNavigateToArtwork';
import useScreenSize from '@/hooks/useScreenSize';
import useStateHandler from '@/hooks/useStateHandler';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';

import "./styles/VirtualList.css";

export default function VirtualList({ items, setItems, cacheKey }) {
  const { cacheHandler } = useStateHandler();
  const screenSize = useScreenSize();
  const heightsCache = useRef({ cacheValidFor: screenSize.width, heights: items.cache?.cacheValidFor === screenSize.width ? [...items.cache.heights] : [] });
  const [shouldLoadItemsOnRenderPhase, setShouldLoadItemsOnRenderPhase] = useState(heightsCache.current.heights.length > 0);
  const navigateToArtwork = useNavigateToArtwork(cacheKey, { data: items.artlist_artworks });
  const rowMeasurerRef = useRef(document.getElementById("artlist-view__row-measurer"));
  const isFirstRender = useIsFirstRender();
  const listRef = useRef();

  function measureRow({ index }) {
    if(!heightsCache.current.heights[index]) {
      const spacer = screenSize.width <= 650 ? 11 : 20;

      if(!rowMeasurerRef.current) {
        const newRowMeasurer = document.createElement("div");

        newRowMeasurer.id = "artlist-view__row-measurer";
        document.body.appendChild(newRowMeasurer);
        rowMeasurerRef.current = newRowMeasurer;
      }

      rowMeasurerRef.current.style.aspectRatio = items.artlist_artworks[index].artwork_media.artwork_main_picture.image_original_data.aspect_ratio;
      heightsCache.current.heights[index] = rowMeasurerRef.current.offsetHeight + spacer;

      return rowMeasurerRef.current.offsetHeight + spacer;
    } else {
      return heightsCache.current.heights[index];
    }
  }

  useEffect(()=>{
    if(!isFirstRender) {
      window.scrollTo(0,0);
            
      setTimeout(()=>{
        heightsCache.current = { cacheValidFor: screenSize.width, heights: [] };
        listRef.current.recomputeRowHeights();
      }, 50);
    }
  }, [screenSize.width, items]);

  useEffect(()=>{
    if(!shouldLoadItemsOnRenderPhase) {
      setShouldLoadItemsOnRenderPhase(true);
    }
        
    return () => {
      const cacheValue = cacheHandler.getCacheValue(cacheKey);

      if(cacheValue) {
        setItems({ ...cacheValue.data, cache: heightsCache.current });
      }
    };
  }, []);

  if(!shouldLoadItemsOnRenderPhase) return <></>;

  return (
    <>
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                autoHeight
                width={width === 0 ? 0.1 : width}
                height={height}
                rowCount={items.artlist_artworks.length}
                rowHeight={measureRow}
                overscanRowCount={5}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                estimatedRowSize={screenSize.height}
                ref={listRef}
                rowRenderer={({ index, key, style }) => (
                  <div key={key} style={style}>
                    <ArtworkImage
                      image={items.artlist_artworks[index].artwork_media.artwork_main_picture.image_id} 
                      imageClassName="artlist-content__artwork-image" 
                      imageTemplateClassName="artlist-content__artwork-image-template" 
                      onClick={()=>navigateToArtwork(items.artlist_artworks[index]._id)}
                      style={{
                        aspectRatio: items.artlist_artworks[index].artwork_media.artwork_main_picture.image_original_data.aspect_ratio
                      }}
                    />
                  </div>
                )}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </>
  );
}