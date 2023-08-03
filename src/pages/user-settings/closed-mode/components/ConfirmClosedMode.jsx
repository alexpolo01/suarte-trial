import { useState } from 'react';

import GalleryService from '@/services/gallery.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/ConfirmClosedMode.css';

export default function ConfirmClosedMode({ open, close, formState, closedModeData, updateClosedMode }) {
  const [loading, setLoading] = useState(false);

  async function openGallery() {
    setLoading(true);

    const { response, data } = await GalleryService.updateClosedMode(false, "");

    if(response.ok) {
      setLoading(false);
      updateClosedMode(data);
      close();
    }
  }

  async function closeGallery() {
    setLoading(true);

    const { response, data } = await GalleryService.updateClosedMode(true, formState);

    if(response.ok) {
      setLoading(false);
      updateClosedMode(data);
      close();
    }
  }

  return (
    <>
      <GenericPopup
        open={open}
        className="confirm-closed-mode__popup"
        opacity
      >
        <div className="confirm-closed-mode__header">
          <Text className="confirm-closed-mode__header-text" medium>
                        Confirmation closed mode
          </Text>

          <XIcon className="confirm-closed-mode__close" onClick={close}/>
        </div>

        {
          closedModeData ?
            <>
              <Text className="confirm-closed-mode__text" paragraph justify small>
                                Welcome back! It's great to see you again. 
                                Are you all set to open your gallery and show the world what you have?
              </Text>

              <ContinueButton 
                className="mt-m confirm-closed-mode__button" 
                loading={loading} 
                onClick={openGallery}
              >
                                Open gallery
              </ContinueButton>
            </>
            :
            <>
              <Text className="confirm-closed-mode__text" paragraph justify small>
                                You are about to activate closed mode. Your gallery's profile and artworks will 
                                still be visible on the platform. However, potential buyers will not be able 
                                to purchase your artworks.
              </Text>

              <ContinueButton 
                className="mt-m confirm-closed-mode__button" 
                loading={loading} 
                onClick={closeGallery}
              >
                                Close gallery
              </ContinueButton>
            </>
        }
      </GenericPopup>
    </>
  );
}
