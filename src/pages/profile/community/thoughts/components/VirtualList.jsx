import { useEffect, useRef,useState } from 'react';
import { AutoSizer, List, WindowScroller } from 'react-virtualized';

import useIsFirstRender from '@/hooks/useIsFirstRender';
import useScreenSize from '@/hooks/useScreenSize';
import useStateHandler from '@/hooks/useStateHandler';
import CommunityThoughtCard from '@/shared-components/cards/components/CommunityThoughtCard';
import InfiniteScroll from '@/shared-components/lists/components/InfiniteScroll';

import "./styles/VirtualList.css";

export default function VirtualList({ items, setItems, onLoadMore, cacheKey }) {
  const { cacheHandler } = useStateHandler();
  const screenSize = useScreenSize();
  const heightsCache = useRef({ cacheValidFor: screenSize.width, heights: items.cache?.cacheValidFor === screenSize.width ? [...items.cache.heights] : [] });
  const [shouldLoadItemsOnRenderPhase, setShouldLoadItemsOnRenderPhase] = useState(heightsCache.current.heights.length > 0);
  const rowMeasurerRef = useRef(document.getElementById("community-thought-card-measurer"));
  const isFirstRender = useIsFirstRender();
  const listRef = useRef();

  function measureRow({ index }) {
    if(!heightsCache.current.heights[index]) {
      const heightOfEmtpyThought = screenSize.width <= 550 ? 72 : screenSize.width <= 1004 ? 105 : 140;
      const heightOfTextContainer = screenSize.width <= 550 ? 36 : screenSize.width <= 1004 ? 40 : 45;
      const internalPaddingsOfThought = screenSize.width <= 550 ? (10 + 8) : screenSize.width <= 1004 ? (12 + 10) : (15 + 12);
      const spacer = screenSize.width <= 550 ? 11 : screenSize.width <= 1004 ? 15 : 20;

      if(!rowMeasurerRef.current) {
        const newRowMeasurer = document.createElement("p");

        newRowMeasurer.id = "community-thought-card-measurer";
        rowMeasurerRef.current = newRowMeasurer;
        document.body.appendChild(newRowMeasurer);
      }
            
      const thoughtText = items.data[index].thought_message;

      rowMeasurerRef.current.innerHTML = thoughtText.length <= 400 ? thoughtText : `${thoughtText.slice(0, 400)}...<span> more</span>`;

      const internalHeight = Math.max(heightOfEmtpyThought, heightOfTextContainer + rowMeasurerRef.current.offsetHeight);

      rowMeasurerRef.current.innerHTML = "";
      heightsCache.current.heights[index] = internalHeight + spacer + internalPaddingsOfThought;
            
      return internalHeight + spacer + internalPaddingsOfThought;
    } else {
      return heightsCache.current.heights[index];
    }
  }

  function onLikeAction(likeStatus, thoughtId) {
    setItems({
      ...items,
      data: items.data.map(thought => {
        if(thought._id === thoughtId) {
          return {
            ...thought,
            thought_likes_count: likeStatus ? thought.thought_likes_count + 1 : thought.thought_likes_count - 1
          };
        } else {
          return thought;
        }
      })
    });
  }

  useEffect(()=>{
    if(!isFirstRender) {
      window.scrollTo(0,0);

      setTimeout(()=>{
        heightsCache.current = { cacheValidFor: screenSize.width, heights: [] };
        listRef.current.recomputeRowHeights();
      }, 50);
    }
  }, [screenSize.width]);

  useEffect(()=>{
    if(!shouldLoadItemsOnRenderPhase) {
      setShouldLoadItemsOnRenderPhase(true);
    }

    return () => {
      const cacheValue = cacheHandler.getCacheValue(cacheKey);

      if(cacheValue) {
        setItems({ ...cacheValue.data, cache: heightsCache.current });
      }
    };
  }, []);

  if(!shouldLoadItemsOnRenderPhase) {
    return (
      <></>
    );
  } else {
    return (
      <>
        <InfiniteScroll 
          onLoadMore={onLoadMore} 
          shouldLoadMore={items.data.length < items.totalDocs} 
          offsetElements={3} 
          listLength={items.data.length} 
          className="profile-community-thoughts__thoughts-infinite-scroll"
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
                      rowCount={items.data.length}
                      rowHeight={measureRow}
                      overscanRowCount={5}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      scrollTop={scrollTop}
                      estimatedRowSize={300}
                      ref={listRef}
                      rowRenderer={({ index, key, style }) => (
                        <div key={key} style={style} ref={infiniteScrollAssigner(index)}>
                          <CommunityThoughtCard 
                            data={items.data[index]} 
                            onLikeAction={(likeStatus)=>onLikeAction(likeStatus, items.data[index]._id)}
                          />
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
}