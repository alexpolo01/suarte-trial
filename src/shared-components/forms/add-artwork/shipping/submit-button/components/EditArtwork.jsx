import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import './styles/EditArtwork.css';

export default function EditArtwork({ formState, setFormError, termsAccepted }) {
  const { cacheHandler } = useStateHandler();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function editArtwork() {
    setLoading(true);
    setFormError(null);

    if(!termsAccepted) {
      setFormError({ element: "artwork_terms", error_code: "ARTWORK_TERMS_NOT_ACCEPTED" });
      setLoading(false);
      return;
    }

    const { response, data } = await GalleryService.editArtwork(formState);

    if(response.ok) {
      setLoading(false); 
      cacheHandler.triggerAction("EDIT_ARTWORK");

      if(data.is_critical) {
        navigate('/inventory/pending', { replace: true });
      } else {
        cacheHandler.storeInCache(`artwork_${data.artwork._id}`, { totalDocs: 1, data: [data.artwork] }, {
          invalidateWhen: ["EDIT_ARTWORK", "DELETE_ARTWORK", "BUY_ARTWORK"]
        });
        navigate(`/artwork/${data.artwork._id}`, { replace: true });
      }
    } else if(response.status === 400) {
      setLoading(false);
      setFormError({ element: data.error_data.element, error_code: data.error_type });
    }
  }

  return (
    <>
      <Text className={`edit-artwork-button element-non-selectable ${loading ? "disabled" : ""}`} onClick={editArtwork} medium>
                Edit artwork
        {loading && <CustomSpinner className="edit-artwork-spinner" thin/>}
      </Text>
    </>
  );
}
