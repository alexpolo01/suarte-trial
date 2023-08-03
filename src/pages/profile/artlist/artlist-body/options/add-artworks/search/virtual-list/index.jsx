import { useContext,useEffect, useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import ArtlistDataContext from '@/context/ArtlistDataContext';
import useIsFirstRender from '@/hooks/useIsFirstRender';
import useScreenSize from '@/hooks/useScreenSize';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import Row from './components/Row';

import './index.css';

export default function VirtualList({ items, onLoadMore }) {
  const { artlistData } = useContext(ArtlistDataContext);
  const isFirstRender = useIsFirstRender();
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(()=>{
    if(!isFirstRender) {
      listRef.current.recomputeRowHeights();
    }
  }, [screenSize.width]);

  function isArtworkInArtlist(artworkToCheck) {
    return artlistData.artlist_artworks.some(artwork => artwork._id === artworkToCheck._id);
  }

  return (
    <>
      <InfiniteScroll 
        className="artlist-add-artworks__virtual-container remove-scrollbar" 
        onLoadMore={onLoadMore} 
        shouldLoadMore={items.data.length < items.totalDocs} 
        offsetElements={3} 
        listLength={items.data.length} 
        defaultInfiniteLoaderClassName="artlist-add-artworks__virtual-spinner"
      >
        {({ infiniteScrollAssigner, infiniteScrollParent }) => (
          <WindowScroller scrollElement={infiniteScrollParent ? infiniteScrollParent : window}>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    autoHeight
                    width={width}
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    rowCount={items.data.length}
                    rowHeight={screenSize.width <= 550 ? 62 : screenSize.width <= 1004 ? 70 : 78}
                    scrollTop={scrollTop}
                    overscanRowCount={5}
                    ref={listRef}
                    rowRenderer={({ key, index, style }) => (
                      <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                        <Row 
                          artwork={items.data[index]} 
                          isInArtlist={isArtworkInArtlist(items.data[index])}
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
    </>
  );
}
