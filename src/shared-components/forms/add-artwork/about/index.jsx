import { useState } from 'react';

import config from '@/config';
import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import FormError from '@/shared-components/error/components/FormError';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import ArtworkMediaInput from './components/ArtworkMediaInput';
import ArtworkMultipleInput from './components/ArtworkMultipleInput';
import RequestLimitedEdition from './components/RequestLimitedEdition';
import SearchArtist from './search-artist';

import './index.css';

export default function About({ formState, setFormState, editMode, previewMode, formError, setFormError }) {
  const { cacheHandler } = useStateHandler();
  const [loading, setLoading] = useState(false);
  const hideContinueButton = (editMode || previewMode || formState.lastCompletedStep >= 1);

  async function verifyAboutDataAndGoToNextStep() {
    setLoading(true);
    setFormError(null);

    const { response, data } = await GalleryService.saveArtworkDraft(formState, { about: true });

    if(response.ok) {
      setLoading(false); 
      setFormState(prevValue => ({ ...prevValue, lastCompletedStep: prevValue.lastCompletedStep + 1 }));
      cacheHandler.triggerAction("ARTWORK_DRAFT_SAVED");
    } else if(response.status === 400) {
      setLoading(false);
      setFormError({ element: data.error_data.element, error_code: data.error_type });
    }

    if(response.status === 201) setFormState(prevValue => ({ ...prevValue, _id: data._id }));
  }

  function onInputAboutData(key, value) {
    setFormState(prevValue => (
      Utils.addAttributeToObject(`artwork_about.${key}`, value, prevValue)
    ));
  }

  return (
    <>
      <div className={`add-artwork-about-form ${(loading || previewMode) ? "read-only" : ""}`}>
        <PublicFormInput 
          className="add-artwork-about-form__type-of-artwork" 
          type="choose" 
          optionA="Work of Artist" 
          optionB="Gallery owned" 
          value={formState.artwork_about.artwork_type}
          onChange={(value)=>onInputAboutData("artwork_type", value)}
        />

        <SearchArtist 
          error={formError} 
          element="artwork_artist" 
          value={formState.artwork_about.artwork_artist} 
          typeOfArtwork={formState.artwork_about.artwork_type}
          onChange={(value)=>onInputAboutData("artwork_artist", value)}
        />

        <PublicFormInput 
          error={formError} 
          placeholder="Title" 
          element="artwork_title" 
          value={formState.artwork_about.artwork_title} 
          onChange={(e)=>onInputAboutData("artwork_title", e.target.value)}
          margin
        />

        <PublicFormInput
          className="add-artwork-about-form__description" 
          error={formError} 
          placeholder="Description" 
          type="textarea" 
          element="artwork_description" 
          readOnly={previewMode}
          value={formState.artwork_about.artwork_description} 
          onChange={(e)=>onInputAboutData("artwork_description", e.target.value)}
          margin
        />

        <div className="add-artwork-about-form__group select">
          <ArtworkMediaInput 
            error={formError} 
            previewMode={previewMode} 
            element="artwork_medium"
            value={formState.artwork_about.artwork_medium} 
            onChange={(value)=>onInputAboutData("artwork_medium", value)}
            margin
          />

          <ArtworkMultipleInput 
            placeholder="Theme" 
            type="themes" 
            options={config.forms.theme_options} 
            value={formState.artwork_about.artwork_theme} 
            element="artwork_theme" 
            error={formError} 
            previewMode={previewMode} 
            onChange={(value)=>onInputAboutData("artwork_theme", value)}
            margin
          />
        </div>

        <div className="add-artwork-about-form__group select">
          <ArtworkMultipleInput 
            placeholder="Color" 
            type="colors" 
            options={config.forms.color_options} 
            value={formState.artwork_about.artwork_color} 
            element="artwork_color" 
            error={formError} 
            previewMode={previewMode} 
            onChange={(value)=>onInputAboutData("artwork_color", value)}
            margin
          />

          <ArtworkMultipleInput 
            placeholder="Feeling" 
            type="feelings" 
            options={config.forms.feeling_options} 
            value={formState.artwork_about.artwork_feeling} 
            element="artwork_feeling" 
            error={formError} 
            previewMode={previewMode} 
            onChange={(value)=>onInputAboutData("artwork_feeling", value)}
            margin
          />
        </div>

        <div className="add-artwork-about-form__group-outter">
          <PublicFormInput 
            error={formError} 
            placeholder="Year of creation" 
            element="artwork_year" 
            value={formState.artwork_about.artwork_year} 
            onChange={(e)=>onInputAboutData("artwork_year", e.target.value)}
          />

          <div style={{ width: "100%" }}>
            <div className="add-artwork-about-form__group center" id="artwork_size">
              <PublicFormInput 
                className="add-artwork-about-form__choose-input" 
                type="choose" 
                optionA="inches" 
                optionB="cm" 
                value={formState.artwork_about.artwork_size.unit} 
                onChange={(value)=>onInputAboutData("artwork_size.unit", value)}
              />
                            
              <PublicFormInput 
                error={formError} 
                placeholder="Length" 
                element="artwork_length" 
                type="number" 
                value={formState.artwork_about.artwork_size.length} 
                onChange={(e)=>onInputAboutData("artwork_size.length", e.target.value)}
              />

              <Text className="add-artwork-about-form__size-separator" large>x</Text>

              <PublicFormInput 
                error={formError} 
                placeholder="Height" 
                element="artwork_height" 
                type="number" 
                value={formState.artwork_about.artwork_size.height} 
                onChange={(e)=>onInputAboutData("artwork_size.height", e.target.value)}
              />
            </div>
            <FormError error={formError} element="artwork_size"/>
          </div>
        </div>

        <div className="add-artwork-about-form__group">
          <PublicFormInput 
            className="add-artwork-about-form__group-smaller variant add-artwork-about-form__group-margin" 
            error={formError} 
            placeholder="Currency" 
            type="select" 
            element="artwork_currency" 
            selectOptions={{ options: config.forms.currency_options }} 
            readOnly={previewMode} 
            value={formState.artwork_about.artwork_currency} 
            onChange={(value)=>onInputAboutData("artwork_currency", value)}
            margin
          />

          <PublicFormInput 
            className="add-artwork-about-form__group-bigger variant" 
            error={formError} 
            placeholder="Price*" 
            element="artwork_price" 
            value={formState.artwork_about.artwork_price} 
            onChange={(e) => {
              if(/^[0-9]*$/.test(e.target.value)) {
                onInputAboutData("artwork_price", e.target.value);
              }
            }}
            margin 
          />
        </div>

        <Text className="add-artwork-about-form__taxes" small paragraph>*Excluding taxes</Text>

        {!editMode && (
          <RequestLimitedEdition 
            previewMode={previewMode} 
            unit={formState.artwork_about.artwork_size.unit} 
            height={formState.artwork_about.artwork_size.height} 
            length={formState.artwork_about.artwork_size.length} 
            price={formState.artwork_about.artwork_price} 
            typeOfArtwork={formState.artwork_about.artwork_type}
            value={formState.artwork_about.artwork_limited_edition}
            onChange={(value)=>onInputAboutData("artwork_limited_edition", value)} 
          />
        )}

        <PublicFormInput 
          element="artwork_includes_certificate" 
          type="checkbox" 
          className="add-artwork-about-form__checkbox-margin"
          value={formState.artwork_about.artwork_includes_certificate} 
          onChange={(value)=>onInputAboutData("artwork_includes_certificate", value)} 
        >
                    Certificate of Authenticity included  
        </PublicFormInput>

        <PublicFormInput 
          element="artwork_includes_frame" 
          type="checkbox"
          value={formState.artwork_about.artwork_includes_frame} 
          onChange={(value)=>onInputAboutData("artwork_includes_frame", value)}
        >
                    Frame included    
        </PublicFormInput>

        {!hideContinueButton && (
          <ContinueButton 
            loading={loading} 
            className="add-artwork-about-form__continue-button" 
            link 
            onClick={verifyAboutDataAndGoToNextStep}
          > 
                        Continue 
          </ContinueButton>
        )}
      </div>
    </>
  );
}
