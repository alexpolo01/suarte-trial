import { useState } from 'react';

import FormError from '@/shared-components/error/components/FormError';

import GenericInputStructure from './GenericInputStructure';

import './styles/CardExpirationInput.css';

export default function CardExpirationInput({ fillWith=null, className="", element, readOnly=false, margin=false, error, placeholder="" }) {
  const [cardExpiration, setCardExpiration] = useState(fillWith ? `${(fillWith.month+1).toString().padStart(2, "0")}/${fillWith.year.toString().slice(-2)}` : "");

  function handleCardExpirationInput(e) {
    const cardExpirationInput = e.target.value;
    const numericInput = cardExpirationInput.replace(/\D/g, "");
    const formattedInput = numericInput.replace(/^(\d\d)(\d)/g, "$1/$2");
    setCardExpiration(formattedInput);
  }

  function prepareValueForProvider() {
    if(!cardExpiration) return "";
    const [month, year] = cardExpiration.split("/");
    return JSON.stringify({ month: month-1, year: year }); /** Month is 0 indexed in JavaScript */
  }

  return (
    <>
      <div className={`card-expiration-input__container${margin ? " margin" : ""}${readOnly ? " read-only" : ""} ${className}`}>
        <GenericInputStructure element={element} placeholder={placeholder}>
          <input 
            type="text" 
            placeholder="MM/YY" 
            className="card-expiration-input__input" 
            onChange={handleCardExpirationInput} 
            readOnly={readOnly} 
            value={cardExpiration} 
            maxLength={5}
          />
        </GenericInputStructure>

        <FormError 
          error={error} 
          alternativeElement={`${element}_error`} 
          errorClassName="card-expiration-input__error" 
          element={element}
        />

        <input 
          type="hidden" 
          name={element} 
          id={element} 
          value={prepareValueForProvider()}
        />
      </div>
    </>
  );
}
