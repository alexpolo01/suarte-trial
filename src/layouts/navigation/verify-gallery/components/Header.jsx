import { useNavigate } from 'react-router-dom';

import useStateHandler from '@/hooks/useStateHandler';
import AuthService from '@/services/auth.service';
import GalleryService from '@/services/gallery.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import SuarteName from '@/shared-components/icons/components/public/SuarteName';
import Text from '@/shared-components/text/components/Text';

import './styles/Header.css';

export default function Header({ artworksCount }) {
  const { cacheHandler } = useStateHandler();
  const navigate = useNavigate();

  function verifyProfileAndContinueToOnboarding() {
    GalleryService.completeOnboarding(); 
    cacheHandler.storeInCache("canUserCompleteOnboarding", true, { type: "@cache/no-expiration" });
    navigate("/onboarding/gallery", { replace: true });
  }

  return (
    <>
      <SuarteName className="verify-gallery__suarte-name"/>

      {
        artworksCount >= 3 ?
          <>
            <ContinueButton className="verify-gallery__gallery-profile-verified-button" onClick={verifyProfileAndContinueToOnboarding}>
                            Begin my journey
            </ContinueButton>

            <div className="verify-gallery__logout-mobile-container">
              <Text className="verify-gallery__logout-mobile-text" small paragraph>
                                Your profile is ready!
              </Text>

              <ContinueButton className="verify-gallery__override-default-font-size" onClick={verifyProfileAndContinueToOnboarding}>
                                Begin my journey
              </ContinueButton>
            </div>
          </>
          :
          <>
            <button onClick={AuthService.logout} className="verify-gallery__logout-desktop-button">
              <Text className="verify-gallery__logout-desktop-button-text" medium>
                                Log out and continue as guest
              </Text>
            </button>

            <div className="verify-gallery__logout-mobile-container">
              <Text className="verify-gallery__logout-mobile-text" small paragraph>
                                You can log out and come back later. Changes will not be lost.
              </Text>
                            
              <ContinueButton className="verify-gallery__override-default-font-size" onClick={AuthService.logout}>
                                Continue as guest
              </ContinueButton>
            </div>
          </>
      }
    </>
  );
}
