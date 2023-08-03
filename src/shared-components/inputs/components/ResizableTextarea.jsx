import { useEffect,useRef } from 'react';

import FormError from '@/shared-components/error/components/FormError';
import Text from '@/shared-components/text/components/Text';

import './styles/ResizableTextarea.css';

export default function ResizableTextarea({ placeholder="", className="", margin=false, element, fillWith, value, onChange=null, error, readOnly, ignoreHeader=false, ignoreError=false }) {
  const textarea = useRef();

  useEffect(()=>{
    resizeTextarea();
  }, []);

  function resizeTextarea() {
    textarea.current.setAttribute('rows', '1');
    const lineHeight = parseInt(window.getComputedStyle(textarea.current).lineHeight);
    const numRows = Math.floor(textarea.current.scrollHeight / lineHeight);
    textarea.current.setAttribute('rows', numRows);       
  }

  return (
    <>
      <div className={`resizable-textarea__outter-container ${className} ${margin ? "margin" : ""}`}>
        <div className="resizable-textarea__container" id={`${element}_error`}>
          {!ignoreHeader && (
            <label htmlFor={element} className="resizable-textarea__label element-non-selectable">
              <Text medium>
                {placeholder}
              </Text>
            </label>
          )}

          <textarea 
            className={`resizable-textarea__textarea remove-scrollbar mt-l ${ignoreHeader ? "more-padding" : ""}`}
            name={element} 
            id={element} 
            placeholder={ignoreHeader ? placeholder : ""}
            readOnly={readOnly} 
            spellCheck={false}
            rows={1} 
            defaultValue={fillWith}
            ref={textarea}
            value={value}
            onChange={(e) => {
              resizeTextarea();

              if(onChange) { 
                onChange(e);
              }
            }}
          />
        </div>

        {!ignoreError && (
          <FormError 
            error={error} 
            alternativeElement={`${element}_error`} 
            errorClassName="resizable-textarea__textarea-error" 
            element={element}
          />
        )}
      </div>
    </>
  );
}
