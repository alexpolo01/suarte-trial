import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';

import Audio from './audio';
import MainPicture from './main-picture';
import SecondaryPictures from './secondary-pictures';

import './index.css';

export default function Media({ formState, setFormState, editMode, previewMode, formError, setFormError }) {
  const [loading, setLoading] = useState(false);
  const { cacheHandler } = useStateHandler();
  const hideContinueButton = (editMode || previewMode || formState.lastCompletedStep >= 2);

  async function verifyMediaDataAndGoToNextStep() {
    setLoading(true);
    setFormError(null);

    const { response, data } = await GalleryService.saveArtworkDraft(formState, { media: true });

    if(response.ok) {
      setLoading(false); 
      setFormState(prevValue => ({ ...prevValue, lastCompletedStep: prevValue.lastCompletedStep + 1 }));
      cacheHandler.triggerAction("ARTWORK_DRAFT_SAVED");
    } else if(response.status === 400) {
      setLoading(false);
      setFormError({ element: data.error_data.element, error_code: data.error_type });
    }
  }

  function onInputMediaData(key, value) {
    setFormState(prevValue => {
      return {
        ...prevValue, 
        artwork_media: {
          ...prevValue.artwork_media, 
          [key]: value
        }
      };
    });
  }

  return (
    <>
      <div className={`add-artwork-media-form ${(loading) ? "read-only" : ""}`}>    
        <MainPicture 
          element="artwork_main_picture" 
          formError={formError} 
          setFormError={setFormError} 
          previewMode={previewMode} 
          fillWith={formState.artwork_media.artwork_main_picture} 
          onChange={value => onInputMediaData("artwork_main_picture", value)}
        />

        <SecondaryPictures  
          formError={formError} 
          setFormError={setFormError} 
          previewMode={previewMode} 
          fillWith={formState.artwork_media.artwork_secondary_pictures}
          onChange={value => onInputMediaData("artwork_secondary_pictures", value)}
        />

        <Audio 
          formError={formError} 
          setFormError={setFormError} 
          previewMode={previewMode} 
          fillWith={formState.artwork_media.artwork_audio} 
          onChange={value => onInputMediaData("artwork_audio", value)}
        />
                
        {!hideContinueButton && (
          <ContinueButton 
            loading={loading} 
            className="add-artwork-media-form__continue-button" 
            link 
            onClick={verifyMediaDataAndGoToNextStep}
          > 
                        Continue 
          </ContinueButton>
        )}
      </div>
    </>
  );
}
