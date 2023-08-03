import { useState } from 'react';

import AuthService from '@/services/auth.service';
import PublicFullWidthButton from '@/shared-components/buttons/components/PublicFullWidthButton';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import Text from '@/shared-components/text/components/Text';

import './styles/AuthArtistSignupForm.css';

export default function AuthArtistSignupForm({ setCurrentPage, oobCode, setOobCode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function claimArtistSubmit(e) {
    e.preventDefault();

    if(oobCode !== null) return;

    setLoading(true); 
    setError(null); 

    const { response, data } = await AuthService.claimArtistProfile(e.target.user_email.value);

    if(response.ok) {
      setLoading(false);
      setOobCode(data.oobCode);
    } else if([400, 404, 409].includes(response.status)) {
      setLoading(false);
      setError({ element: data.error_data.element, error_code: data.error_type });
    } 
  }

  return (
    <>
      <Text className="auth-artist-signup__text" paragraph justify small>
                In order to get access as an artist, it is required to have at least one represented artwork in Suarte. 
                Not an artist? Sign up as a <span onClick={()=>setCurrentPage("regular-signup")}>regular user</span>.
      </Text>

      <Text className="auth-artist-signup__text margin" paragraph justify small>
                Enter the email linked to your artworks below:
      </Text>

      <form onSubmit={claimArtistSubmit} className="auth-artist-signup__form">
        <PublicFormInput 
          readOnly={loading || Boolean(oobCode)} 
          error={error} 
          placeholder="Email" 
          type="email" 
          element="user_email"
        />

        {!oobCode && (
          <PublicFullWidthButton loading={loading}>
                        Claim artist profile
          </PublicFullWidthButton>
        )}
      </form>
    </>
  );
}
