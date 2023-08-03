import { useEffect,useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useIsFirstRender from "@/hooks/useIsFirstRender";
import useScreenSize from "@/hooks/useScreenSize";
import HomeUserCard from '@/shared-components/home/components/HomeUserCard';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import './styles/VirtualList.css';

export default function VirtualList({ items, onLoadMore }) {
  const listRef = useRef();
  const screenSize = useScreenSize();
  const listSizes = useRef(computeListSizes());
  const isFirstRender = useIsFirstRender();

  function computeListSizes() {
    const widthOfContainer = screenSize.width <= 650 ? screenSize.width-22 : screenSize.width <= 1004 ? screenSize.width-40 : screenSize.width <= 1400 ? screenSize.width-60 : Math.min(1720, screenSize.width - 80);
    const spacer = screenSize.width <= 600 ? 10 : 15;
    const columnsPerRow = screenSize.width <= 692 ? 2 : screenSize.width <= 1100 ? 3 : screenSize.width <= 1500 ? 4 : 5;
    const columnWidth = (widthOfContainer - (columnsPerRow-1)*spacer) / columnsPerRow;
    const rowHeight = computeRowHeight(columnWidth, spacer);

    return { columnWidth, columnsPerRow, rowHeight };
  }

  function computeRowHeight(columnWidth, spacer) {
    const heightOfImage = columnWidth*0.53;
    if(screenSize.width <= 550) return heightOfImage + spacer + 144;
    else if(screenSize.width <= 1004) return heightOfImage + spacer + 167.5;
    else return heightOfImage + spacer + 197;
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
        className="home-galleries__infinite-container"
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
                      estimatedRowSize={450}
                      rowRenderer={({ index, key, style }) => {
                        let columns = [];
                        const fromIndex = index * listSizes.current.columnsPerRow;
                        const toIndex = Math.min(fromIndex + listSizes.current.columnsPerRow, items.data.length);
        
                        for(let i=fromIndex; i<toIndex; i++) {
                          columns.push(
                            <HomeUserCard 
                              key={i} 
                              userData={items.data[i]} 
                              style={{ width: `${listSizes.current.columnWidth}px` }} 
                              infiniteScrollObserver={infiniteScrollAssigner(i)}
                            />
                          );
                        }
        
                        return (
                          <div className="home-galleries__virtual-row" key={key} style={style}>
                            <div className="home-galleries__inner-virtual-row">
                              {columns}
                            </div>
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
