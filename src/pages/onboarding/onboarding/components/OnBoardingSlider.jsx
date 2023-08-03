import { useEffect } from 'react';

import useStateHandler from '@/hooks/useStateHandler';

import OnBoardingForm from './OnBoardingForm';
import OnBoardingInfo from './OnBoardingInfo';
import OnBoardingThemeSelector from './OnBoardingThemeSelector';

import './styles/OnBoardingSlider.css';

export default function OnBoardingSlider({ user_type, activeSlide, setActiveSlide }) {
  const { stateHandler, cacheHandler } = useStateHandler();

  useEffect(()=>{
    return () => {
      if(cacheHandler.getCacheValue("canUserCompleteOnboarding")?.data === true) {
        stateHandler.set("user_session.user_flags.onboarding_completed", true);
      }
    };
  }, []);

  function decideSlideStatus(slide) {
    if(slide === activeSlide) return "active";
    if(slide === (activeSlide - 1)) return "exit";
    return "enter";
  }

  return (
    <>
      <div className={`onboarding-slider ${user_type === "gallery" ? "gallery-spacing" : ""}`}>
        {user_type !== "gallery" && (
          <OnBoardingForm 
            user_type={user_type} 
            setActiveSlide={setActiveSlide} 
            className={`onboarding-slider__slide ${decideSlideStatus(1)}`}
            onCreateAccount={()=>cacheHandler.storeInCache("canUserCompleteOnboarding", true, { type: "@cache/no-expiration" })}
          />
        )}
            
        <OnBoardingThemeSelector 
          user_type={user_type} 
          setActiveSlide={setActiveSlide} 
          className={`onboarding-slider__slide second ${decideSlideStatus(user_type === "gallery" ? 1 : 2)}`}
        />
                
        <OnBoardingInfo 
          user_type={user_type}
          className={`onboarding-slider__slide third ${decideSlideStatus(user_type === "gallery" ? 2 : 3)}`}
        />
      </div>
    </>
  );
}
