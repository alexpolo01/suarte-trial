import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useIsFirstRender from '@/hooks/useIsFirstRender';
import useStateHandler from '@/hooks/useStateHandler';
import SuarteName from '@/shared-components/icons/components/public/SuarteName';
import XIcon from '@/shared-components/icons/components/public/XIcon';

import PopupToBottomSheet from '../components/PopupToBottomSheet';

import AuthForgotPassword from './components/AuthForgotPassword';
import AuthLogin from './components/AuthLogin';
import AuthNavigation from './components/AuthNavigation';
import AuthRegularSignup from './components/AuthRegularSignup';
import AuthSignupSelector from './components/AuthSignupSelector';
import AuthArtistSignup from './auth-artist-signup';

import './index.css';

function AuthPopupContent({ close }) {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <>
      <div className="auth-popup-content">
        <div className="auth-popup-content__header">
          <SuarteName className="auth-popup-content__header-suarte-name"/>
          <XIcon className="auth-popup-content__header-close" onClick={close}/>
        </div>

        <AuthNavigation currentPage={currentPage} setCurrentPage={setCurrentPage}/>

        <div className="auth-popup-content__wrap remove-scrollbar">
          {
            currentPage === "login" ? 
              <AuthLogin setCurrentPage={setCurrentPage} close={close}/>
              : currentPage === "forgot" ? 
                <AuthForgotPassword/>
                : currentPage === "signup-selector" ? 
                  <AuthSignupSelector setCurrentPage={setCurrentPage}/>
                  : currentPage === "regular-signup" ? 
                    <AuthRegularSignup close={close}/>
                    :
                    <AuthArtistSignup setCurrentPage={setCurrentPage} close={close}/>
          }
        </div>
      </div>
    </>
  );
}

export default function AuthPopup() {
  const { state, stateHandler } = useStateHandler();
  const isFirstRender = useIsFirstRender();
  const location = useLocation();

  useEffect(() => {
    if(!isFirstRender && state.action_denied === "USER_ACCOUNT_REQUIRED") {
      stateHandler.set("action_denied", null); /** Closes the popup in case we navigated to another page */
    }
  }, [location.pathname]);

  function closeAuthSection() {
    stateHandler.set("action_denied", null);
  }

  return (
    <>
      <PopupToBottomSheet 
        className="auth-popup-container" 
        open={state.action_denied === "USER_ACCOUNT_REQUIRED"} 
        close={closeAuthSection} 
        popupOptions={{ opacity: true }}
      >
        <AuthPopupContent close={closeAuthSection}/>
      </PopupToBottomSheet>
    </>
  );
}
