import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/SaveShippingData.css';

function SaveShippingDataContent({ formState, close }) {
  const [shippingName, setShippingName] = useState("");
  const { state, stateHandler } = useStateHandler();

  function saveShippingData() {
    const newShippingData = {
      saved_shipping_name: shippingName,
      _id: uuidv4(),
      data: formState.artwork_shipping,
    };

    const newGalleryShippings = [...state.user_session.gallery_shippings, newShippingData];

    stateHandler.set("user_session.gallery_shippings", newGalleryShippings);
    GalleryService.updateGalleryShippings(newGalleryShippings);
    stateHandler.set("temporalPopup", { text: "Shipping information saved successfully", type: "no-navigation" });
    close();
  }

  return (
    <>
      <input 
        type="text" 
        className="save-shipping-data__input" 
        autoComplete='off' 
        spellCheck={false}
        value={shippingName}
        onChange={(e)=>setShippingName(e.target.value)}
        placeholder="Enter shipping information name..."
      />

      <ContinueButton turnOff={shippingName === ""} onClick={saveShippingData}>
                Save 
      </ContinueButton>
    </>
  );
}

export default function SaveShippingData({ formState }) {
  const [openSaveModal, setOpenSaveModal] = useState(false);

  return (
    <>
      <Text className="save-shipping-data-opener element-non-selectable" onClick={()=>setOpenSaveModal(true)} medium>
                Save this shipping information for a future
      </Text>

      <GenericPopup open={openSaveModal} className="save-shipping-data-popup" opacity>
        <div className="save-shipping-data-popup__header">
          <Text className="save-shipping-data-popup__header-text" medium>
                        Save shipping information
          </Text>
          <XIcon className="save-shipping-data-popup__close" onClick={()=>setOpenSaveModal(false)}/>
        </div>

        <Text className="save-shipping-data-popup__text" small>
                    Give this information a name (e.g. large works).
        </Text>

        <SaveShippingDataContent formState={formState} close={()=>setOpenSaveModal(false)}/>
      </GenericPopup>
    </>
  );
}
