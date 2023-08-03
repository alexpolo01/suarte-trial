import { useState } from 'react';

import FormError from '@/shared-components/error/components/FormError';
import QuestionsIcon from '@/shared-components/icons/components/public/QuestionsIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/ArtworkMultipleInput.css';

export default function ArtworkMultipleInput({ placeholder, type, options, value, element, error, previewMode, onChange, margin }) {
  const [active, setActive] = useState(false);

  function handleSelectOption(e, option) {
    e.stopPropagation();

    if(value.includes(option)) {
      const newSelectedOptions = value.filter(item => item !== option);
      onChange(newSelectedOptions);
    } else {
      const newSelectedOptions = [...value, option];
      onChange(newSelectedOptions);
    }
  }

  return (
    <>
      <div className={`artwork-multiple-input__outter-container ${margin ? "margin" : ""}`}>
        <div 
          tabIndex={0} 
          className={`artwork-multiple-input__container element-non-selectable ${active ? "active" : ""}`} 
          onClick={()=>setActive(!active)} 
          onBlur={()=>setActive(false)}
        >
          <div className="artwork-multiple-input__visible-content" id={`${element}_error`}>
            <div className="artwork-multiple-input__text-container">
              <Text className="artwork-multiple-input__placeholder" medium>
                {placeholder}
              </Text>

              <Text className="artwork-multiple-input__selected dots-on-overflow" large>
                {value.join(", ")}
              </Text>
            </div>

            {!previewMode && <QuestionsIcon className="artwork-multiple-input__icon"/>}
          </div>

          {active && (
            <div className="artwork-multiple-input__options remove-scrollbar">
              <Text className="artwork-multiple-input__options-text" medium>
                                Select up to three {type} in order of relevance:
              </Text>

              {options.map(item => (
                <Text 
                  key={item} 
                  className={`artwork-multiple-input__option ${value.includes(item) ? "selected" : value.length >= 3 ? "disabled" : ""}`} 
                  onClick={(e)=>handleSelectOption(e, item)} 
                  medium
                >
                  {item}
                </Text>
              ))}
            </div>
          )}
        </div>
                
        <FormError 
          error={error} 
          alternativeElement={`${element}_error`} 
          errorClassName="input-error" 
          element={element}
        />
      </div>
    </>
  );
}
