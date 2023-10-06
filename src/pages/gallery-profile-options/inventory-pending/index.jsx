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

export default function InventoryPending() {
  const { loading, fetchData, loadMoreData } = useCache("inventory_pending_artworks", `${config.apis.api.url}/inventory/pending`, {
    injectToken: true,
    invalidateWhen: ["EDIT_ARTWORK", "NEW_ARTWORK_REQUEST"]
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
      <Text className="inventory-pending__empty-text" paragraph small>
                There are currently no artworks pending approval.
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
                            <div 
                              className="inventory-pending__card-container"
                              onClick={() => (
                                navigate("/artwork-request", {
                                  state: {
                                    from: true, 
                                    draftData: fetchData.data[index]
                                  }
                                })
                              )}
                            >
                              <InventoryCard artworkData={fetchData.data[index]} type="draft">
                                {
                                  fetchData.data[index].draft_status === "pending" ?
                                    <span className="inventory-pending__status-card pending mt-s">
                                                                            Pending approval
                                    </span> 
                                    :
                                    <span className="inventory-pending__status-card changes mt-s">
                                                                            Changes required
                                    </span>
                                }                                                            
                              </InventoryCard>
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
