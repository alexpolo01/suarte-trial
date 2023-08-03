import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import FadeIn from '@/shared-components/animations/components/FadeIn';
import PublicFullWidthButton from '@/shared-components/buttons/components/PublicFullWidthButton';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import SuccessText from '@/shared-components/text/components/SuccessText';
import Text from '@/shared-components/text/components/Text';

import ForgotPassword from './ForgotPassword';

import './styles/ChangePasswordForm.css';

export default function ChangePasswordForm() {
  const { state } = useStateHandler();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function changePassword(e) {
    e.preventDefault();
    setLoading(true);
    setError(null); 
    setSuccess(false);

    if(e.target.user_new_password.value !== e.target.user_confirm_new_password.value) {
      setLoading(false);
      setError({ element: "user_confirm_new_password", error_code: "PASSWORD_MISMATCH" });
      return;
    }

    const newPasswordData = {
      user_old_password: e.target.user_old_password.value,
      user_new_password: e.target.user_new_password.value
    };

    const { response, data } = await UserService.changePassword(newPasswordData);

    if(response.ok) {
      setLoading(false);
      setSuccess(true);
    } else if(response.status === 400) {
      setLoading(false);
      setError({ element: data.error_data.element, error_code: data.error_type });
    }
  }

  return (
    <>
      <FadeIn>
        <form onSubmit={changePassword} className="settings-change-password__form">
          <Text className="settings-change-password__heading" medium>
                        Change password
          </Text>

          <PublicFormInput 
            error={error} 
            placeholder="Old password" 
            type="password" 
            element="user_old_password" 
            readOnly={loading || success}
            margin 
          />

          <PublicFormInput 
            error={error} 
            placeholder="New password" 
            type="password" 
            element="user_new_password" 
            readOnly={loading || success}
            margin 
          />

          <PublicFormInput 
            error={error} 
            placeholder="Confirm new password" 
            type="password" 
            element="user_confirm_new_password" 
            readOnly={loading || success}
          />

          <ForgotPassword userEmail={state.user_session.user_email}/>

          <PublicFullWidthButton 
            loading={loading} 
            success={success} 
            successText="Password updated!"
          >
                        Change password
          </PublicFullWidthButton>
        </form>

        {success && (
          <SuccessText className="settings-change-password__success-text">
                        Your password has been updated successfully. You can now log in with your new credentials.
          </SuccessText>
        )}
      </FadeIn>
    </>
  );
}
