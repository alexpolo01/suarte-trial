import { useState } from 'react';

import RemoveButton from '@/shared-components/buttons/components/RemoveButton';
import ArtworkConfirmationDialog from '@/shared-components/forms/add-artwork/components/ArtworkConfirmationDialog';
import EditCardIcon from '@/shared-components/icons/components/settings/EditCardIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import UpdateShippingItem from './UpdateShippingItem';

import './styles/ShippingItem.css';

export default function ShippingItem({ data, onSelectShippingData, onUpdateShippingData, onRemoveShippingData }) {
  const [openRemoveConfirmation, setOpenRemoveConfirmation] = useState(false);
  const [openSelectConfirmation, setOpenSelectConfirmation] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  return (
    <>
      <div className="shipping-item__container" onClick={()=>setOpenSelectConfirmation(true)}>
        <RemoveButton className="shipping-item__remove" onClick={e => {e.stopPropagation(); setOpenRemoveConfirmation(true);}}/>
        <Text className="shipping-item__name dots-on-overflow" medium>{data.saved_shipping_name}</Text>
        <EditCardIcon className="shipping-item__edit" onClick={e => {e.stopPropagation(); setOpenUpdateModal(true);}}/>
      </div>

      <ArtworkConfirmationDialog open={openSelectConfirmation} close={()=>setOpenSelectConfirmation(false)} onConfirm={()=>onSelectShippingData(data)} confirmText="Yes, select">
        <Text className="shipping-item__confirm-text" paragraph small>
                    Do you want to select <span>{data.saved_shipping_name}</span> as your shipping options?
        </Text>
      </ArtworkConfirmationDialog>

      <ArtworkConfirmationDialog open={openRemoveConfirmation} close={()=>setOpenRemoveConfirmation(false)} onConfirm={()=>onRemoveShippingData(data)} confirmText="Yes, remove">
        <Text className="shipping-item__confirm-text" paragraph small>
                    Do you want to <span>delete</span> this shipping information?
        </Text>
      </ArtworkConfirmationDialog>

      <GenericPopup className="shipping-item-update-popup remove-scrollbar" open={openUpdateModal} opacity>
        <UpdateShippingItem data={data} onUpdateShippingData={onUpdateShippingData} close={()=>setOpenUpdateModal(false)}/>
      </GenericPopup>
    </>
  );
}
