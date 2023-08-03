import { useState } from 'react';

import config from '@/config';
import Question from '@/shared-components/accordeons/components/Question';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import PublicSuccessCheck from '@/shared-components/icons/components/public/PublicSuccessCheck';
import Text from '@/shared-components/text/components/Text';

import './styles/LimitedEditionForm.css';

export default function LimitedEditionForm({ onRequest, loading, requested }) {
  const [policiesAccepted, setPoliciesAccepted] = useState(requested);

  function requestLimitedEditions() {
    if(!policiesAccepted) {
      alert("You must accept limited edition policies to request them.");
    } else {
      if(onRequest) onRequest();
    }
  }

  return (
    <>
      <div className="limited-edition-artwork-form__policies-container">
        <div className={`limited-edition-artwork-form__policies-checkbox${(loading || requested) ? " read-only" : ""}`} onClick={()=>setPoliciesAccepted(!policiesAccepted)}>
          {policiesAccepted && <PublicSuccessCheck className="limited-edition-artwork-form__policies-checkbox-check"/>}
        </div>

        <Text className="limited-edition-artwork-form__policies-text" small paragraph>
                    I agree to <a href="/limited-edition-policies" target="_blank" rel='noreferrer' aria-label='Suarte limited edition policies'>
                        limited edition policies  
          </a>.
        </Text>
      </div>

      {
        requested ?
          <Text className="limited-edition-artwork-form__requested element-non-selectable" medium>
                        Requested
          </Text>
          :
          <ContinueButton 
            className="limited-edition-artwork-form__request-button mt-m" 
            loading={loading} 
            link 
            onClick={requestLimitedEditions}
          >
                        Request
          </ContinueButton>
      }

      {
        config.faqs.limited_editions.map((question, index) => (
          <Question 
            className="limited-edition-artwork-form__question" 
            key={index} 
            question={question.question} 
            answer={question.answer} 
            heightClassName={index !== 0 ? "limited-edition-artwork-question-height" : "limited-edition-artwork-question-height-first"}
          />
        ))
      }
    </>
  );
}
