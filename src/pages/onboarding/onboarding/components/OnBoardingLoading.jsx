import config from '@/config';

import './styles/OnBoardingLoading.scss';

export default function OnBoardingLoading() {
  return (
    <>
      <div className="onboarding-loading__container">
        <img src={`${config.app.imageServiceDomain}/07e0bb36-e259-4df0-e382-4c78834aa700/w=300`} alt="onboarding loading animation" className="onboarding-loading__loading-image" />
      </div>
    </>
  );
}
