import { useEffect,useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useIsFirstRender from '@/hooks/useIsFirstRender';
import useScreenSize from '@/hooks/useScreenSize';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import ArtworksSlider from './components/ArtworksSlider';

export default function VirtualList({ items, onLoadMore, openArtistPreview, openEditArtist }) {
  const isFirstRender = useIsFirstRender();
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(()=>{
    if(!isFirstRender) {
      listRef.current.recomputeRowHeights();
    }
  }, [screenSize.width]);

  return (
    <>
      <div style={{ paddingTop: "5px" }}>
        <InfiniteScroll 
          onLoadMore={onLoadMore} 
          shouldLoadMore={items.data.length < items.totalDocs} 
          offsetElements={3} 
          listLength={items.data.length}
        >
          {({ infiniteScrollAssigner }) => (
            <WindowScroller>
              {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <List
                      autoHeight
                      width={width === 0 ? 0.1 : width}
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      rowCount={items.data.length}
                      rowHeight={screenSize.width <= 550 ? 283 + 30 : screenSize.width <= 1004 ? 330 + 40 : 396 + 50}
                      scrollTop={scrollTop}
                      overscanRowCount={1}
                      ref={listRef}
                      rowRenderer={({ index, key, style }) => (
                        <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                          <ArtworksSlider
                            artistData={items.data[index]}
                            openArtistPreview={openArtistPreview}
                            openEditArtist={openEditArtist}
                          />
                        </div>
                      )}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
}
