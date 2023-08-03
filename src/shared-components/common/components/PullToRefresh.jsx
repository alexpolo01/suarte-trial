import { useEffect, useRef } from 'react';

import pullToRefresh, { draggableContainerAnimation, staticContainerAnimation } from '@/services/pullToRefresh.service';

import './styles/PullToRefresh.scss';

function PullToRefreshLoader() {
  return(
    <>
      <div className="pull-to-refresh-loading__container">
        <svg className="pull-to-refresh-loading__icon" width="24" height="24" viewBox="0 0 24 24">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>

        <svg className="pull-to-refresh-loading__spinner" width="24" height="24" viewBox="25 25 50 50">
          <circle className="pull-to-refresh-loading__path" cx="50" cy="50" r="20" fill="none" stroke="#4285f4" strokeWidth="4" strokeMiterlimit="10" />
        </svg>
      </div>
    </>
  );
}

/**
 * This Component has a little "bug":
 * 
 * It uses onTouchMove to do the pulling. When i first used it, i encountered a bug: if we had an slider, we couldnt slide it (if the scrollTop was 0) because it was triggering the onTouchEvent of the pulling instead of the native
 * scroll of the browser. So, what i did was to specify a threshold which indicates the max position on which the pulling event will trigger. Right now it's on 80 pixels (you can change it in pullToRefresh.service)
 * So, it's very important that you dont have an slider on top of the page, leave at least some space (so that the sliding is below the threshold) or change the threshold for that view. Maybe it's a good idea that this component
 * can receive a threshold to make it customizable, but for now i'll leave it as it is. But just keep in mind these problems.
 */
export default function PullToRefresh({ children, className='', type="STATIC", onRefresh=null, onEnd=null, screenThreshold=80 }) {
  const pullToRefreshContainer = useRef(null);

  useEffect(() => {
    pullToRefresh({
      container: pullToRefreshContainer.current,
      animates: type === "STATIC" ? staticContainerAnimation : draggableContainerAnimation,
      refresh: () => onRefresh(),
      screenThreshold: screenThreshold,
      onEnd: ()=>{pullToRefreshContainer.current.style.transform = ""; if(onEnd) onEnd();}
    });
  }, []);

  return (
    <>
      <div className={`pull-to-refresh__wrapper ${className}`}>
        <div className="pull-to-refresh__container" ref={pullToRefreshContainer}>
          <PullToRefreshLoader/>
          {children}
        </div>
      </div>
    </>
  );
}
