import { useState } from 'react';

import AuthService from '@/services/auth.service';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import SuccessText from '@/shared-components/text/components/SuccessText';
import Text from '@/shared-components/text/components/Text';

import './styles/ForgotPassword.css';

export default function ForgotPassword({ userEmail }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function forgotPassword() {
    setLoading(true);

    const { response } = await AuthService.requestResetPassword(userEmail);

    if(response.ok) {
      setLoading(false);
      setSuccess(true);
    }
  }

  return (
    <>
      {
        success ? 
          <SuccessText className="settings-forgot-password__success-text">
                        Request sent. Check your email and follow the steps.
          </SuccessText>
          :
          <div className={`settings-forgot-password__container ${loading ? "disabled" : ""}`}>
            <Text className="settings-forgot-password__button element-non-selectable" onClick={forgotPassword} medium>
                            Forgot password?
            </Text>

            {loading && <CustomSpinner className="settings-forgot-password__spinner" thin/>}
          </div>
      }
    </>
  );
}
