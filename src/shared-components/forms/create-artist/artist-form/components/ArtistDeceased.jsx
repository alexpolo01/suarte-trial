import { useEffect } from 'react';

import FormCheckbox from '@/shared-components/inputs/components/FormCheckbox';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import Text from '@/shared-components/text/components/Text';

import './styles/ArtistDeceased.css';

export default function ArtistDeceased({ loading, formState, updateFormState }) {
  useEffect(()=>{
    if(!formState.isArtistDeceased) {
      updateFormState("artist_death", "");
    }
  }, [formState.isArtistDeceased]);

  return (
    <>
      <div className="artist-deceased__check-container">
        <FormCheckbox
          readOnly={loading}
          value={formState.isArtistDeceased}
          onChange={value=>updateFormState("isArtistDeceased", value)}
          className="artist-deceased__checkbox"
        />

        <Text className="artist-deceased__text" small>
                    The Artist is deceased
        </Text>
      </div>

      <div className={`artist-deceased__input-container ${formState.isArtistDeceased ? "expanded" : ""}`}>
        <PublicFormInput 
          readOnly={loading} 
          placeholder="Year of passing" 
          element="artist_death"
          value={formState.artist_death}
          onChange={e=>updateFormState("artist_death", e.target.value)}
        />
      </div>
    </>
  );
}
