import { useEffect,useRef } from 'react';
import { AutoSizer, Collection, WindowScroller } from 'react-virtualized';

import useIsFirstRender from '@/hooks/useIsFirstRender';
import useScreenSize from '@/hooks/useScreenSize';
import ArtworkCard from '@/shared-components/cards/components/ArtworkCard';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import './styles/VirtualList.css';

export default function VirtualList({ items, onLoadMore, navigateToArtwork }) {
  const screenSize = useScreenSize();
  const columnSizesCache = useRef(initColumnSizesCache());
  const sizeAndPositionCache = useRef([]);
  const collectionRef = useRef();
  const isFirstRender = useIsFirstRender();

  function initColumnSizesCache() {
    const columnCount = screenSize.width <= 600 ? 2 : 3;
    const spacer = 10;
    const widthOfList = screenSize.width <= 800 ? screenSize.width - 22 : 770;
    const columnWidth = (widthOfList - spacer*(columnCount-1)) / columnCount;
    let columnStarts = [];
    let columnHeights = [];

    for(let i=0; i<columnCount; i++) {
      if(i===0) columnStarts[i] = 0; 
      else columnStarts[i] = columnStarts[i-1] + columnWidth + spacer;
      columnHeights[i] = 0;
    }

    return { columnCount, columnWidth, spacer, columnStarts, columnHeights };
  }

  function cellSizeAndPositionGetter({ index }) {
    if(!sizeAndPositionCache.current[index]) {
      const heightOfImage = columnSizesCache.current.columnWidth / items.data[index].artwork_media.artwork_main_picture.image_original_data.aspect_ratio;
      const heightOfItem = screenSize.width <= 550 ? heightOfImage + 92.5 : screenSize.width <= 1004 ? heightOfImage + 95.5 : heightOfImage + 102;
      const shortestColumn = columnSizesCache.current.columnHeights.indexOf(Math.min(...columnSizesCache.current.columnHeights));
      const item_x = columnSizesCache.current.columnStarts[shortestColumn];
      const item_y = columnSizesCache.current.columnHeights[shortestColumn];
    
      columnSizesCache.current.columnHeights[shortestColumn] += heightOfItem + columnSizesCache.current.spacer;

      const calculatedSizeAndPosition = {
        width: columnSizesCache.current.columnWidth,
        height: heightOfItem,
        x: item_x,
        y: item_y
      };

      sizeAndPositionCache.current[index] = calculatedSizeAndPosition;
            
      return calculatedSizeAndPosition;
    } else {
      return sizeAndPositionCache.current[index];
    }
  }

  useEffect(() => {
    if(!isFirstRender) {
      columnSizesCache.current = initColumnSizesCache();
      sizeAndPositionCache.current = [];
      collectionRef.current.recomputeCellSizesAndPositions();
    }
  }, [screenSize]);

  return (
    <>
      <InfiniteScroll 
        className="artist-artworks-content__list-container remove-scrollbar" 
        onLoadMore={onLoadMore} 
        shouldLoadMore={items.data.length < items.totalDocs} 
        listLength={items.data.length} 
        defaultInfiniteLoaderClassName="artist-artworks-content__infinite-scroll-spinner"
      >
        {({ infiniteScrollAssigner, infiniteScrollParent }) => (
          <WindowScroller scrollElement={infiniteScrollParent ? infiniteScrollParent : window}>
            {({ height, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <Collection
                    autoHeight
                    width={width}
                    height={height}
                    scrollTop={scrollTop}
                    ref={collectionRef}
                    cellCount={items.data.length}
                    cellSizeAndPositionGetter={cellSizeAndPositionGetter}
                    className="remove-scrollbar"
                    cellRenderer={({ index, key, style }) => (
                      <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                        <ArtworkCard artworkData={items.data[index]} onClick={()=>navigateToArtwork(items.data[index]._id)}/>
                      </div>
                    )}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteScroll>
    </>
  );
}