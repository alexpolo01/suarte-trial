import ArtistIcon from '@/shared-components/icons/components/user-profile/ArtistIcon';
import GalleryIcon from '@/shared-components/icons/components/user-profile/GalleryIcon';
import UserIcon from '@/shared-components/icons/components/user-profile/UserIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/AuthSignupSelector.css';

export default function AuthSignupSelector({ setCurrentPage }) {
  return (
    <>
      <div className="auth-signup-selector__container" onClick={()=>setCurrentPage("regular-signup")}>
        <div className="auth-signup-selector__icon-box">
          <UserIcon className="auth-sign-up-selector__icon"/>
        </div>

        <Text className="auth-signup-selector__text" medium>
                    As an art lover
        </Text>
      </div>

      <div className="auth-signup-selector__container" onClick={()=>window.location = "https://join.suarte.art"}>
        <div className="auth-signup-selector__icon-box">
          <GalleryIcon className="auth-sign-up-selector__icon"/>
        </div>

        <Text className="auth-signup-selector__text" medium>
                    As a gallery
        </Text>
      </div>

      <div className="auth-signup-selector__container" onClick={()=>setCurrentPage("artist-signup")}>
        <div className="auth-signup-selector__icon-box">
          <ArtistIcon className="auth-sign-up-selector__icon artist"/>
        </div>

        <Text className="auth-signup-selector__text" medium>
                    As an artist
        </Text>
      </div>
    </>
  );
}
