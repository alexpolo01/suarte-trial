import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import config from '@/config';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import './styles/AddException.css';

function AddExceptionContent({ setFormState, type, close }) {
  const [location, setLocation] = useState("");

  function addNewException() {
    const newException = {
      id: uuidv4(),
      element: `artwork_shipping_exception_${location.replace(/ /g,"_")}`,
      type,
      location,
      payer: "The collector",
      currency: "",
      price: ""
    };

    setFormState(prevValue => ({
      ...prevValue,
      artwork_shipping: {
        ...prevValue.artwork_shipping,
        artwork_shipping_exceptions: [...prevValue.artwork_shipping.artwork_shipping_exceptions, newException]
      }
    }));
  }

  return (
    <>
      <XIcon className="add-artwork-shipping-form__add-exception-close" onClick={close}/>

      <Text className="add-artwork-shipping-form__add-exception-text" medium paragraph>
        {type === "COUNTRY_EXCEPTION" ? "Add country exception": "Add continent exception"}
      </Text>

      <PublicFormInput 
        selectOptions={type === "COUNTRY_EXCEPTION" ? { options: config.forms.prefix_options, type: "country" } : { options: config.forms.continent_options }} 
        placeholder={type === "COUNTRY_EXCEPTION" ? "Country" : "Continent"} 
        type="select" 
        element="artwork_add_new_exception" 
        value={location}
        onChange={(value) => setLocation(value)}
      />

      <ContinueButton className={`add-artwork-shipping-form__add-exception-add-button${!location ? " disabled-button" : ""}`} link onClick={()=>{addNewException(); close();}}>
                Add
      </ContinueButton>
    </>
  );
}

export default function AddException({ setFormState, type }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="add-artwork-shipping-form__add-exception-button element-non-selectable" onClick={()=>setOpen(true)} role="button">
        <Heading small>
          {type === "COUNTRY_EXCEPTION" ? "Add country exception" : "Add continent exception"}
        </Heading>
      </div>

      <GenericPopup 
        open={open}
        className="add-artwork-shipping-form__add-exception-popup"
        opacity
      >
        <AddExceptionContent 
          setFormState={setFormState} 
          type={type} 
          close={()=>setOpen(false)}
        />
      </GenericPopup>
    </>
  );
}
