import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import AuthService from '@/services/auth.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import Text from '@/shared-components/text/components/Text';

import AuthGoogle from './AuthGoogle';

import './styles/AuthLogin.css';

export default function AuthLogin({ setCurrentPage, close }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { stateHandler } = useStateHandler();

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(null); 

    const { response, data } = await AuthService.login(e.target.user_email.value, e.target.user_password.value);
        
    if(response.ok) { 
      AuthService.initUserSession(stateHandler, setLoading, data);
      close();
    } else if([400, 404].includes(response.status)) {
      setLoading(false);
      setError({ element: data.error_data.element, error_code: data.error_type });
    }
  };

  return (
    <>
      <form onSubmit={loginSubmit} className="auth-login__form">
        <PublicFormInput error={error} placeholder="Email or username" element="user_email" margin/>
        <PublicFormInput error={error} placeholder="Password" element="user_password" type="password" margin/>
        <Text className="auth-login__forgot-password element-non-selectable" onClick={()=>setCurrentPage("forgot")} small>Forgot your password?</Text>

        <ContinueButton loading={loading} round> 
                    Continue 
        </ContinueButton> 
      </form>

      <Text className="auth-login__or" small>OR</Text>

      <AuthGoogle close={close}/>
    </>
  );
}
