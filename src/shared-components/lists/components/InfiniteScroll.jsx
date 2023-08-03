import { useEffect, useMemo, useRef,useState } from 'react';
import { useInView } from 'react-intersection-observer';

import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';

import './styles/InfiniteScroll.css';

function InfiniteScrollLoader({ shouldLoadMore, customInfiniteLoader, defaultInfiniteLoaderClassName }) {
  if(!shouldLoadMore) {
    return <></>;
  }

  if(customInfiniteLoader) {
    return customInfiniteLoader;
  }

  return (
    <>
      <div className={`infinite-scroll-loader__default-loader-container ${defaultInfiniteLoaderClassName}`}>
        <CustomSpinner className="infinite-scroll-loader__default-loader-spinner" thin/>
      </div>
    </>
  );
}

// TODO: WHEN COMBINED WITH VIRTUAL LISTS, IF THE REFASSIGNER IS ALREADY VISIBLE WHEN LOADED, IT WONT FETCH AGAIN. FIND OUT WHY.

/**
 * My logic, your UI component.
 * 
 * Options:
 * 
 * @onLoadMore -> function that gets called whenever the component detects that new data should be requested.
 * @shouldLoadMore -> Boolean flag that tells the component if we should request more data or not.
 * @offsetElements -> Position of the element (starting from the end) that you want to reach in order to make the request. It's like a threshold measured in elements. If's 1, it means that when we reach the first element (starting from end) we will make another request. We start in 1, not 0. That means the first position is considered as 1 and not zero indexed.
 * @listLength -> Length of the infinite-scroll list
 * @customInfiniteLoader -> HTML for a custom loader in case you need it
 * @defaultInfiniteLoaderClassName -> In case you want to use the default loader, this gives you the ability to style it as you wish :).
 * @id -> Id for the infinite-scroll container
 */
export default function InfiniteScroll({ children, className="", onLoadMore, shouldLoadMore, offsetElements=1, listLength, customInfiniteLoader, defaultInfiniteLoaderClassName, id=null }) {
  const { ref, inView, entry } = useInView({ triggerOnce: true }); /** Trigger once in Virtualized lists is useless because components get mounted and unmounted.  */
  const infiniteScrollIndex = useMemo(()=>Math.max(0, (listLength-offsetElements)), [listLength, offsetElements]);
  const [infiniteScrollParent, setInfiniteScrollParent] = useState(null);
  const infiniteScrollParentRef = useRef();
  const lastIndexThatTriggeredLoadMore = useRef(null);

  useEffect(()=>{
    setInfiniteScrollParent(infiniteScrollParentRef.current);
  }, []);

  useEffect(() => {
    if(inView && shouldLoadMore && lastIndexThatTriggeredLoadMore.current !== infiniteScrollIndex) {
      lastIndexThatTriggeredLoadMore.current = infiniteScrollIndex;
      onLoadMore(); 
    }
  }, [inView, entry?.target]);

  function infiniteScrollAssigner(index) {
    if(index === infiniteScrollIndex) {
      return ref;
    } else {
      return null;
    }
  }

  return (
    <>
      <div className={className} ref={infiniteScrollParentRef} id={id}>
        {/* NESTED DIV TO PREVENT WINDOWSCROLLER SCROLLTOP BUG */}
        <div style={{ width: "100%" }}>
          {children({ infiniteScrollAssigner, infiniteScrollParent })}
        </div>
        <InfiniteScrollLoader shouldLoadMore={shouldLoadMore} customInfiniteLoader={customInfiniteLoader} defaultInfiniteLoaderClassName={defaultInfiniteLoaderClassName}/>
      </div>
    </>
  );
}
