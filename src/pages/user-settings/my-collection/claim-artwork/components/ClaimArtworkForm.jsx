import { useState } from 'react';

import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import InputCode from '@/shared-components/inputs/components/InputCode';
import Text from '@/shared-components/text/components/Text';

import './styles/ClaimArtworkForm.css';

export default function ClaimArtworkForm({ onArtworkFound }) {
  const [formState, setFormState] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  async function submitClaimArtwork(claimCode) {
    setLoading(true);

    const { response, data } = await UserService.claimArtwork(claimCode);

    if(response.ok) {
      onArtworkFound(data);
    } else if(response.status === 404) {
      alert("Invalid claim code");
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={e=>{e.preventDefault(); submitClaimArtwork();}} className="claim-artwork-form">
        <Text className="claim-artwork-form__text" paragraph justify small>
                    Did you recently buy an artwork that's featured on Suarte from a physical Gallery? 
                    Please enter the unique verification code that was sent to your email after your purchase.
        </Text>

        <InputCode
          readOnly={loading}
          value={formState}
          codeType="alphanumeric"
          className="claim-artwork-form__input-code"
          onChange={value=>setFormState(value)}
          onComplete={submitClaimArtwork}
        />

        <Text className="claim-artwork-form__text" paragraph justify small>
                    If you can't find the code reach out to us at {" "}
          <a href = "mailto: contact@suarte.art">contact@suarte.art</a>.
        </Text>

        <ContinueButton className="claim-artwork-form__button mt-m" loading={loading}>
                    Claim artwork
        </ContinueButton>
      </form>
    </>
  );
}
