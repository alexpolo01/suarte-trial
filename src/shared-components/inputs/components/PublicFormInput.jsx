import { useEffect,useRef } from 'react';

import FormError from '@/shared-components/error/components/FormError';
import CalendarIcon from '@/shared-components/icons/components/forms/CalendarIcon';

import ChooseInput from './ChooseInput';
import FormCheckbox from './FormCheckbox';
import MultipleSelector from './MultipleSelector';
import PublicSelect from './PublicSelect';

import './styles/PublicFormInput.scss';

export default function PublicFormInput({ className=null, placeholder="", type="text", onChange=null, margin=false, element="", inputMode=null, value, fillWith, reset, error, readOnly=false, children, selectOptions, optionA="", optionB }) {
  const inputRef = useRef();
  const dateRef = useRef();

  useEffect(()=>{
    if(reset === true) inputRef.current.value = "";
  }, [reset]);

  if(type === "checkbox") {
    return (
      <>
        <div className={`public-form-input__higher-container ${className} ${margin ? "public-form-input__default-margin" : ""}`}>
          <div className="public-form-input__checkbox-container">
            <FormCheckbox 
              className="public-form-input__checkbox" 
              element={element} 
              readOnly={readOnly} 
              value={value} 
              onChange={onChange}
            />

            <p className="public-form-input__checkbox-text element-non-selectable">
              {children}
            </p>
          </div>

          <FormError 
            error={error} 
            alternativeElement={`${element}_error`} 
            errorClassName="public-form-input__checkbox-error" 
            element={element}
          />
                    
          {margin && <div className="public-form-input__default-margin checkbox"/>}
          {className && <div className={className}></div>}
        </div>
      </>
    );
  }

  if(type === "select") {
    return (
      <>
        <div className={`public-form-input__higher-container ${className} ${margin ? "public-form-input__default-margin" : ""}`}>
          <PublicSelect 
            element={element} 
            selectOptions={selectOptions} 
            readOnly={readOnly} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange}
          />

          <FormError 
            error={error} 
            alternativeElement={`${element}_error`} 
            errorClassName="public-form-input__input-error" 
            element={element}
          />
        </div>
      </>
    );
  }

  if(type === "multiple") {
    return (
      <>
        <div className={`public-form-input__higher-container ${className} ${margin ? "public-form-input__default-margin" : ""}`}>
          <MultipleSelector 
            element={element} 
            selectOptions={selectOptions} 
            readOnly={readOnly} 
            placeholder={placeholder} 
            fillWith={fillWith}
          />

          <FormError 
            error={error} 
            alternativeElement={`${element}_error`} 
            errorClassName="public-form-input__input-error" 
            element={element}
          />
        </div>
      </>
    );
  }

  if(type === "choose") {
    return (
      <>
        <div className={`public-form-input__higher-container ${className} ${margin ? "public-form-input__default-margin" : ""}`}>
          <ChooseInput 
            optionA={optionA} 
            optionB={optionB} 
            readOnly={readOnly} 
            value={value} 
            onChange={onChange}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`public-form-input__higher-container ${className} ${margin ? "public-form-input__default-margin" : ""}`}>
        <div className="public-form-input__container" id={`${element}_error`}>
          <label htmlFor={element} className={`public-form-input__label${type==="textarea" ? " textarea" : ""}`}>{placeholder}</label>
          {
            type === "textarea" ? 
              <textarea 
                className="public-form-input__input textarea" 
                name={element} 
                id={element} 
                ref={inputRef} 
                readOnly={readOnly} 
                spellCheck={false} 
                value={value} 
                defaultValue={fillWith} 
                onChange={onChange}
              />
              :
              type === "date" ?
                <>
                  <input 
                    className="public-form-input__input date" 
                    type={type} 
                    name={element} 
                    id={element} 
                    ref={dateRef} 
                    readOnly={readOnly} 
                    value={value} 
                    defaultValue={fillWith}
                    onChange={onChange}
                  />

                  <CalendarIcon className={`public-form-input__calendar-icon ${readOnly ? "read-only" : ""}`} onClick={() => dateRef.current.showPicker()}/>
                </>
                :
                <input 
                  className="public-form-input__input" 
                  type={type} 
                  onChange={onChange} 
                  name={element} 
                  id={element} 
                  ref={inputRef} 
                  readOnly={readOnly} 
                  spellCheck={false} 
                  value={value} 
                  defaultValue={fillWith} 
                  inputMode={inputMode} 
                  disabled={readOnly}
                />
          }
        </div>

        <FormError 
          error={error} 
          alternativeElement={`${element}_error`} 
          errorClassName="public-form-input__input-error" 
          element={element}
        />
      </div>
    </>
  );
}
