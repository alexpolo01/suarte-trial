import { useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import useScreenSize from '@/hooks/useScreenSize';
import useStateHandler from '@/hooks/useStateHandler';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import AvailableArtworkCard from './available-artwork-card';

import './index.css';

export default function VirtualList({ fetchData, setFetchData, loadMoreData }) {
  const { cacheHandler, stateHandler } = useStateHandler();
  const screenSize = useScreenSize();
  const listRef = useRef();

  function onActivateLimitedEdition(artworkId) {
    cacheHandler.removeFromCache("inventory_available_artworks"); /** We prevent the pre-cached queries to display wrong data */
    setFetchData({
      ...fetchData,
      data: fetchData.data.map(artwork => {
        if(artwork._id === artworkId) {
          return {
            ...artwork,
            artwork_about: {
              ...artwork.artwork_about,
              artwork_limited_edition: true
            }
          };
        } else {
          return artwork;
        }
      })
    });
  }

  function onContractRenewalChange(artworkId, isAutomatic) {
    cacheHandler.removeFromCache("inventory_available_artworks"); /** We prevent the pre-cached queries to display wrong data */
    setFetchData({
      ...fetchData,
      data: fetchData.data.map(artwork => {
        if(artwork._id === artworkId) {
          return {
            ...artwork,
            artwork_flags: {
              ...artwork.flags,
              automatic_renewal: isAutomatic
            }
          };
        } else {
          return artwork;
        }
      })
    });
  }

  function onWithdrawArtwork(artworkId) {
    cacheHandler.removeFromCache("inventory_available_artworks"); /** We prevent the pre-cached queries to display wrong data */
    setFetchData({
      ...fetchData,
      totalDocs: fetchData.totalDocs - 1,
      data: fetchData.data.filter(artwork => artwork._id !== artworkId)
    });
    cacheHandler.triggerAction("DELETE_ARTWORK");
    stateHandler.set("temporalPopup", { text: "Artwork withdrawal successful", type: "no-navigation" });
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
                      rowRenderer={({ index, style }) => (
                        <div key={fetchData.data[index]._id} style={style} ref={infiniteScrollAssigner(index)}>
                          <AvailableArtworkCard
                            artworkData={fetchData.data[index]}
                            onActivateLimitedEdition={onActivateLimitedEdition}
                            onContractRenewalChange={onContractRenewalChange}
                            onWithdrawArtwork={onWithdrawArtwork}
                          />
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
