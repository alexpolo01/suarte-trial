import { useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';

import useStateHandler from "@/hooks/useStateHandler";

import OnBoardingLayout from './components/OnBoardingLayout';
import OnBoardingLoading from './components/OnBoardingLoading';

import './index.scss';

export default function OnBoarding({ user_type }) {
  const { state } = useStateHandler();
  const [isAnimationFinished, setAnimationState] = useState(false);

  useEffect(()=>{
    setTimeout(()=>setAnimationState(true), 2000); /** We display the animation for 2 seconds */
  }, []);

  if(user_type !== state.user_session.user_type) {
    return <Navigate to={`/onboarding/${state.user_session.user_type}`} replace/>;
  }

  return (
    <>
      <div className={`onboarding__container ${isAnimationFinished ? "loading-completed" : ""}`}>
        <OnBoardingLoading />
        <OnBoardingLayout user_type={user_type}/>
      </div>
    </>
  );
}
