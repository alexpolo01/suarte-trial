import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import config from '@/config';
import useCache from '@/hooks/useCache';
import useScreenSize from '@/hooks/useScreenSize';
import InventoryCard from '@/shared-components/cards/components/InventoryCard';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';
import OrdersSkeleton from '@/shared-components/loaders/components/OrdersSkeleton';
import Text from '@/shared-components/text/components/Text';

import './index.css';

export default function InventorySold() {
  const { loading, fetchData, loadMoreData } = useCache("inventory_sold_artworks", `${config.apis.api.url}/inventory/sold`, {
    injectToken: true,
    invalidateWhen: ["BUY_ARTWORK"]
  });
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  const listRef = useRef();

  if(loading) {
    return (
      <OrdersSkeleton hideHeader/>
    );
  } else if(fetchData.data.length === 0) {
    return (
      <Text className="inventory-sold__empty-text" paragraph small>
                Sold artworks will build this view.
      </Text>
    );
  } else {
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
                <AutoSizer disableHeight onResize={()=>listRef.current.recomputeRowHeights()}>
                  {({ width }) => {
                    return (
                      <List
                        autoHeight
                        width={width}
                        height={height}
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        scrollTop={scrollTop}
                        ref={listRef}
                        overscanRowCount={3}
                        rowCount={fetchData.data.length}
                        rowHeight={screenSize.width <= 550 ? 145 : screenSize.width <= 1004 ? 159 : 190}
                        rowRenderer={({ index, key, style }) => (
                          <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                            <div className="inventory-sold__card-container" onClick={()=>navigate(`/artwork/${fetchData.data[index]._id}`, { state: { from: true } })}>
                              <InventoryCard artworkData={fetchData.data[index]} type="artwork"/>                                                          
                            </div>
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
}
