import { Link } from 'react-router-dom';

import useStateHandler from '@/hooks/useStateHandler';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import HomeIcon from '@/shared-components/icons/components/navigation/HomeIcon';
import SearchNavbarIcon from '@/shared-components/icons/components/navigation/SearchNavbarIcon';
import TrendingIcon from '@/shared-components/icons/components/navigation/TrendingIcon';
import ThreeDotsIcon from '@/shared-components/icons/components/public/ThreeDotsIcon';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import UserProfileIcon from '@/shared-components/icons/components/user-profile/UserProfileIcon';

import './styles/OnBoardingInfo.css';

export default function OnBoardingInfo({ className, user_type }) {
  const { stateHandler } = useStateHandler();

  return (
    <>
      <div className={className}>
        <p className="onboarding-info__text">
                    Discover more Suarte's feautures from your profile:
        </p>

        <div className="onboarding-info__navbar">
          <HomeIcon className="onboarding-info__navbar-icon"/>
          <SearchNavbarIcon className="onboarding-info__navbar-icon search"/>
          <TrendingIcon className="onboarding-info__navbar-icon"/>
          <UserProfileIcon className="onboarding-info__navbar-icon active"/>
        </div>

        <p className="onboarding-info__text">
          {
            user_type === "gallery" ? 
              "There, you can complete and personalize the information the community sees about your gallery."
              : user_type === "artist" ?
                <>
                                Find Suarte Road on the top-right side 
                  <span className="onboarding-info__profile-icon">
                    <ThreeDotsIcon className="onboarding-info__profile-icon-icon"/>
                  </span>
                                to find out what your next steps are to receive your artist's verification:
                </>
                :
                <>
                                Find Suarte Road on the top-right side 
                  <span className="onboarding-info__profile-icon">
                    <ThreeDotsIcon className="onboarding-info__profile-icon-icon"/>
                  </span>
                                to find out what your next steps are to become an art traveler.
                </>
          }
        </p>

        {
          user_type === "gallery" ? 
            <div className="onboarding-info__info-badge more-margin"/>
            : user_type === "artist" ?
              <ArtistVerifiedIcon className="onboarding-info__info-badge"/>
              :
              <div className="onboarding-info__info-badge more-margin"/>
        }

        {
          user_type === "gallery" ?
            <Link to="/profile" className="onboarding-info__link" onClick={()=>stateHandler.set("user_session.user_flags.onboarding_completed", true)}>
              <ContinueButton link>
                                Complete your profile
              </ContinueButton>
            </Link>
            :
            <Link to="/profile/suarte-road" className="onboarding-info__link" onClick={()=>stateHandler.set("user_session.user_flags.onboarding_completed", true)}>
              <ContinueButton link>
                                Go to Suarte Road
              </ContinueButton>
            </Link>
        }

        <p className="onboarding-info__text or">OR</p>

        <Link to="/" className="onboarding-info__link">
          <ContinueButton link>
                        Dive into Suarte
          </ContinueButton>
        </Link>
      </div>
    </>
  );
}
