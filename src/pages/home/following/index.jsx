import { useEffect, useRef, useState } from 'react';
import { AutoSizer, List, WindowScroller } from 'react-virtualized';

import config from '@/config';
import useCache from '@/hooks/useCache';
import useIsFirstRender from '@/hooks/useIsFirstRender';
import useScreenSize from '@/hooks/useScreenSize';
import useStateHandler from '@/hooks/useStateHandler';
import HomeNavigation from '@/shared-components/home/components/HomeNavigation';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';

import ArtlistNotification from './components/ArtlistNotification';
import ArtworkNotification from './components/ArtworkNotification';
import PostNotification from './components/PostNotification';
import RatingNotification from './components/RatingNotification';
import ThoughtNotification from './components/ThoughtNotification';

import './index.css';

export default function HomeFollowing() {
  const { loading, fetchData, setFetchData } = useCache(`home_following`, `${config.apis.api.url}/block9/following`);

  return (
    <>
      <AppNavigationPage>
        <div className="home-following__page">
          <HomeNavigation active="following"/>
          {loading ? <CustomSpinner className="home-following-spinner" thin/>
            :
            <VirtualList items={fetchData} setItems={setFetchData}/>}
        </div>
      </AppNavigationPage>
    </>
  );
}

function VirtualList({ items, setItems }) {

  // TODO: WITH VIRTUOSO THIS IS EASY. NO MESUREMENTS. JUST DO SCROLL RESTORATION LOGIC HERE.
    
  const { cacheHandler } = useStateHandler();
  const screenSize = useScreenSize();
  const heightsCache = useRef({ cacheValidFor: screenSize.width, heights: items.cache?.cacheValidFor === screenSize.width ? [...items.cache.heights] : [] });
  const [shouldLoadItemsOnRenderPhase, setShouldLoadItemsOnRenderPhase] = useState(heightsCache.current.heights.length > 0);
  const isFirstRender = useIsFirstRender();
  const listRef = useRef();

  function measureRow({ index }) {
    if(heightsCache.current.heights[index]) return heightsCache.current.heights[index];
        
    switch(items.data[index].notification_type) {
    case "post": return measurePostNotification(index);
    case "artwork":
    case "collection":
    case "limited_edition": return measureArtworktNotification(index);
    case "artlist": return measureArtlistNotification(index);
    case "rating": return measureRatingNotification(index);
    default: return measureThoughtNotification(index);
    }
  }

  function measurePostNotification(index) {
    const offset = screenSize.width <= 550 ? 148 : screenSize.width <= 1004 ? 177 : 186.32;
    const spacer = screenSize.width <= 550 ? 15 : 20;
    const widthOfImage = screenSize.width <= 550 ? screenSize.width-22-24 : Math.min(screenSize.width-22-30, 648);
    const computedHeight = widthOfImage/1.03 + offset + spacer;
    heightsCache.current.heights[index] = computedHeight;
    return computedHeight;
  }

  function measureArtworktNotification(index) {
    const offset = screenSize.width <= 550 ? 270.5 : screenSize.width <= 1004 ? 310.5 : 337.5;
    const spacer = screenSize.width <= 550 ? 15 : 20;
    const widthOfImage = screenSize.width <= 550 ? screenSize.width-22-24 : Math.min(screenSize.width-22-30, 500);
    const computedHeight = widthOfImage/items.data[index].data.artwork_image.image_aspect_ratio + offset + spacer;
    heightsCache.current.heights[index] = computedHeight;
    return computedHeight;
  }

  function measureArtlistNotification(index) {
    const offset = screenSize.width <= 550 ? 76 : screenSize.width <= 1004 ? 90 : 95;
    const spacer = screenSize.width <= 550 ? 15 : 20;
    const widthOfImage = screenSize.width <= 550 ? screenSize.width-22-24 : Math.min(screenSize.width-22-30, 648);
    const computedHeight = widthOfImage + offset + spacer;
    heightsCache.current.heights[index] = computedHeight;
    return computedHeight;
  }

  function measureRatingNotification(index) {
    const spacer = screenSize.width <= 550 ? 15 : 20;
    if(items.data[index].data.haveIRated) {
      let measurer = document.getElementById("following-rating-measurer");
      if(!measurer) {
        const newRowMeasurer = document.createElement("div");
        newRowMeasurer.id = "following-rating-measurer";
        newRowMeasurer.innerHTML= "<div class='following-rating-measurer__user-img'></div><div class='following-rating-measurer__artwork-img'></div>";
        document.body.appendChild(newRowMeasurer);
        measurer = newRowMeasurer;
      }
      heightsCache.current.heights[index] = measurer.offsetHeight + spacer;
      return measurer.offsetHeight + spacer;
    } else {
      const computedHeight = (screenSize.width <= 550 ? 85 : screenSize.width <= 1004 ? 102 : 127) + spacer;
      heightsCache.current.heights[index] = computedHeight;
      return computedHeight;
    }
  }

  function measureThoughtNotification(index) {
    const heightOfEmtpyThought = screenSize.width <= 550 ? 72 : screenSize.width <= 1004 ? 105 : 140;
    const heightOfTextContainer = screenSize.width <= 550 ? 36 : screenSize.width <= 1004 ? 40 : 45;
    const internalPaddingsOfThought = screenSize.width <= 550 ? (10 + 8) : screenSize.width <= 1004 ? (12 + 10) : (15 + 12);
    const spacer = screenSize.width <= 550 ? 15 : 20;
    let measurer = document.getElementById("following-thought-measurer");

    if(!measurer) {
      const newRowMeasurer = document.createElement("p");
      newRowMeasurer.id = "following-thought-measurer";
      document.body.appendChild(newRowMeasurer);
      measurer = newRowMeasurer;
    }

    const thoughtText = items.data[index].data.thought_text;
    measurer.innerHTML = thoughtText.length <= 250 ? thoughtText : `${thoughtText.slice(0, 250)}...<span> more</span>`;
    const internalHeight = Math.max(heightOfEmtpyThought, heightOfTextContainer + measurer.offsetHeight);
    measurer.innerHTML = "";
    heightsCache.current.heights[index] = internalHeight + spacer + internalPaddingsOfThought;
    return internalHeight + spacer + internalPaddingsOfThought;
  }

  function rowRenderer({ index, key, style }) {
    switch(items.data[index].notification_type) {
    case "post": return <div key={key} style={style}><PostNotification data={items.data[index]}/></div>;
    case "artwork": 
    case "collection":
    case "limited_edition": return <div key={key} style={style}><ArtworkNotification data={items.data[index]}/></div>;
    case "artlist": return <div key={key} style={style}><ArtlistNotification data={items.data[index]}/></div>;
    case "rating": return <div key={key} style={style}><RatingNotification data={items.data[index]}/></div>;
    default: return <div key={key} style={style}><ThoughtNotification data={items.data[index]}/></div>;
    }
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
    if(!shouldLoadItemsOnRenderPhase) setShouldLoadItemsOnRenderPhase(true);
    return () => {
      const cacheValue = cacheHandler.getCacheValue("home_following");

      if(cacheValue) {
        setItems({ ...cacheValue.data, cache: heightsCache.current });
      }
    };
  }, []);

  if(!shouldLoadItemsOnRenderPhase) return <></>;

  return (
    <>
      <div className="home-following-virtual-list">
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
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  estimatedRowSize={1300}
                  ref={listRef}
                  rowRenderer={rowRenderer}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </div>
    </>
  );
}