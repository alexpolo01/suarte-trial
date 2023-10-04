import { useState } from 'react';

import FormError from '@/shared-components/error/components/FormError';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';

import ArtworkTerms from './components/ArtworkTerms';
import EditArtwork from './components/EditArtwork';
import SubmitArtworkDraft from './components/SubmitArtworkDraft';

import './index.css';

export default function SubmitButton({ formState, editMode, formError, setFormError }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [openArtworkTerms, setOpenArtworkTerms] = useState(false);

  return (
    <>
      <PublicFormInput 
        element="artwork_terms" 
        type="checkbox"
        error={formError}
        value={termsAccepted} 
        onChange={(value)=>setTermsAccepted(value)}
      >
                I have read and understand the{" "}
        <span className="submit-button-artwork-terms-opener" onClick={()=>setOpenArtworkTerms(true)}>
                    Artwork agreement
        </span>. 
      </PublicFormInput>

      <ArtworkTerms open={openArtworkTerms} close={()=>setOpenArtworkTerms(false)}/>

      <input type="hidden" id="artwork_generic_error"/>
      <FormError error={formError} element="artwork_generic_error"/>

      {
        editMode ? 
          <EditArtwork 
            formState={formState} 
            setFormError={setFormError} 
            termsAccepted={termsAccepted}
          />
          :
          <SubmitArtworkDraft 
            formState={formState} 
            setFormError={setFormError} 
            termsAccepted={termsAccepted}
          />
      }
    </>
  );
}
