import { useState } from 'react';

import config from '@/config';
import AuthService from '@/services/auth.service';
import FadeIn from '@/shared-components/animations/components/FadeIn';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import TimeLeft from '@/shared-components/common/components/TimeLeft';
import Text from '@/shared-components/text/components/Text';

import AuthArtistInputCode from './AuthArtistInputCode';

import './styles/AuthArtistCodeVerification.css';

function AuthArtistResendCode({ oobCode, setCurrentPage }) {
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(null);

  async function resendCode() {
    setLoading(true);

    const { response } = await AuthService.resendArtistCode(oobCode);

    if(response.ok) {
      setLoading(false);
      setCooldown(Date.now() + config.app.verification_code_resend_in);
    } else {
      alert("This link has already been used or it has expired.");
      setCurrentPage("signup-selector");
    }
  }

  if(cooldown > Date.now()) {
    return (
      <TimeLeft endsIn={cooldown} onEnd={()=>setCooldown(null)}>
        {({ timeLeft })=>(
          <Text className="auth-artist-resend-code disabled" small>
                        Resend in {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : `${timeLeft.minutes}`}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : `${timeLeft.seconds}`}
          </Text>
        )}
      </TimeLeft>
    );
  }

  return (
    <>
      <Text className={`auth-artist-resend-code element-non-selectable ${loading ? "loading" : ""}`} onClick={resendCode} small>
                Resend code
      </Text>
    </>
  );
}

export default function AuthArtistCodeVerification({ oobCode, setIsArtistVerified, setCurrentPage }) {
  const [loading, setLoading] = useState(false);

  async function verificationCodeSubmit(e) {
    e.preventDefault();
    setLoading(true); 

    const { response } = await AuthService.verifyArtistCode(e.target.verification_code.value, oobCode);
        
    if(response.ok) {
      setLoading(false);
      setIsArtistVerified(true);
    } else if(response.status === 400) {
      setLoading(false);
      alert("Invalid verification code. Please try again.");
    } else if(response.status === 404) {
      alert("This verification code has already been used or it has expired.");
      setCurrentPage("signup-selector");
    }
  }

  return (
    <>
      <FadeIn>
        <div className="auth-artist-code-verification__container">
          <Text className="auth-artist-code-verification__text" paragraph small>Check your email and enter the verification code.</Text>

          <form onSubmit={verificationCodeSubmit} className="auth-artist-code-verification__form">
            <AuthArtistInputCode loading={loading} length={6} element="verification_code"/>

            <div className="auth-artist-code-verification__resend-container">
              <AuthArtistResendCode oobCode={oobCode} setCurrentPage={setCurrentPage}/>
            </div>

            <ContinueButton loading={loading} round>Verify</ContinueButton>
          </form>
        </div>
      </FadeIn>
    </>
  );
}
