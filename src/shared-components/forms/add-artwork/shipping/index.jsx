import AddException from './components/AddException';
import SaveShippingData from './components/SaveShippingData';
import ShippingCard from './components/ShippingCard';
import SelectShippingData from './select-shipping-data';
import SubmitButton from './submit-button';

import './index.css';

export default function Shipping({ formState, setFormState, editMode, previewMode, formError, setFormError }) {
  function onInputShippingData(key, value) {
    setFormState(prevValue => ({
      ...prevValue,
      artwork_shipping: {
        ...prevValue.artwork_shipping,
        [key]: value
      }
    }));
  }

  return (
    <>
      <div className={`add-artwork-shipping-form ${previewMode ? "read-only" : ""}`}>
        {!previewMode && <SelectShippingData setFormState={setFormState}/>}
                
        <ShippingCard 
          location={formState.artwork_shipping.artwork_shipping_own.location} 
          element="artwork_shipping_own" 
          formError={formError} 
          previewMode={previewMode}
          value={formState.artwork_shipping.artwork_shipping_own}
          onChange={value => onInputShippingData("artwork_shipping_own", value)} 
        />

        <ShippingCard 
          location="Rest of the world" 
          element="artwork_shipping_rest" 
          formError={formError} 
          previewMode={previewMode}
          value={formState.artwork_shipping.artwork_shipping_rest} 
          onChange={value => onInputShippingData("artwork_shipping_rest", value)} 
        />

        {formState.artwork_shipping.artwork_shipping_exceptions.map(exception => (
          <ShippingCard
            key={exception.id} 
            location={exception.location} 
            element={exception.element}
            formError={formError} 
            previewMode={previewMode}
            value={exception} 
            onChange={value => onInputShippingData("artwork_shipping_exceptions", formState.artwork_shipping.artwork_shipping_exceptions.map(item => {
              if(item.id === exception.id) return value;
              else return item;
            }))} 
            deleteException={() => onInputShippingData("artwork_shipping_exceptions", formState.artwork_shipping.artwork_shipping_exceptions.filter(item => item.id !== exception.id))}
          />
        ))}

        {!previewMode && <>
          <AddException setFormState={setFormState} type="COUNTRY_EXCEPTION"/>
          <AddException setFormState={setFormState} type="CONTINENT_EXCEPTION"/>
        </>}

        {!previewMode && <SaveShippingData formState={formState}/>}

        {!previewMode && <SubmitButton 
          formState={formState} 
          formError={formError}
          setFormError={setFormError} 
          editMode={editMode}
        />}
      </div>
    </>
  );
}
