import { useState } from 'react';

import AuthArtistCodeVerification from './components/AuthArtistCodeVerification';
import AuthArtistCreateAccount from './components/AuthArtistCreateAccount';
import AuthArtistSignupForm from './components/AuthArtistSignupForm';

import './index.css';

export default function AuthArtistSignup({ setCurrentPage, close }) {
  const [isArtistVerified, setIsArtistVerified] = useState(false);
  const [oobCode, setOobCode] = useState(null);

  if(!isArtistVerified) {
    return (
      <>
        <AuthArtistSignupForm 
          setCurrentPage={setCurrentPage} 
          oobCode={oobCode} 
          setOobCode={setOobCode}
        />

        {oobCode && (
          <AuthArtistCodeVerification 
            oobCode={oobCode} 
            setIsArtistVerified={setIsArtistVerified} 
            setCurrentPage={setCurrentPage}
          />
        )}
      </>
    );
  } else {
    return (
      <AuthArtistCreateAccount 
        oobCode={oobCode} 
        setCurrentPage={setCurrentPage} 
        close={close}
      />
    );
  }
}
