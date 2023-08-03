import XIcon from '@/shared-components/icons/components/public/XIcon';
import Text from '@/shared-components/text/components/Text';

import GenericPopup from './GenericPopup';

import './styles/GalleryBuyDenied.css';

export default function GalleryBuyDenied({ open, close }) {
  return (
    <>
      <GenericPopup
        open={open}
        className="gallery-buy-denied-popup"
        opacity
      >
        <div className="gallery-buy-denied-popup__header">
          <Text className="gallery-buy-denied-popup__header-text" medium>
                        Galleries can't make purchases
          </Text>

          <XIcon className="gallery-buy-denied-popup__close" onClick={close}/>
        </div>

        <Text className="gallery-buy-denied-popup__text" paragraph justify small>
                    To complete a purchase, you must have an artist account or sign in as a regular user.
        </Text>
      </GenericPopup>
    </>
  );
}
