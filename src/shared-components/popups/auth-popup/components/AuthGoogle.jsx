import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

import useStateHandler from '@/hooks/useStateHandler';
import AuthService from '@/services/auth.service';
import { signInWithGoogle } from '@/services/firebase.service';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import './styles/AuthGoogle.css';

export default function AuthGoogle({ close }) {
  const { stateHandler, state } = useStateHandler();
  const [loading, setLoading] = useState(false);

  const googleHandler = async () => {
    setLoading(true);
        
    const firebaseResponse = await signInWithGoogle();

    if(firebaseResponse.code) {
      setLoading(false);
      return;
    }

    const { response, data } = await AuthService.getCustomToken(firebaseResponse.user.accessToken, state.invite);

    if(response.ok) {
      AuthService.initUserSession(stateHandler, setLoading, data);
      close();
    } else if(response.status === 400 && data.error_type === "EMAIL_BELONGS_TO_ARTIST") {
      alert("This email is already associated with an artist");
      setLoading(false);
    }
  };

  return (
    <>
      <button className={`auth-google__button ${loading ? "disabled" : ""}`} onClick={googleHandler}> 
        <FcGoogle className="auth-google__icon"/>
        <Text className="auth-google__text" small>Continue with Google</Text>
        {loading && <CustomSpinner className="auth-google__spinner" thin/>}
      </button>
    </>
  );
}
