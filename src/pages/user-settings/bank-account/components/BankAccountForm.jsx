import { useState } from 'react';

import GalleryService from '@/services/gallery.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';

import './styles/BankAccountForm.css';

export default function BankAccountForm({ fetchData, setFetchData }) {
  const [formState, setFormState] = useState({ ...fetchData, one_stop_shop: fetchData.one_stop_shop });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function updateBankAccount(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const { response, data } = await GalleryService.updateBankAccount(formState);

    if(response.ok) {
      setLoading(false); 
      setSuccess(true);
      setFetchData(data);
      setTimeout(()=>setSuccess(false), 3000);
    } else if(response.status === 400) {
      setLoading(false);
      setError({ element: data.error_data.element, error_code: data.error_type });
    }
  }

  function updateFormState(key, value) {
    setFormState({
      ...formState,
      [key]: value
    });
  }

  function toIBANFormat(input) {
    let cleanInput = input.replace(/\W/g, '').toUpperCase();  // Remove non-alphanumeric characters and make uppercase
    let formatted = '';
    for (let i = 0; i < cleanInput.length; i++) {
      if (i % 4 === 0 && i !== 0) {
        formatted += ' ';  // Add a space every 4 characters
      }
      formatted += cleanInput[i];
    }
    return formatted;
  }

  return (
    <>
      <form onSubmit={updateBankAccount} className="bank-account-form">
        <PublicFormInput
          readOnly={loading || success}
          placeholder="Bank name"
          element="bank_name"
          error={error}
          value={formState.bank_name}
          onChange={e=>updateFormState("bank_name", e.target.value)}
          margin
        />

        <PublicFormInput
          readOnly={loading || success}
          placeholder="SWIFT/BIC"
          element="swift_code"
          error={error}
          value={formState.swift_code}
          onChange={e=>updateFormState("swift_code", e.target.value)}
          margin
        />

        <PublicFormInput
          readOnly={loading || success}
          placeholder="Account holder name"
          element="account_holder_name"
          error={error}
          value={formState.account_holder_name}
          onChange={e=>updateFormState("account_holder_name", e.target.value)}
          margin
        />

        <PublicFormInput
          readOnly={loading || success}
          placeholder="IBAN"
          element="iban"
          error={error}
          value={toIBANFormat(formState.iban)}
          onChange={e=>updateFormState("iban", e.target.value)}
          margin
        />

        <PublicFormInput 
          type="checkbox"
          readOnly={loading || success}
          element="one_stop_shop"
          error={error}
          value={formState.one_stop_shop}
          onChange={value=>updateFormState("one_stop_shop", value)}
        >
                    My gallery is registered in the EU's One Stop Shop (OSS)
        </PublicFormInput>

        <ContinueButton
          loading={loading}
          success={success}
          successText="Information updated"
          className="bank-account-form__submit-button mt-m"
        >
                    Update information
        </ContinueButton>
      </form>
    </>
  );
}
