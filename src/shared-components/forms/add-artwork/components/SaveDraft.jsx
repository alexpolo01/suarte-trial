import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import './styles/SaveDraft.css';

export default function SaveDraft({ formState, setFormState, initialState }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { cacheHandler } = useStateHandler();

  async function saveDraft() {
    setLoading(true);

    const { response, data } = await GalleryService.saveArtworkDraft(formState);

    if(response.ok) {
      setLoading(false);
      setSuccess(true);
      cacheHandler.triggerAction("ARTWORK_DRAFT_SAVED");
      setTimeout(()=>setSuccess(false), 4000);

      if(response.status === 201) {
        setFormState(prevValue => {
          const newFormState = {
            ...prevValue, 
            _id: data._id
          };

          initialState.current = newFormState;
          return newFormState;
        });
      } else {
        initialState.current = formState;
      }
    }
  }

  return (
    <>
      <Text className={`add-artwork-form__save-draft-button element-non-selectable ${(!formState.artwork_about.artwork_title || loading || formState === initialState.current) ? "disabled" : ""} ${success ? "read-only" : ""}`} onClick={saveDraft} small>
        {
          success === true ? 
            "Saved!" 
            : 
            "Save as draft"
        }
                
        {loading && <CustomSpinner className="add-artwork-form__save-draft-spinner" thin/>}
      </Text>
    </>
  );
}
