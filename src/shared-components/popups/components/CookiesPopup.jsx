import { Link } from 'react-router-dom';

import useStateHandler from '@/hooks/useStateHandler';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';

import './styles/CookiesPopup.css';

// TODO: THIS SHOULD NOT BE IN SHARED-COMPONENTS FOLDER. WE SHOULD HAVE AN APPINIT COMPOUND COMPONENT IN LAYOUTS.
export default function CookiesPopup() {
  const { state, stateHandler } = useStateHandler();

  if(state.cookiesAccepted) {
    return (
      <></>
    );
  } else {
    return (
      <>
        <div className="cookies-popup__container">
          <div className="cookies-popup__content-wrap">
            <p className="cookies-popup__text mt-m">
                            We use cookies to ensure a smooth and secure browsing experience on
                            our website. For more information, please refer to our{" "} 
              <Link to="/cookie-policy" state={{ from: true }}>Cookie Policy</Link>.
            </p>

            <ContinueButton className="cookies-popup__button mt-m" onClick={()=>stateHandler.set("cookiesAccepted", true)}>
                            Accept cookies
            </ContinueButton>
          </div>
        </div>
      </>
    );
  }
}
