import { useState } from 'react';

import config from '@/config';
import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import PopupToBottomSheet from '@/shared-components/popups/components/PopupToBottomSheet';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/AddShippingAddress.css';

function AddShippingAddressContent({ addressData, onAdd, previewMode, editMode, close }) {
  const [formState, setFormState] = useState(Utils.initShippingAddressForm(addressData));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submitAddress(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if(editMode) {
      const { response, data } = await UserService.editShippingAddress(formState);

      if(response.ok) {
        setLoading(false);
        onAdd(data);
        close();
      } else if(response.status === 400) {
        setLoading(false);
        setError({ element: data.error_data.element, error_code: data.error_type });
      }
    } else {
      const { response, data } = await UserService.addShippingAddress(formState);

      if(response.ok) {
        setLoading(false);
        onAdd(data);
        close();
      } else if(response.status === 400) {
        setLoading(false);
        setError({ element: data.error_data.element, error_code: data.error_type });
      }
    }
  }

  function updateFormState(key, value) {
    setFormState(Utils.addAttributeToObject(key, value, formState));
  }

  return (
    <>
      <form onSubmit={submitAddress} className="add-shipping-address__form remove-scrollbar">
        <div className="add-shipping-address__header">
          <Text className="add-shipping-address__header-text" medium>
            {
              editMode ? 
                "Edit shipping address"
                : previewMode ?
                  "Collector's shipping information"
                  :
                  "Add shipping address"
            }
          </Text>

          <XIcon className="add-shipping-address__close" onClick={close}/>
        </div>

        <div className="add-shipping-address__group">
          <PublicFormInput 
            value={formState.address_name} 
            onChange={e=>updateFormState("address_name", e.target.value)}
            className="add-shipping-address__group-item item-margin" 
            readOnly={loading || previewMode} 
            error={error} 
            placeholder="Name" 
            element="address_name" 
            margin
          />

          <PublicFormInput 
            value={formState.address_surname} 
            onChange={e=>updateFormState("address_surname", e.target.value)}
            className="add-shipping-address__group-item" 
            readOnly={loading || previewMode} 
            error={error} 
            placeholder="Surname" 
            element="address_surname"
            margin
          />
        </div>

        <div className="add-shipping-address__group phone">
          <PublicFormInput 
            value={formState.address_phone.address_phone_prefix} 
            onChange={value=>updateFormState("address_phone.address_phone_prefix", value)}
            className="add-shipping-address__phone-prefix" 
            readOnly={loading || previewMode} 
            error={error} 
            placeholder="Phone prefix" 
            element="address_phone.address_phone_prefix" 
            margin 
            type="select" 
            selectOptions={{ options: config.forms.prefix_options, type: "phone_prefix" }}
          />

          <PublicFormInput 
            value={formState.address_phone.address_phone_number} 
            onChange={e=>updateFormState("address_phone.address_phone_number", e.target.value)}
            readOnly={loading || previewMode} 
            error={error} 
            placeholder="Phone number" 
            element="address_phone.address_phone_number" 
            margin
          />
        </div>

        <div className="add-shipping-address__group">
          <PublicFormInput 
            value={formState.address_region} 
            onChange={e=>updateFormState("address_region", e.target.value)} 
            className="add-shipping-address__group-item item-margin" 
            readOnly={loading || previewMode} 
            error={error} 
            placeholder="Province/Region" 
            element="address_region" 
            margin
          />

          <PublicFormInput 
            value={formState.address_country} 
            onChange={value=>updateFormState("address_country", value)}
            className="add-shipping-address__group-item" 
            readOnly={loading || previewMode} 
            error={error} 
            placeholder="Country" 
            element="address_country" 
            margin 
            type="select" 
            selectOptions={{ options: config.forms.prefix_options, type: "country" }}
          />
        </div>

        <PublicFormInput 
          value={formState.address_street} 
          onChange={e=>updateFormState("address_street", e.target.value)}
          readOnly={loading || previewMode} 
          error={error} 
          placeholder="Address" 
          element="address_street" 
          margin
        />

        <div className="add-shipping-address__group">
          <PublicFormInput 
            value={formState.address_city} 
            onChange={e=>updateFormState("address_city", e.target.value)} 
            className="add-shipping-address__group-item item-margin" 
            readOnly={loading || previewMode} 
            error={error} 
            placeholder="City" 
            element="address_city" 
            margin
          />

          <PublicFormInput 
            value={formState.address_zip_code} 
            onChange={e=>updateFormState("address_zip_code", e.target.value)}
            className="add-shipping-address__group-item" 
            readOnly={loading || previewMode} 
            error={error} 
            placeholder="Zip code" 
            element="address_zip_code" 
            margin
          />
        </div>

        {!previewMode && (
          <ContinueButton className="add-shipping-address__button mt-m" loading={loading}>
            {
              editMode ? 
                "Save changes" 
                : 
                "Add shipping address"
            }
          </ContinueButton>
        )}
      </form>
    </>
  );
}

export default function AddShippingAddress({ open, close, addressData, onAdd, previewMode=false, editMode=false }) {
  return (
    <>
      <PopupToBottomSheet 
        open={open} 
        close={close} 
        popupOptions={{ opacity: true }}
      >
        <AddShippingAddressContent 
          addressData={addressData}
          onAdd={onAdd}
          previewMode={previewMode}
          editMode={editMode} 
          close={close} 
        />
      </PopupToBottomSheet>
    </>
  );
}
