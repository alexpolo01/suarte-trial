import { useEffect,useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useScreenSize from '@/hooks/useScreenSize';
import OrderCard from '@/shared-components/cards/components/OrderCard';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import './styles/VirtualList.css';

export default function VirtualList({ fetchData, loadMoreData }) {
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(() => {
    listRef.current.recomputeRowHeights();
  }, [screenSize.width]);

  return (
    <>
      <InfiniteScroll 
        onLoadMore={loadMoreData} 
        shouldLoadMore={fetchData.data.length < fetchData.totalDocs} 
        offsetElements={3} 
        listLength={fetchData.data.length} 
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
                      rowCount={fetchData.data.length}
                      rowHeight={screenSize.width <= 550 ? 176 : screenSize.width <= 1004 ? 191 : 224}
                      rowRenderer={({ index, key, style }) => (
                        <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                          <OrderCard orderData={fetchData.data[index]} navigateToView/>
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
