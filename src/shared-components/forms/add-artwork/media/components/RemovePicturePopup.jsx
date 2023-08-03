import config from '@/config';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/RemovePicturePopup.css';

/** This component receives already the handler for removing the data (each component is responsable for giving this one the correct way to remove the picture) */
export default function RemovePicturePopup({ open, close, pictureData, removePicture }) {
  return (
    <>
      <GenericPopup open={open} blur className="add-artwork-remove-picture-popup" backgroundClassName="add-artwork-remove-picture-popup-background">
        <Text className="add-artwork-remove-picture-popup-text" medium paragraph justify>Are you sure you want to delete this image?</Text>

        <div className="add-artwork-remove-picture-popup__picture-details-container">
          <img src={`${config.app.imageServiceDomain}/${pictureData?.image_id}/w=200`} alt="artwork pic to remove" className="add-artwork-remove-picture-popup__picture-details-picture" />
          <Text className="add-artwork-remove-picture-popup__picture-details-picture-name" medium paragraph>{pictureData?.image_original_data.name}</Text>
        </div>

        <div className="add-artwork-remove-picture-popup__actions">
          <div className="add-artwork-remove-picture-popup__keep-it" onClick={close}>
            <Text className="add-artwork-remove-picture-popup__keep-it-text" medium>Keep it.</Text>
          </div>

          <div className="add-artwork-remove-picture-popup__delete" onClick={removePicture}>
            <Text className="add-artwork-remove-picture-popup__delete-text" medium>Yes, delete.</Text>
          </div>
        </div>
      </GenericPopup>
    </>
  );
}
