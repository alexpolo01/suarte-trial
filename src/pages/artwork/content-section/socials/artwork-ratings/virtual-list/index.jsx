import { useContext,useEffect, useRef, useState } from 'react';
import { AutoSizer,List, WindowScroller } from 'react-virtualized';

import ArtworkDataContext from '@/context/ArtworkDataContext';
import useScreenSize from '@/hooks/useScreenSize';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';
import Text from '@/shared-components/text/components/Text';

import MyRating from './components/MyRating';
import RatingCard from './components/RatingCard';

import './index.css';

export default function VirtualList({ ratingsData, onLoadMore }) {
  const { artworkData } = useContext(ArtworkDataContext);
  const [scrollElement, setScrollElement] = useState(null);
  const screenSize = useScreenSize();
  const scrollElementRef = useRef();
  const listRef = useRef();

  useEffect(() => {
    setScrollElement(scrollElementRef.current);
  }, []);

  return (
    <>
      <div className="artwork-ratings__container remove-scrollbar" ref={scrollElementRef}>
        <ArtworkImage 
          image={artworkData.artwork_media.artwork_main_picture.image_id} 
          imageClassName="artwork-ratings__artwork-picture" 
          imageTemplateClassName="artwork-ratings__artwork-picture"
        />

        <MyRating 
          category="Emotions" 
          text="Does it evoke an emotional response on you?"
          myRating={ratingsData.my_rating.rating_values.emotions} 
          averageRating={ratingsData.emotions_average}
        />

        <MyRating 
          category="Style" 
          text="How would you rate the technique, use of color, composition, originality, and creative choices of the artist in this artwork?"
          myRating={ratingsData.my_rating.rating_values.style} 
          averageRating={ratingsData.style_average}
        />

        <MyRating 
          category="Time travel" 
          text="How likely is this artwork to stand the test of time?"
          myRating={ratingsData.my_rating.rating_values.time_travel} 
          averageRating={ratingsData.time_travel_average}
        />
                
        {ratingsData.data.length > 0 && (
          <>
            <Text className="artwork-ratings__see-other-ratings" paragraph small>
                            See what others have rated
            </Text>

            <InfiniteScroll 
              onLoadMore={onLoadMore} 
              shouldLoadMore={ratingsData.data.length < ratingsData.totalDocs} 
              offsetElements={3} 
              listLength={ratingsData.data.length}
            >
              {({ infiniteScrollAssigner }) => (
                <>
                  <WindowScroller scrollElement={scrollElement ? scrollElement : window}>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => (
                      <AutoSizer disableHeight onResize={() => listRef.current.recomputeRowHeights()}>
                        {({ width }) => (
                          <List
                            autoHeight
                            width={width}
                            height={height}
                            isScrolling={isScrolling}
                            onScroll={onChildScroll}
                            rowCount={ratingsData.data.length}
                            rowHeight={screenSize.width <= 550 ? 172 : screenSize.width <= 1004 ? 195 : 199}
                            scrollTop={scrollTop}
                            overscanRowCount={3}
                            ref={listRef}
                            rowRenderer={({ index, key, style }) => (
                              <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                                <RatingCard myRatingData={ratingsData.my_rating} ratingData={ratingsData.data[index]}/>
                              </div>
                            )}
                          />
                        )}
                      </AutoSizer>
                    )}
                  </WindowScroller>
                </>
              )}
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  );
}
