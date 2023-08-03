import { useRef,useState } from 'react';

import './styles/AuthArtistInputCode.css';

export default function AuthArtistInputCode({ length, loading, onComplete, element }) {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef([]);

  const processInput = (e, slot) => {
    const num = e.target.value;

    if(!isNaN(num)) {
      let newCode = [...code];
      newCode[slot] = num;
      setCode(newCode);

      if (slot !== length - 1 && num) {
        inputs.current[slot + 1].focus();
      }

      if(onComplete && newCode.every(num => num !== "")) {
        onComplete(newCode.join(""));
      }
    }
  };
    
  return (
    <>
      <div className="auth-artist-input-code__container">
        {code.map((num, index) => {
          return (
            <input
              className="auth-artist-input-code__input"
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={num}
              readOnly={loading}
              onInput={(e)=>processInput(e, index)}
              ref={ref => inputs.current.push(ref)}
            />
          );
        })}
      </div>

      <input type="hidden" value={code.join("")} name={element} id={element} readOnly/>
    </>
  );
}
