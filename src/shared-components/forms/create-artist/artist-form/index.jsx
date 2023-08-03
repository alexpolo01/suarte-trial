import { useState } from 'react';

import config from '@/config';
import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import Utils from '@/utils';

import ArtistDeceased from './components/ArtistDeceased';
import FormText from './components/FormText';

import './index.css';

export default function ArtistForm({ artistData, onCreate, createMode, editMode, close }) {
  const { cacheHandler, stateHandler } = useStateHandler();
  const [formState, setFormState] = useState(Utils.initArtistForm(artistData));
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);

  function updateFormState(key, value) {
    setFormState(Utils.addAttributeToObject(key, value, formState));
  }

  function canSubmit() {
    if(editMode || createMode === "Work of Artist") {
      return (
        Boolean(formState.artist_name) &&
                Boolean(formState.artist_email) &&
                Boolean(formState.artist_nationality) &&
                Boolean(formState.artist_birth) &&
                Boolean(!formState.isArtistDeceased || Boolean(formState.artist_death))
      );
    } else {
      return (
        Boolean(formState.artist_name) &&
                Boolean(formState.artist_nationality) &&
                Boolean(formState.artist_birth) &&
                Boolean(!formState.isArtistDeceased || Boolean(formState.artist_death))
      );
    } 
  }

  async function submitArtistForm(e) {
    e.preventDefault();
    setLoading(true);
    setFormError(null);

    if(editMode) {
      const { response, data } = await GalleryService.editArtistProfile(formState);

      if(response.ok) {
        stateHandler.set("temporalPopup", { text: "Artist information updated successfully!" });
        onCreate(data);
        close();
      } else if(response.status === 400) {
        setLoading(false);
        setFormError({ element: data.error_data.element, error_code: data.error_type });
      }
    } else {
      const { response, data } = await GalleryService.createArtistProfile(formState, createMode);

      if(response.ok) {
        onCreate(data);
        cacheHandler.triggerAction("NEW_ARTIST");
        close();
      } else if(response.status === 400) {
        setLoading(false);
        setFormError({ element: data.error_data.element, error_code: data.error_type });
      }
    }
  }

  return (
    <>
      <form onSubmit={submitArtistForm} className="artist-form__container">
        <PublicFormInput 
          readOnly={loading} 
          error={formError} 
          placeholder="Name" 
          element="artist_name"
          value={formState.artist_name}
          onChange={e=>updateFormState("artist_name", e.target.value)}
          margin
        />

        <PublicFormInput 
          readOnly={loading} 
          error={formError} 
          type="email"
          placeholder={
            createMode === "Gallery owned" ?
              "Email of the artist (optional)" 
              :
              "Email of the artist"
          } 
          element="artist_email"
          value={formState.artist_email}
          onChange={e=>updateFormState("artist_email", e.target.value)}
          margin
        />

        <PublicFormInput 
          readOnly={loading} 
          error={formError} 
          selectOptions={{ options: config.forms.prefix_options, type: "country" }} 
          placeholder="Nationality" 
          type="select" 
          element="artist_nationality"
          value={formState.artist_nationality}
          onChange={value=>updateFormState("artist_nationality", value)}
          margin
        />

        <PublicFormInput 
          readOnly={loading} 
          error={formError} 
          placeholder="Year of birth" 
          element="artist_birth"
          value={formState.artist_birth}
          onChange={e=>updateFormState("artist_birth", e.target.value)}
          margin
        />

        <ArtistDeceased
          loading={loading}
          formState={formState}
          updateFormState={updateFormState}
        />

        {!editMode && <FormText formState={formState} createMode={createMode}/>}

        <ContinueButton
          turnOff={!canSubmit()}
          loading={loading}
          className="artist-form__submit-button mt-m"
        >
          {
            editMode ?
              "Save changes"
              :
              "Create profile"
          }
        </ContinueButton>
      </form>
    </>
  );
}
