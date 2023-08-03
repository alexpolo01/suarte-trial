import { useState } from 'react';
import { useNavigate } from 'react-router';

import useStateHandler from '@/hooks/useStateHandler';
import GalleryService from '@/services/gallery.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/MarkAsSoldPopup.css';

export default function MarkAsSoldPopup({ open, close, artworkData }) {
  const { cacheHandler } = useStateHandler();
  const [formState, setFormState] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  async function submitMarkAsSold(e) {
    e.preventDefault();
    setFormLoading(true);

    const { response } = await GalleryService.markArtworkAsSold(artworkData._id, formState);

    if(response.ok) {
      cacheHandler.triggerAction("BUY_ARTWORK");
      navigate('/inventory/sold', { replace: true });
    }
  }

  return (
    <>
      <GenericPopup
        open={open}
        className="mark-as-sold-popup"
        opacity
      >
        <div className="mark-as-sold-popup__header">
          <Text className="mark-as-sold-popup__header-text" medium>
                        Are you selling this artwork in-store?
          </Text>

          <XIcon className="mark-as-sold-popup__close" onClick={close}/>
        </div>

        <Text className="mark-as-sold-popup__text" paragraph justify small>
                    Enter the collector's email address so that they can claim the artwork. 
                    If the collector does not want to claim it, visit your inventory and withdraw the artwork. 
                    Keep in mind that there is no in-store commission for artworks uploaded before 2024.
        </Text>

        <form onSubmit={submitMarkAsSold} className="mark-as-sold-popup__form">
          <input 
            type="email" 
            className="mark-as-sold-popup__input mt-m"
            placeholder="Enter collector's email address"
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
                        Mark as SOLD
          </ContinueButton>
        </form>
      </GenericPopup>
    </>
  );
}
