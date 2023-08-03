import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import GenericBottomSheet from '@/shared-components/popups/components/GenericBottomSheet';
import Text from '@/shared-components/text/components/Text';

import ShippingDataContent from './components/ShippingDataContent';

import './index.css';

export default function SelectShippingData({ setFormState }) {
  const { state, stateHandler } = useStateHandler();
  const [openShippingData, setOpenShippingData] = useState(false);

  if(!state.user_session.gallery_shippings || state.user_session.gallery_shippings.length === 0) {
    return <></>;
  }

  function onSelectShippingData(shippingData) {
    setFormState(prevValue => ({
      ...prevValue,
      artwork_shipping: shippingData.data
    }));
    setOpenShippingData(false);
  }

  function onUpdateShippingData(shippingData) {
    const newSavedShippingData = state.user_session.gallery_shippings.map(item => {
      if(item._id === shippingData._id) return shippingData;
      else return item;
    });
    stateHandler.set("user_session.gallery_shippings", newSavedShippingData);
    GalleryService.updateGalleryShippings(newSavedShippingData);
  }

  function onRemoveShippingData(shippingData) {
    const newSavedShippingData = state.user_session.gallery_shippings.filter(item => item._id !== shippingData._id);
    stateHandler.set("user_session.gallery_shippings", newSavedShippingData);
    GalleryService.updateGalleryShippings(newSavedShippingData);
        
    if(newSavedShippingData.length === 0) setOpenShippingData(false);
  }

  return (
    <>
      <Text className="select-shipping-data-opener element-non-selectable" onClick={()=>setOpenShippingData(true)} medium>
                Select saved shipping info
      </Text>

      <GenericBottomSheet className="select-shipping-data-bottom-sheet" open={openShippingData} close={()=>setOpenShippingData(false)}>
        <ShippingDataContent
          shippingData={state.user_session.gallery_shippings}
          onSelectShippingData={onSelectShippingData}
          onUpdateShippingData={onUpdateShippingData}
          onRemoveShippingData={onRemoveShippingData}
          close={()=>setOpenShippingData(false)}
        />
      </GenericBottomSheet>
    </>
  );
}
