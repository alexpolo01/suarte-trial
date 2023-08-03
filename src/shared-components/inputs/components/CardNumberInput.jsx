import { useState } from 'react';

import FormError from '@/shared-components/error/components/FormError';

import GenericInputStructure from './GenericInputStructure';

import './styles/CardNumberInput.css';

export default function CardNumberInput({ fillWith=null, className="", element, readOnly=false, margin=false, error, placeholder="" }) {
  const [cardNumber, setCardNumber] = useState(fillWith ? fillWith : "");

  function handleCardNumberInput(e) {
    const cardNumberInput = e.target.value;
    const numericInput = cardNumberInput.replace(/\D/g, "");
    const formattedCardNumber = numericInput.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formattedCardNumber);
  }

  return (
    <>
      <div className={`card-number-input__container${margin ? " margin" : ""}${readOnly ? " read-only" : ""} ${className}`}>
        <GenericInputStructure element={element} placeholder={placeholder}>
          <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="card-number-input__input" onChange={handleCardNumberInput} name={element} id={element} readOnly={readOnly} value={cardNumber} maxLength={19}/>
        </GenericInputStructure>

        <FormError error={error} alternativeElement={`${element}_error`} errorClassName="card-number-input__error" element={element}/>
      </div>
    </>
  );
}
