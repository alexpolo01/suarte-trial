import { useState } from 'react';

import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/UpdateShippingItem.css';

export default function UpdateShippingItem({ data, close, onUpdateShippingData }) {
  const [newName, setNewName] = useState(data.saved_shipping_name);

  return (
    <>
      <div className="update-shipping-item__header">
        <Text className="update-shipping-item__header-text" medium>Rename shipping information</Text>
        <XIcon className="update-shipping-item__close" onClick={close}/>
      </div>

      <input 
        type="text" 
        className="update-shipping-item__input" 
        value={newName} 
        onChange={e => setNewName(e.target.value)} 
        autoComplete="off" 
        spellCheck={false}
        placeholder="New shipping name..."
      />

      <ContinueButton 
        turnOff={newName === ""}
        onClick={()=>{
          onUpdateShippingData({
            ...data,
            saved_shipping_name: newName
          });
          close();
        }}
      >
                Save changes
      </ContinueButton>
    </>
  );
}
