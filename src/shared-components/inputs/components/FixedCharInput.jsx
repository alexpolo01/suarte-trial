import { useState } from 'react';

import FormError from '@/shared-components/error/components/FormError';
import Text from '@/shared-components/text/components/Text';

import './styles/FixedCharInput.css';

export default function FixedCharInput({ className="", value="", placeholder="", element, error, onChange, maxChar, small=false, medium=false, large=false, margin=false, }) {
  const [showLength, setShowLength] = useState(false);

  return (
    <>
      <div className={`fixed-char-input__container ${className} ${margin ? "margin" : ""} ${small ? "small" : ""} ${medium ? "medium" : ""} ${large ? "large" : ""}`}>
        <div className="fixed-char-input__content" id={`${element}_error`}>
          <input 
            type="text" 
            spellCheck={false} 
            placeholder={placeholder} 
            className="fixed-char-input__input" 
            name={element} 
            id={element} 
            value={value} 
            onFocus={()=>setShowLength(true)} 
            onBlur={()=>setShowLength(false)} 
            onChange={(e)=>{
              if(e.target.value.length <= maxChar) {
                onChange(e);
              }
            }}
          />

          {showLength && <Text className="fixed-char-input__chars-left" extraSmall>
            {value.length}/{maxChar}
          </Text>}
        </div>

        <FormError alternativeElement={`${element}_error`} element={element} error={error} errorClassName="fixed-char-input__error-className"/>
      </div>
    </>
  );
}
