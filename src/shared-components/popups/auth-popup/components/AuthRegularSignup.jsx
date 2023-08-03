import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useStateHandler from '@/hooks/useStateHandler';
import AuthService from '@/services/auth.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import Text from '@/shared-components/text/components/Text';

import AuthGoogle from './AuthGoogle';

import './styles/AuthRegularSignup.css';

export default function AuthRegularSignup({ close }) {
  const { state, stateHandler } = useStateHandler();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function signUpSubmit(e) {
    e.preventDefault();
    setLoading(true); 
    setError(null); 

    if(!termsAccepted) {
      setError({ element: "user_terms", error_code: "TERMS_NOT_ACCEPTED" });
      setLoading(false);
      return;
    }

    if(e.target.user_password.value !== e.target.user_confirm_password.value) {
      setError({ element: "user_confirm_password", error_code: "PASSWORD_MISMATCH" });
      setLoading(false);
      return;
    }

    const { response, data } = await AuthService.registerCollector(e.target.user_email.value, e.target.user_password.value, state.invite);

    if(response.ok) {
      AuthService.initUserSession(stateHandler, setLoading, data);
      close();
    }else if(response.status === 400) {
      setLoading(false);
      setError({ element: data.error_data.element, error_code: data.error_type });
    }
  }

  return (
    <>
      <form onSubmit={signUpSubmit} className="auth-regular-signup__form">
        <PublicFormInput error={error} placeholder="Email" element="user_email" type="email" margin/>
        <PublicFormInput error={error} placeholder="Password" element="user_password" type="password" margin/>
        <PublicFormInput error={error} className="auth-regular-signup__input-margin" placeholder="Confirm password" element="user_confirm_password" type="password"/>

        <PublicFormInput error={error} element="user_terms" type="checkbox" value={termsAccepted} onChange={value => setTermsAccepted(value)}>
                    I accept <span className="auth-regular-signup__terms" onClick={()=>navigate("/terms", { state: { from: true } })}>terms and conditions</span>.
        </PublicFormInput>
                             
        <ContinueButton loading={loading} className="auth-regular-signup__submit-button" round> 
                    Continue 
        </ContinueButton>
      </form>
            
      <Text className="auth-regular-signup__or" small>OR</Text>

      <AuthGoogle close={close}/>
    </>
  );
}
