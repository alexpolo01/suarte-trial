import { useState } from 'react';

import config from '@/config';
import useScreenSize from '@/hooks/useScreenSize';
import SuarteName from '@/shared-components/icons/components/public/SuarteName';

import OnBoardingSlider from './OnBoardingSlider';

import './styles/OnBoardingLayout.scss';

function OnboardingPagination({ activeSlide, slides }) {
  function renderIndicators() {
    let indicators = [];
    for (let i=0; i < slides; i++) {
      indicators.push(<div className={`onboarding-pagination__indicator ${activeSlide === (i+1) ? "active" : ""}`} key={i}/>);
    }
    return indicators;
  }

  return (
    <>
      <div className="onboarding-pagination__container">
        <div className="onboarding-pagination__indicators">
          {renderIndicators()}
        </div>
      </div>
    </>
  );
}

export default function OnBoardingLayout({ user_type }) {
  const screenSize = useScreenSize();
  const [activeSlide, setActiveSlide] = useState(1);
  const [slides] = useState(user_type === "gallery" ? 2 : 3);

  return (
    <>
      <div className="onboarding-layout__container" style={{ backgroundImage: screenSize.width < 700 ? `url(${config.app.imageServiceDomain}/1dc634fd-ff91-4e23-0227-9e2e4437f700/w=500,blur=20)` : `url(${config.app.imageServiceDomain}/73d03466-3a94-4da0-5a38-163895a91200/w=1000,blur=20)` }}>
        <div className="onboarding-layout__card">
          <SuarteName className="onboarding-layout__suarte-name"/>
          <OnBoardingSlider user_type={user_type} activeSlide={activeSlide} setActiveSlide={setActiveSlide}/>
          <OnboardingPagination activeSlide={activeSlide} slides={slides}/>
        </div>
      </div>
    </>
  );
}
