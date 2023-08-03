import useGoBack from '@/hooks/useGoBack';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ShareProfileIcon from '@/shared-components/icons/components/actions/ShareProfileIcon';
import ArtlistIcon from '@/shared-components/icons/components/new-icons/ArtlistIcon';
import CollectionIcon from '@/shared-components/icons/components/new-icons/CollectionIcon';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import CommunityIcon from '@/shared-components/icons/components/user-profile/CommunityIcon';
import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';

import './styles/UserNotFound.css';

export default function UserNotFound() {
  const goBackHandler = useGoBack("/");

  return (
    <>
      <AppNavigationPage>
        <div className="user-not-found__container">
          <div className="user-not-found__main-content">
            <BackArrowIcon className="user-not-found__back" onClick={goBackHandler}/>

            <ShareProfileIcon className="user-not-found__share"/>

            <UserProfileImage className="user-not-found__image"/>

            <span className="user-not-found__text mt-l">
                            User not found
            </span>

            <span className="user-not-found__empty-button"/>

            <div className="user-not-found__buttons">
              <CollectionIcon className="user-not-found__icon"/>
              <CommunityIcon className="user-not-found__icon --community"/>
              <ArtlistIcon className="user-not-found__icon"/>
            </div>
          </div>
        </div>
      </AppNavigationPage>
    </>
  );
}
