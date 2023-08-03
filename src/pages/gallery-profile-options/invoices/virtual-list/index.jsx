import { useEffect,useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useScreenSize from "@/hooks/useScreenSize";
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import InvoiceCard from "./components/InvoiceCard";

export default function VirtualList({ items, onLoadMore }) {
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(()=>{
    listRef.current.recomputeRowHeights(); 
  }, [screenSize.width]);

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
                      rowCount={items.data.length}
                      rowHeight={screenSize.width <= 550 ? 55 : 60}
                      rowRenderer={({ index, key, style }) => (
                        <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                          <InvoiceCard invoiceData={items.data[index]}/>
                        </div>
                      )}
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
