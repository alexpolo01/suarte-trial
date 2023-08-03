import { useRef } from 'react';

import OpenStepAccordeonIcon from '@/shared-components/icons/components/forms/OpenStepAccordeonIcon';

import './styles/PublicSelect.scss';

export default function PublicSelect({ element, selectOptions, readOnly, placeholder, value, onChange }) {
  const selectContainer = useRef(null);

  function toggleOptions() {
    selectContainer.current.classList.toggle("active");
  }

  function closeOptions() {
    selectContainer.current.classList.remove("active");
  }

  return (
    <>
      <div 
        tabIndex={0} 
        onClick={toggleOptions} 
        onBlur={closeOptions} 
        className={`public-select__container ${readOnly ? "read-only" : ""}`} 
        id={`${element}_error`} 
        ref={selectContainer}
      >
        <div>
          <label htmlFor={element} className="public-select__label"> 
            {placeholder} 
          </label>
                    
          <div className="public-select__selected-option-container">
            <input 
              type="text" 
              className="public-select__selected-option" 
              value={value} 
              id={element} 
              name={element} 
              readOnly={true} 
            />

            <div className="public-select__open-options-container">
              { !readOnly && <OpenStepAccordeonIcon className="public-select__open-options" />}
            </div>
          </div>
        </div>
                
        <div className="public-select__options-container">
          {selectOptions.options.map((option, index) => {
            if(selectOptions.type === "phone_prefix") {
              return (
                <p className="public-select__option" onClick={()=>{onChange(option.dialCode);}} key={index}>
                  {option.name}
                </p>
              );
            } else if(selectOptions.type === "country") {
              return (
                <p className="public-select__option" onClick={()=>{onChange(option.name);}} key={index}>
                  {option.name}
                </p>
              );
            } else {
              return (
                <p className="public-select__option" onClick={()=>{onChange(option);}} key={index}>
                  {option}
                </p>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
