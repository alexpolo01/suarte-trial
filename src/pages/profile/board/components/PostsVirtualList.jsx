import { useEffect, useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useIsFirstRender from '@/hooks/useIsFirstRender';
import useScreenSize from '@/hooks/useScreenSize';
import PostCard from '@/shared-components/cards/components/PostCard';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import './styles/PostsVirtualList.css';

export default function PostsVirtualList({ items, onLoadMore }) {
  const listRef = useRef();
  const screenSize = useScreenSize();
  const listSizes = useRef(computeListSizes());
  const isFirstRender = useIsFirstRender();

  function computeListSizes() {
    const widthOfContainer = Math.min(1178, screenSize.width - 22);
    const spacer = screenSize.width <= 692 ? 10 : 15;
    const columnsPerRow = screenSize.width <= 692 ? 2 : 3;
    const columnWidth = (widthOfContainer - (columnsPerRow-1)*spacer) / columnsPerRow;
    const rowHeight = columnWidth*4/3 + spacer;
    return { columnWidth, columnsPerRow, rowHeight };
  }

  useEffect(()=>{
    if(!isFirstRender) {
      listSizes.current = computeListSizes();
      listRef.current.recomputeRowHeights();
    } 
  }, [screenSize]);

  return (
    <>
      <InfiniteScroll 
        className="profile-board__infinite-scroll-container" 
        onLoadMore={onLoadMore} 
        shouldLoadMore={items.data.length < items.totalDocs} 
        offsetElements={3} 
        listLength={items.data.length}
      >
        {({ infiniteScrollAssigner }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => {
                  return (
                    <List
                      autoHeight
                      width={width === 0 ? 0.1 : width}
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      scrollTop={scrollTop}
                      ref={listRef}
                      overscanRowCount={3}
                      rowCount={Math.ceil(items.data.length / listSizes.current.columnsPerRow)}
                      rowHeight={listSizes.current.rowHeight}
                      estimatedRowSize={600}
                      rowRenderer={({ index, key, style }) => {
                        let columns = [];
                        const fromIndex = index * listSizes.current.columnsPerRow;
                        const toIndex = Math.min(fromIndex + listSizes.current.columnsPerRow, items.data.length);
        
                        for(let i=fromIndex; i<toIndex; i++) {
                          columns.push(
                            <PostCard 
                              key={i} 
                              data={items.data[i]} 
                              style={{ width: `${listSizes.current.columnWidth}px` }} 
                              infiniteScrollObserver={infiniteScrollAssigner(i)}
                            />
                          );
                        }
        
                        return (
                          <div className="profile-board__posts-virtual-row" key={key} style={style}>
                            {columns}
                          </div>
                        );
                      }}
                    />
                  );
                }}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteScroll>
    </>
  );
}
