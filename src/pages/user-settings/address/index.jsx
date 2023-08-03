import { useState } from 'react';

import config from '@/config';
import useCache from '@/hooks/useCache';
import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import AddShippingAddress from '@/shared-components/forms/components/AddShippingAddress';
import SettingsLoadingPage from '@/shared-components/loaders/components/SettingsLoadingPage';
import ConfirmationDialog from '@/shared-components/popups/components/ConfirmationDialog';
import SettingsHeading from '@/shared-components/text/components/SettingsHeading';
import Text from '@/shared-components/text/components/Text';

import AddressCard from './components/AddressCard';

import './index.css';

export default function Address() {
  const { state, stateHandler } = useStateHandler();
  const { loading, fetchData, setFetchData } = useCache(`${state.user_session._id}_addresses`, `${config.apis.api.url}/address`, {
    injectToken: true
  });
  const [openNewAddressForm, setOpenNewAddressForm] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [addressToRemove, setAddressToRemove] = useState(null);

  function addShippingAddress(newAddressData) {
    setFetchData([
      ...fetchData,
      newAddressData
    ]);
    stateHandler.set("temporalPopup", {
      text: `New shipping address added successfully!`, 
      type: "no-navigation"
    });
  }

  function editShippingAddress(newAddressData) {
    setFetchData(fetchData.map(address => {
      if(address._id === newAddressData._id) {
        return newAddressData;
      } else {
        return address;
      }
    }));
    stateHandler.set("temporalPopup", {
      text: `Shipping address updated successfully!`, 
      type: "no-navigation"
    });
  }

  function removeShippingAddress() {
    UserService.deleteShippingAddress(addressToRemove);
    setFetchData(fetchData.filter(address => (
      address._id !== addressToRemove._id
    )));
    stateHandler.set("temporalPopup", {
      text: `Shipping address removed successfully!`, 
      type: "no-navigation"
    });
    setAddressToRemove(null);
  }

  if(loading) {
    return (
      <SettingsLoadingPage page="Address"/>
    );
  } else {
    return (
      <>
        <SettingsHeading text="Address"/>
    
        <div className="settings-address__container">
          <Text className="settings-address__heading" large>
                        Shipping
          </Text>
    
          {
            fetchData.length === 0 ?
              <Text className="settings-address__no-address" paragraph justify small>
                                It looks like you haven't added a shipping address to your profile yet. 
                                To ensure timely delivery of your orders, please add a shipping address 
                                by clicking on the "Add shipping address" button below.
              </Text>
              :
              fetchData.map(address => (
                <AddressCard 
                  key={address._id} 
                  addressData={address}
                  setAddressToEdit={setAddressToEdit}
                  setAddressToRemove={setAddressToRemove}
                />
              ))
          }
    
          <Text className="settings-address__add-button element-non-selectable" onClick={()=>setOpenNewAddressForm(true)} medium>
                        Add shipping address
          </Text>
    
          <Text className="settings-address__bottom-text" paragraph justify small>
                        The shipping address will only be used in the purchase 
                        process so you can save this information for that moment 
                        and speed it up.
          </Text>
        </div>
    
        <AddShippingAddress
          open={openNewAddressForm}
          close={()=>setOpenNewAddressForm(false)}
          onAdd={addShippingAddress}
        />
    
        <AddShippingAddress
          open={Boolean(addressToEdit)}
          close={()=>setAddressToEdit(null)}
          addressData={addressToEdit}
          onAdd={editShippingAddress}
          editMode
        />
    
        <ConfirmationDialog
          open={Boolean(addressToRemove)}
          onClose={()=>setAddressToRemove(null)}
          title="Delete address"
          closeButtonText="Cancel"
          confirmButtonText="Delete"
          dialogText="Are you sure you want to delete this address?"
          onConfirm={removeShippingAddress}
          opacity
        />
      </>
    );
  }
}
