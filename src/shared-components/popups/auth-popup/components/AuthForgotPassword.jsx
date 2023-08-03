import { useState } from 'react';

import AuthService from '@/services/auth.service';
import FadeIn from '@/shared-components/animations/components/FadeIn';
import PublicFullWidthButton from '@/shared-components/buttons/components/PublicFullWidthButton';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import Text from '@/shared-components/text/components/Text';

import AuthSuccessText from './AuthSuccessText';

import './styles/AuthForgotPassword.css';

function AuthForgotPasswordResend() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function resendForgot() {
    setLoading(true);

    const { value } = document.getElementById("user_email");
    const { response } = await AuthService.requestResetPassword(value);

    if(response.ok) {
      setLoading(false);
      setSuccess(true);
    }
  }

  return (
    <>
      <span className={`auth-forgot-password__resend-button element-non-selectable ${success ? "success" : loading ? "disabled" : ""}`} onClick={resendForgot}>
        {success ? "Sent!" : "Click here to resend."}
      </span>
    </>
  );
}

export default function AuthForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const forgotSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(null); 
    setSuccess(false);

    const { response, data } = await AuthService.requestResetPassword(e.target.user_email.value);

    if(response.ok) {
      setLoading(false);
      setSuccess(true);
    } else if(response.status === 400) {
      setLoading(false);
      setError({ element: data.error_data.element, error_code: data.error_type });
    }  
  };

  return (
    <>
      <Text className="auth-forgot-password__heading" medium>
                Forgot your password?
      </Text>

      <Text className="auth-forgot-password__text" paragraph justify small>
                That's okay, it happens. Please, enter your email below to reset your password.
      </Text>

      <form onSubmit={forgotSubmit} className="auth-forgot-password__form">
        <PublicFormInput className="auth-forgot-password__input" placeholder="Email or username" element="user_email" error={error} readOnly={success}/>

        <PublicFullWidthButton loading={loading} success={success} successText="Request sent!">
                    Send Email
        </PublicFullWidthButton>
      </form>

      {success && <FadeIn>
        <AuthSuccessText className="auth-forgot-password__success-text">
                    We've sent you an email to reset your password. Make sure to check all your inboxes
                    and note that it may take a few minutes to arrive. Didn't receive anything? <AuthForgotPasswordResend/>
        </AuthSuccessText>
      </FadeIn>}
    </>
  );
}
