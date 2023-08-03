import { useContext,useEffect, useMemo, useRef } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import ProfileDataContext from '@/context/ProfileDataContext';
import useIsFirstRender from '@/hooks/useIsFirstRender';
import useScreenSize from '@/hooks/useScreenSize';
import CommunityNotRatedCard from '@/shared-components/cards/components/CommunityNotRatedCard';
import CommunityRatingCard from '@/shared-components/cards/components/CommunityRatingCard';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import "./styles/VirtualList.css";

export default function VirtualList({ items, onLoadMore }) {
  const { profileData } = useContext(ProfileDataContext);
  const screenSize = useScreenSize();
  const isFirstRender = useIsFirstRender();
  const heightOfRatingCard = useMemo(()=>computeRatingHeight(), [screenSize]);
  const listRef = useRef();

  function computeRatingHeight() {
    const ratingMeasurer = document.createElement("div");

    ratingMeasurer.innerHTML = "<div class='community-rating-measurer__container'><div class='community-rating-measurer__user-img'></div><div class='community-rating-measurer__artwork-img'></div></div>";
    document.body.appendChild(ratingMeasurer);

    const height = ratingMeasurer.offsetHeight;

    document.body.removeChild(ratingMeasurer);

    return height;
  }

  function computeRowHeight({ index }) {
    const spacer = screenSize.width <= 550 ? 12 : screenSize.width <= 1004 ? 15 : 20;

    if(!items.data[index].my_rating) {
      return (screenSize.width <= 550 ? 85 : screenSize.width <= 1004 ? 102 : 127) + spacer;
    } else {
      return heightOfRatingCard + spacer;
    }
  }

  useEffect(() => {
    if(!isFirstRender) {
      listRef.current.recomputeRowHeights();
    }
  }, [screenSize]);

  return (
    <>
      <InfiniteScroll 
        className="profile-community-ratings__ratings-infinite-scroll" 
        onLoadMore={onLoadMore} 
        shouldLoadMore={items.data.length < items.totalDocs} 
        offsetElements={3} 
        listLength={items.data.length}
      >
        {({ infiniteScrollAssigner }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    autoHeight
                    width={width === 0 ? 0.1 : width}
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    rowCount={items.data.length}
                    rowHeight={computeRowHeight}
                    estimatedRowSize={400}
                    scrollTop={scrollTop}
                    overscanRowCount={5}
                    ref={listRef}
                    rowRenderer={({ index, key, style }) => (
                      <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                        {
                          items.data[index].my_rating ? 
                            <CommunityRatingCard data={items.data[index]} ratingUser={profileData}/> 
                            : 
                            <CommunityNotRatedCard data={items.data[index]} ratingUser={profileData}/>
                        }
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