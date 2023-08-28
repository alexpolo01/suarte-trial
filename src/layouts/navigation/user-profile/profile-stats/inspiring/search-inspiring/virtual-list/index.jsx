import { useEffect, useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useScreenSize from '@/hooks/useScreenSize';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import Row from './components/Row';

import './index.css';

export default function VirtualList({ items, onLoadMore }) {
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(() => {
    listRef.current.recomputeRowHeights();
  }, [screenSize.width]);

  return (
    <>
      <InfiniteScroll 
        className="render-inspiring-results__container remove-scrollbar" 
        onLoadMore={onLoadMore} 
        shouldLoadMore={items.data.length < items.totalDocs} 
        offsetElements={3} 
        listLength={items.data.length}
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
                    rowHeight={screenSize.width <= 550 ? 63 : 65}
                    scrollTop={scrollTop}
                    overscanRowCount={5}
                    ref={listRef}
                    rowRenderer={({ index, key, style }) => (
                      <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                        <Row item={items.data[index]}/>
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
