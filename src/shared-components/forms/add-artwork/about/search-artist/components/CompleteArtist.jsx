import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/CompleteArtist.css';

function CompleteArtistForm({ close, artistToComplete, onComplete }) {
  const { state, cacheHandler } = useStateHandler();
  const [formState, setFormState] = useState(state.user_session._id === artistToComplete.gallery._id ? artistToComplete.artist_email : "");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  async function submitCompleteArtist(e) {
    e.preventDefault();
    setLoading(true);
    setFormError(null);

    const { response, data } = await GalleryService.completeArtistProfile(formState, artistToComplete);

    if(response.ok) {
      onComplete(data);
      cacheHandler.triggerAction("NEW_ARTIST");
      close();
    } else if(response.status === 400) {
      setLoading(false);
      setFormError({ element: data.error_data.element, error_code: data.error_type });
    }
  }

  return (
    <>
      <form onSubmit={submitCompleteArtist} className="complete-artist-form">
        <PublicFormInput 
          readOnly={loading} 
          error={formError} 
          placeholder="Email of the artist" 
          element="artist_email"
          value={formState}
          onChange={e=>setFormState(e.target.value)}
          margin
        />

        <Text className="complete-artist-form__text" paragraph justify small>
          The artist that you just selected was created with a "Gallery owned" type of artwork. 
          To select this artist for your "Work of artist" artwork, you will need to provide the artist's email. 
          The email will enable the Artist to claim their profile in Suarte. 
        </Text>

        <ContinueButton 
          className="complete-artist-form__button mt-m" 
          loading={loading} 
          turnOff={!formState}
        >
          Complete profile
        </ContinueButton>
      </form>
    </>
  );
}

export default function CompleteArtist({ open, close, onClose, artistToComplete, onComplete }) {
  return (
    <>
      <GenericPopup className="complete-artist-popup" open={open} opacity>
        <div className="complete-artist-popup__header">
          <Text className="complete-artist-popup__text" medium>
            Complete artist profile
          </Text>

          <XIcon className="complete-artist-popup__close" onClick={()=>{close(); onClose();}}/>
        </div>

        <CompleteArtistForm
          close={close}
          artistToComplete={artistToComplete}
          onComplete={onComplete}
        />
      </GenericPopup>
    </>
  );
}
