import { useState } from 'react';

import config from '@/config';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import FormError from '@/shared-components/error/components/FormError';
import QuestionsIcon from '@/shared-components/icons/components/public/QuestionsIcon';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/ArtworkMediaInput.css';

function CustomMediumPopup({ close, onCreate, customMedium }) {
  const [newMedium, setNewMedium] = useState("");

  return (
    <>
      <div className="custom-medium-popup__header">
        <Text className="custom-medium-popup__header-text" medium>
          {customMedium}
        </Text>

        <XIcon className="custom-medium-popup__close" onClick={close}/>
      </div>

      <Text className="custom-medium-popup__text" paragraph small>
                Specify the mediums used to create the artwork
      </Text>

      <input 
        type="text" 
        className="custom-medium-popup__input" 
        spellCheck={false} 
        autoComplete='off' 
        value={newMedium} 
        onInput={e => setNewMedium(e.target.value)}
        placeholder='Enter the mediums...'
      />

      <ContinueButton 
        className="custom-medium-popup__save" 
        turnOff={newMedium === ""}
        onClick={()=>onCreate(newMedium)}
      >
                Save medium
      </ContinueButton>
    </>
  );
}

export default function ArtworkMediaInput({ value, element, error, margin=false, previewMode, onChange }) {
  const [active, setActive] = useState(false);
  const [customMedium, setCustomMedium] = useState(null);

  function selectMedium(medium) {
    if(medium === "Mixed Media") {
      setCustomMedium("Mixed Media");
    } else if(medium === "Other") {
      setCustomMedium("Other");
    }  else {
      onChange(medium);
    }
  }

  function onCreateCustomMedium(medium) {
    const newMedium = customMedium + ': ' + medium;
    onChange(newMedium);
    setCustomMedium(null);
  }

  return (
    <>
      <div className={`artwork-media-input__outter-container ${margin ? "margin" : ""}`}>
        <div 
          tabIndex={0} 
          className={`artwork-media-input__container element-non-selectable ${active ? "active" : ""}`}
          onClick={()=>setActive(!active)} 
          onBlur={()=>setActive(false)}
        >
          <div className="artwork-media-input__visible-content" id={`${element}_error`}>
            <div className="artwork-media-input__text-container">
              <Text className="artwork-media-input__placeholder" medium>
                                Medium
              </Text>

              <Text className="artwork-media-input__medium dots-on-overflow" large>
                {value}
              </Text>
            </div>

            {!previewMode && <QuestionsIcon className="artwork-media-input__icon"/>}
          </div>

          {active && <div className="artwork-media-input__medium-options remove-scrollbar">
            <Text className="artwork-media-input__medium-options-text" medium>
                            Select the medium used to create the artwork:
            </Text>

            {config.forms.medium_options.map(item => (
              <Text key={item} className="artwork-media-input__medium-option" onClick={()=>selectMedium(item)} medium>
                {item}
              </Text>
            ))}
          </div>}
        </div>

        <FormError 
          error={error} 
          alternativeElement={`${element}_error`} 
          errorClassName="input-error" 
          element={element}
        />
      </div>

      <GenericPopup 
        className="custom-medium-popup" 
        open={customMedium !== null} 
        opacity
      >
        <CustomMediumPopup 
          close={()=>setCustomMedium(null)} 
          onCreate={onCreateCustomMedium} 
          customMedium={customMedium}
        />
      </GenericPopup>
    </>
  );
}
