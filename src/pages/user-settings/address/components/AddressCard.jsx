import RemoveButton from '@/shared-components/buttons/components/RemoveButton';
import EditCardIcon from '@/shared-components/icons/components/settings/EditCardIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/AddressCard.css';

export default function AddressCard({ addressData, setAddressToEdit, setAddressToRemove }) {
  return (
    <>
      <div className="address-item__container">
        <RemoveButton className="address-item__remove-address" onClick={()=>setAddressToRemove(addressData)}/>

        <div className="address-item__address-info-container">
          <div className="address-item__address-info-text-container">
            <Text className="address-item__address-info-text text-margin" paragraph medium>
              {addressData.address_name} {addressData.address_surname}
            </Text>

            <Text className="address-item__address-info-text text-margin" paragraph medium>
              {addressData.address_address}
            </Text>

            <Text className="address-item__address-info-text text-margin" paragraph medium>
              {addressData.address_city}, {addressData.address_zip_code}
            </Text>

            <Text className="address-item__address-info-text text-margin" paragraph medium>
              {addressData.address_region}, {addressData.address_country}
            </Text>

            <Text className="address-item__address-info-text text-margin" paragraph medium>
              {addressData.address_phone.address_phone_prefix} {addressData.address_phone.address_phone_number}
            </Text>
          </div>

          <EditCardIcon className="address-item__address-info-edit-button" onClick={()=>setAddressToEdit(addressData)}/>
        </div>
      </div>
    </>
  );
}
