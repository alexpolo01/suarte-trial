import { useEffect,useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useIsFirstRender from '@/hooks/useIsFirstRender';
import useScreenSize from '@/hooks/useScreenSize';
import ArtlistCard from '@/shared-components/cards/components/ArtlistCard';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import './styles/ArtlistsVirtualList.css';

export default function ArtlistsVirtualList({ items, onLoadMore }) {
  const listRef = useRef();
  const screenSize = useScreenSize();
  const listSizes = useRef(computeListSizes());
  const isFirstRender = useIsFirstRender();

  function computeListSizes() {
    const widthOfContainer = Math.min(1178, screenSize.width - 22);
    const spacer = screenSize.width <= 692 ? 10 : 15;
    const columnsPerRow = screenSize.width <= 692 ? 2 : 3;
    const columnWidth = (widthOfContainer - (columnsPerRow-1)*spacer) / columnsPerRow;
    const rowHeight = computeRowHeight(columnWidth, spacer);
    return { columnWidth, columnsPerRow, rowHeight };
  }

  function computeRowHeight(columnWidth, spacer) {
    const heightOfImage = columnWidth - 22;
    if(screenSize.width <= 550) return heightOfImage + spacer + 56;
    else if(screenSize.width <= 1004) return heightOfImage + spacer + 62;
    else return heightOfImage + spacer + 65;
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
                      estimatedRowSize={500}
                      rowRenderer={({ index, key, style }) => {
                        let columns = [];
                        const fromIndex = index * listSizes.current.columnsPerRow;
                        const toIndex = Math.min(fromIndex + listSizes.current.columnsPerRow, items.data.length);
        
                        for(let i=fromIndex; i<toIndex; i++) {
                          columns.push(
                            <ArtlistCard 
                              key={i} 
                              data={items.data[i]} 
                              style={{ width: `${listSizes.current.columnWidth}px` }} 
                              infiniteScrollObserver={infiniteScrollAssigner(i)}
                            />
                          );
                        }
        
                        return (
                          <div className="profile-artlists__artlists-virtual-row" key={key} style={style}>
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
