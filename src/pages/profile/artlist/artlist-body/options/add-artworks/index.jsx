import XIcon from '@/shared-components/icons/components/public/XIcon';
import PopupToBottomSheet from '@/shared-components/popups/components/PopupToBottomSheet';
import Text from '@/shared-components/text/components/Text';

import Search from './search';

import './index.css';

export default function AddArtworks({ open, close }) {
  return (
    <>
      <PopupToBottomSheet 
        className="artlist-add-artworks-popup-bottom-sheet__container" 
        open={open} 
        close={close} 
        popupOptions={{ opacity: true }}
      >
        <div className="artlist-add-artworks__content-container">
          <div className="artlist-add-artworks__header">
            <Text className="artlist-add-artworks__header-text" medium>
                            Add artworks
            </Text>
                        
            <XIcon className="artlist-add-artworks__close-button" onClick={close}/>
          </div>

          <Search/>
        </div>
      </PopupToBottomSheet>
    </>
  );
}
