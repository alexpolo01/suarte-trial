import { useEffect,useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useScreenSize from '@/hooks/useScreenSize';
import useStateHandler from '@/hooks/useStateHandler';
import OrderCard from '@/shared-components/cards/components/OrderCard';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import SentOrderCard from './sent-order-card';

import './index.css';

export default function VirtualList({ fetchData, setFetchData, loadMoreData }) {
  const { state, stateHandler, cacheHandler } = useStateHandler();
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(() => {
    listRef.current.recomputeRowHeights();
  }, [screenSize.width]);

  function onConfirmReception(orderId) {
    setFetchData({
      ...fetchData,
      totalDocs: fetchData.totalDocs - 1,
      data: fetchData.data.filter(order=>order._id !== orderId)
    });

    cacheHandler.triggerAction("CONFIRM_RECEPTION");

    stateHandler.set("temporalPopup", {
      text: "The reception has been confirmed", 
      type: "no-navigation"
    });
  }

  function onReportIssue(orderId, issueData) {
    setFetchData({
      ...fetchData,
      data: fetchData.data.map(order => {
        if(order._id === orderId) {
          return {
            ...order,
            order_issue: issueData
          };
        } else {
          return order;
        }
      })
    });

    stateHandler.set("temporalPopup", {
      text: "The issue has been reported to the gallery", 
      type: "no-navigation"
    });
  }

  function getRowHeight() {
    if(state.user_session.user_type !== "gallery") {
      return screenSize.width <= 550 ? 225 : screenSize.width <= 1004 ? 241 : 274;
    } else {
      return screenSize.width <= 550 ? 176 : screenSize.width <= 1004 ? 191 : 224;
    }
  }

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
                      rowHeight={getRowHeight()}
                      rowRenderer={({ index, style }) => (
                        <div key={fetchData.data[index]._id} style={style} ref={infiniteScrollAssigner(index)}>
                          {
                            state.user_session.user_type !== "gallery" ?
                              <SentOrderCard 
                                orderData={fetchData.data[index]} 
                                onConfirmReception={onConfirmReception}
                                onReportIssue={onReportIssue}
                              />
                              :
                              <OrderCard orderData={fetchData.data[index]} navigateToView/>
                          }
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
