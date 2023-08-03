import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import './styles/SubmitArtworkDraft.css';

export default function SubmitArtworkDraft({ formState, setFormError, termsAccepted }) {
  const { cacheHandler } = useStateHandler();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submitArtworkDraft() {
    setLoading(true);
    setFormError(null);

    if(!termsAccepted) {
      setFormError({ element: "artwork_terms", error_code: "ARTWORK_TERMS_NOT_ACCEPTED" });
      setLoading(false);
      return;
    }

    const { response, data } = await GalleryService.saveArtworkDraft(formState, { about: true, media: true, shipping: true });

    if(response.ok) {
      alert("Artwork created successfully!");
      setLoading(false); 
      cacheHandler.triggerAction("NEW_ARTWORK_REQUEST");
      navigate('/inventory/pending', { replace: true });
    } else if(response.status === 400) {
      setLoading(false);
      setFormError({ element: data.error_data.element, error_code: data.error_type });
    }
  }

  return (
    <>
      <Text className={`submit-artwork-draft-button element-non-selectable ${loading ? "disabled" : ""}`} onClick={submitArtworkDraft} medium>
                Submit artwork
        {loading && <CustomSpinner className="submit-artwork-draft-spinner" thin/>}
      </Text>
    </>
  );
}
