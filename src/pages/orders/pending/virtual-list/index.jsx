import { useEffect,useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useScreenSize from '@/hooks/useScreenSize';
import useStateHandler from '@/hooks/useStateHandler';
import OrderCard from '@/shared-components/cards/components/OrderCard';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import AddShippingDetailsCard from './components/AddShippingDetailsCard';

import './index.css';

export default function VirtualList({ fetchData, setFetchData, loadMoreData }) {
  const { state, stateHandler, cacheHandler } = useStateHandler();
  const screenSize = useScreenSize();
  const listRef = useRef();

  useEffect(() => {
    listRef.current.recomputeRowHeights();
  }, [screenSize.width]);

  function onAddShippingDetails(orderId) {
    setFetchData({
      ...fetchData,
      totalDocs: fetchData.totalDocs - 1,
      data: fetchData.data.filter(order=>order._id !== orderId)
    });

    cacheHandler.triggerAction("PROVIDE_SHIPPING_NUMBER");

    stateHandler.set("temporalPopup", {
      text: "Shipping details updated for the order!", 
      type: "no-navigation"
    });
  }

  function getRowHeight() {
    if(state.user_session.user_type === "gallery") {
      return screenSize.width <= 550 ? 350 : screenSize.width <= 1004 ? 368 : 410;
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
                            state.user_session.user_type === "gallery" ?
                              <AddShippingDetailsCard orderData={fetchData.data[index]} onAddShippingDetails={onAddShippingDetails}/>
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
