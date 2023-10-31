import SearchNavbarIcon from '@/shared-components/icons/components/navigation/SearchNavbarIcon';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import PopupToBottomSheet from '@/shared-components/popups/components/PopupToBottomSheet';

import './index.css';

function AddArtworksPopupContent({ close }) {

  return (
    <>
      <div className="add-artworks-popup-content">
        <div className="add-artworks-popup-content__header">
          <h5 className="add-artworks-popup-content__header-text">Add artworks</h5>
          <XIcon className="add-artworks-popup-content__header-close" onClick={close}/>
        </div>
        <div className="add-artworks-popup__search-container">
          <SearchNavbarIcon className="add-artworks-popup__search-icon"/>
          <input 
            type="text" 
            className="add-artworks-popup__search-input"
            placeholder="Search"
            spellCheck={false} 
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
}

export default function AddArtworksPopup({ open, onClose }) {
  return (
    <>
      <PopupToBottomSheet
        className="add-artworks-popup-container" 
        open={open} 
        close={onClose} 
        popupOptions={{ opacity: true }}
      >
        <AddArtworksPopupContent close={onClose}/>
      </PopupToBottomSheet>
    </>
  );
}
