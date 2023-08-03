import { useState } from 'react';

import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';

import './styles/PersonalizedMessage.css';

function Content({ close, purchaseState, addPersonalizedMessage }) {
  const [formState, setFormState] = useState(purchaseState.personalized_message);

  return (
    <>
      <div className="purchase-personalized-message__header">
        <span className="purchase-personalized-message__header-text mt-m">
                    Add a personalized message
        </span>

        <XIcon className="purchase-personalized-message__close" onClick={close}/>
      </div>

      <p className="purchase-personalized-message__popup-text mt-s">
                Share any special requests or messages you may have for the Gallery 
                regarding your order, or just to say hello!
      </p>

      <textarea 
        placeholder='Write a message...'
        value={formState}
        onChange={e=>setFormState(e.target.value)}
        spellCheck={false}
        className="purchase-personalized-message__textarea mt-m"
      />

      <ContinueButton 
        className="purchase-personalized-message__add-button mt-m"
        turnOff={!formState} 
        onClick={()=>addPersonalizedMessage(formState)}
      >
        {
          purchaseState.personalized_message ?
            "Update message"
            :
            "Add message"
        }
      </ContinueButton>
    </>
  );
}

export default function PersonalizedMessage({ formState, setFormState, artworkData, typeOfPurchase }) {
  const [openPersonzalizedMessage, setOpenPersonalizedMessage] = useState(false);

  function addPersonalizedMessage(message) {
    setFormState({ ...formState, personalized_message: message });
    setOpenPersonalizedMessage(false);
  }

  function removePersonalizedMessage(e) {
    e.stopPropagation();
    setFormState({ ...formState, personalized_message: "" });
  }

  return (
    <>
      <span className="purchase-personalized-message__text element-non-selectable mt-s" onClick={()=>setOpenPersonalizedMessage(true)}>
        {
          formState.personalized_message ?
            "Message added"
            :
            typeOfPurchase === "limited_edition" ?
              "Add a personalized message to Suarte"
              :
              `Add a personalized message to ${artworkData.artwork_about.artwork_gallery.user_name}`
        }

        {Boolean(formState.personalized_message) && <XIcon className="purchase-personalized-message__remove" onClick={removePersonalizedMessage}/>}
      </span>

      <GenericPopup
        open={openPersonzalizedMessage}
        className="purchase-personalized-message__popup"
        darkerBlur
      >
        <Content 
          purchaseState={formState} 
          addPersonalizedMessage={addPersonalizedMessage}
          close={()=>setOpenPersonalizedMessage(false)}
        />
      </GenericPopup>
    </>
  );
}
