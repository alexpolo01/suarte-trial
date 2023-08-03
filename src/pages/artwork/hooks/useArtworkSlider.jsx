import { useRef } from 'react';
import { useSwiper, useSwiperSlide } from 'swiper/react';

import useThrottling from '@/hooks/useThrottling';

export default function useArtworkSlider(scrollableDiv) {
  const throttle = useThrottling();
  const overflowSituation = useRef();
  const touchStartScreenPosition = useRef(null);
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  function onTouchStart(e) {
    const { scrollTop, scrollHeight, clientHeight } = scrollableDiv.current;
    if(scrollHeight - clientHeight - scrollTop <= 0) overflowSituation.current = "overflow-bottom"; /** Note: The condition <= is due to the 100vh bug in mobile web browsers. It should be === but mobile web browsers are not exact with 100vh so they give negative values and not exactly 0 */
    else if(scrollTop === 0) overflowSituation.current = "overflow-top";
    else overflowSituation.current = "";
    touchStartScreenPosition.current = e.touches[0].clientY;
  }

  function onTouchEnd(e) {
    const { scrollHeight, clientHeight } = scrollableDiv.current;
    const newScreenPosition = e.changedTouches[0].clientY;
    const swipeThreshold = 80;
    if(Math.abs(newScreenPosition - touchStartScreenPosition.current) < swipeThreshold) return;
    if((scrollHeight === clientHeight || overflowSituation.current === "overflow-top") && newScreenPosition > touchStartScreenPosition.current && swiperSlide.isActive) swiper.slidePrev(); 
    else if((scrollHeight === clientHeight || overflowSituation.current === "overflow-bottom") && newScreenPosition < touchStartScreenPosition.current && swiperSlide.isActive) swiper.slideNext();
  }

  function onWheel(e) {
    throttle(()=>{
      const { scrollTop, scrollHeight, clientHeight } = scrollableDiv.current;
      if((scrollHeight === clientHeight || scrollTop===0) && e.deltaY < 0 && swiperSlide.isActive) swiper.slidePrev(); 
      else if((scrollHeight === clientHeight || scrollHeight - clientHeight - scrollTop === 0) && e.deltaY > 0 && swiperSlide.isActive) swiper.slideNext();
    });
  }

  return { onTouchStart, onTouchEnd, onWheel };
}