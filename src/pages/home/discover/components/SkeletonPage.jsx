import { NextButton,PrevButton } from '@/shared-components/buttons/components/SliderControls';
import SkeletonArtworkCard from '@/shared-components/loaders/components/SkeletonArtworkCard';
import FHSlider from '@/shared-components/sliders/components/FHSlider';

import './styles/SkeletonPage.css';

function SkeletonSlider() {
  return (
    <>
      <FHSlider 
        speed={1.4} 
        className="home-discover-skeleton-slider" 
        customPrevButton={<PrevButton/>} 
        customNextButton={<NextButton/>}
      >
        <SkeletonArtworkCard className="home-discover-skeleton-slider-card"/> 
        <SkeletonArtworkCard className="home-discover-skeleton-slider-card"/> 
        <SkeletonArtworkCard className="home-discover-skeleton-slider-card"/> 
        <SkeletonArtworkCard className="home-discover-skeleton-slider-card"/> 
        <SkeletonArtworkCard className="home-discover-skeleton-slider-card"/> 
        <SkeletonArtworkCard className="home-discover-skeleton-slider-card"/> 
        <SkeletonArtworkCard className="home-discover-skeleton-slider-card"/> 
        <SkeletonArtworkCard className="home-discover-skeleton-slider-card"/> 
        <SkeletonArtworkCard className="home-discover-skeleton-slider-card"/> 
        <SkeletonArtworkCard className="home-discover-skeleton-slider-card"/> 
      </FHSlider>
    </>
  );
}

export default function SkeletonPage() {
  return (
    <>
      <div className="home-discover-skeleton-page">
        <SkeletonSlider/>

        <div className="home-discover-skeleton-banner"/>

        <SkeletonSlider/>
                
        <SkeletonSlider/>
      </div>
    </>
  );
}
