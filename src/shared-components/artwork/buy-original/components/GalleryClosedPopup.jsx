import { useState } from 'react';

import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/GalleryClosedPopup.css';

export default function GalleryClosedPopup({ open, close, artworkData }) {
  const [formState, setFormState] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  async function submitNotifyMe(e) {
    e.preventDefault();
    setFormLoading(true);

    const { response } = await UserService.notifyWhenGalleryOpens(artworkData._id, formState);

    if(response.ok) {
      setFormLoading(false);
      setFormState("");
      close();
    }
  }

  return (
    <>
      <GenericPopup 
        className="gallery-closed-popup" 
        open={open} 
        opacity
      >
        <div className="gallery-closed-popup__header">
          <Text className="gallery-closed-popup__header-text" medium>
                        The Gallery is currently closed
          </Text>

          <XIcon className="gallery-closed-popup__close" onClick={close}/>
        </div>

        <Text 
          className="gallery-closed-popup__text" 
          style={{ marginBottom: "10px" }} 
          paragraph 
          justify 
          small
        >
          {artworkData.artwork_about.artwork_gallery.user_name} is currently closed, but no worries!{" "} 
                    You can choose to be notified when the Gallery is back in action!
        </Text>

        {Boolean(artworkData.artwork_about.artwork_gallery.gallery_closed?.reason) && (
          <Text className="gallery-closed-popup__reason" paragraph small>
            {artworkData.artwork_about.artwork_gallery.gallery_closed?.reason}
          </Text>
        )}

        <form onSubmit={submitNotifyMe} className="gallery-closed-popup__form">
          <input 
            type="email" 
            className="gallery-closed-popup__input mt-m"
            placeholder='Contact email'
            value={formState}
            onChange={e=>setFormState(e.target.value)}
            spellCheck={false}
            readOnly={formLoading}
          />

          <ContinueButton 
            className="mt-m" 
            loading={formLoading} 
            turnOff={!formState}
          >
                        Notify me
          </ContinueButton>
        </form>
      </GenericPopup>
    </>
  );
}
