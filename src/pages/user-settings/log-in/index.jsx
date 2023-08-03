import { useState } from 'react';
import { useIdToken } from 'react-firebase-hooks/auth';

import useStateHandler from '@/hooks/useStateHandler';
import { auth } from '@/services/firebase.service';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import SettingsLoadingPage from '@/shared-components/loaders/components/SettingsLoadingPage';
import SettingsHeading from '@/shared-components/text/components/SettingsHeading';
import Text from '@/shared-components/text/components/Text';

import ChangePasswordForm from './components/ChangePasswordForm';

import './index.css';

export default function LogIn() {
  const { state } = useStateHandler();
  const [changePassword, setChangePassword] = useState(false);
  const [user, loading] = useIdToken(auth);

  if(loading) {
    return (
      <SettingsLoadingPage page="Bank account"/>
    );
  } else {
    return (
      <>
        <SettingsHeading text="Log in"/>
    
        <div className="settings-login__container">
          {
            user.providerData[0].providerId === "google.com" ?
              <>
                <Text className="settings-login__text" style={{ marginBottom: "10px" }} paragraph justify medium>
                                    Account linked with Google.
                </Text>

                <PublicFormInput 
                  className="settings-login__read-only" 
                  placeholder="Email" 
                  element="user_email" 
                  readOnly={true} 
                  fillWith={state.user_session.user_email}
                />

                <PublicFormInput 
                  className="settings-login__read-only" 
                  placeholder="Username" 
                  element="user_username" 
                  readOnly={true} 
                  fillWith={state.user_session.user_username} 
                  margin
                />
              </>
              :
              <>
                <PublicFormInput 
                  className="settings-login__read-only" 
                  placeholder="Email" 
                  element="user_email" 
                  readOnly={true} 
                  fillWith={state.user_session.user_email}
                />
    
                <PublicFormInput 
                  className="settings-login__read-only" 
                  placeholder="Username" 
                  element="user_username" 
                  readOnly={true} 
                  fillWith={state.user_session.user_username} 
                  margin
                />

                <div className="settings-login__password-container">
                  <PublicFormInput
                    placeholder="Password" 
                    element="user_password" 
                    type="password" 
                    readOnly={true} 
                    fillWith="*************"
                  />
                
                  {!changePassword && (
                    <Text className="settings-login__change-password-text element-non-selectable" onClick={()=>setChangePassword(true)} medium>
                                            Change password
                    </Text>
                  )}
                </div>
                
                {changePassword && <ChangePasswordForm/>}
              </>
          }
        </div>
      </>
    );
  }
}