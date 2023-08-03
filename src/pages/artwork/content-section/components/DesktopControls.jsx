import { useSwiper } from 'swiper/react';

import { NextButton,PrevButton } from '@/shared-components/buttons/components/SliderControls';

import './styles/DesktopControls.css';

export default function DesktopControls({ hasPrev, hasNext }) {
  const swiper = useSwiper();
    
  return (
    <>
      {(hasPrev || hasNext) && <div className="artwork-view__desktop-controls">
        <PrevButton className={!hasPrev ? "disabled" : ""} onClick={()=>swiper.slidePrev()}/>
        <NextButton className={!hasNext ? "disabled" : ""} onClick={()=>swiper.slideNext()}/>
      </div>}
    </>
  );
}
