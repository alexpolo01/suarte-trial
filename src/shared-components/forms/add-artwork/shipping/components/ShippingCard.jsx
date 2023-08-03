import config from '@/config';
import FormError from '@/shared-components/error/components/FormError';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import Heading from '@/shared-components/text/components/Heading';
import Text from '@/shared-components/text/components/Text';

import './styles/ShippingCard.css';

export default function ShippingCard({ value, location, element, formError, previewMode, onChange, deleteException }) {
  return (
    <>
      <div className="add-artwork-shipping__shipping-card-outter">
        <div className="add-artwork-shipping__shipping-card" id={element}>
          {(deleteException && !previewMode) && (
            <div className="add-artwork-shipping__shipping_card-delete" onClick={deleteException}>
              <div/>
            </div>
          )}
          <h2 className="add-artwork-shipping__shipping-card-location">
            <Heading small>{location}</Heading>
          </h2>

          <Text className="add-artwork-shipping__shipping-card-text" medium paragraph justify>Who pays for the shipping?</Text>

          <PublicFormInput 
            className="add-artwork-shipping__shipping-card-choose" 
            type="choose" 
            optionA={"The collector"}  
            optionB={"You"} 
            value={value.payer}
            onChange={(payer)=>onChange(payer === "You" ? { ...value, payer, currency: "", price: "" } : { ...value, payer })} 
          />

          <div className={`add-artwork-shipping__shipping-card-group${value.payer==="You" ? " disabled" : ""}`}>
            <div className="add-artwork-shipping__shipping-card-group-smaller">
              <PublicFormInput 
                placeholder="Currency" 
                type="select" 
                readOnly={previewMode} 
                element={`${element}_currency`} 
                selectOptions={{ options: config.forms.currency_options }}
                value={value.currency} 
                onChange={(currency)=>onChange({ ...value, currency })}
              />
            </div>
            <div className="add-artwork-shipping__shipping-card-group-bigger">
              <PublicFormInput 
                placeholder="Price" 
                type="number" 
                element={`${element}_price`}
                value={value.price} 
                onChange={(e)=>onChange({ ...value, price: e.target.value })}
              />
            </div>
          </div>
        </div>
        <FormError error={formError} element={element} errorClassName="add-artwork-shipping-error"/>
      </div>
    </>
  );
}
