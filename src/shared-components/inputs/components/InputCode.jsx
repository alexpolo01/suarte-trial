import { useRef } from 'react';

export default function InputCode({ className, codeType="alphanumeric", value, onChange, readOnly, onComplete }) {
  const inputFieldsRef = useRef([]);
    
  function validateInputFieldValue(inputFieldValue) {
    if(codeType === "numeric") {
      return /^[0-9]*$/.test(inputFieldValue);
    } else if(codeType === "alphanumeric") {
      return /^[a-z0-9]*$/i.test(inputFieldValue);
    } else {
      return false;
    }
  }

  function handleCodeInput(inputFieldValue, inputFieldIndex) {
    if(validateInputFieldValue(inputFieldValue)) {
      const newCode = [...value];
      newCode[inputFieldIndex] = inputFieldValue;
      onChange(newCode);

      if(!newCode.includes("") && onComplete) {
        onComplete(newCode.join(""));
      } else if(inputFieldValue !== "") {
        inputFieldsRef.current[inputFieldIndex+1]?.focus();
      }
    }  
  }

  return (
    <>
      <div className={className}>
        {value.map((inputFieldValue, inputFieldIndex)=>(
          <input 
            type="text"
            key={inputFieldIndex}
            readOnly={readOnly}
            spellCheck={false}
            maxLength={1}
            className="input-code__input"
            value={inputFieldValue}
            onChange={e=>handleCodeInput(e.target.value, inputFieldIndex)}
            ref={ref=>inputFieldsRef.current.push(ref)}
          />
        ))}
      </div>
    </>
  );
}
