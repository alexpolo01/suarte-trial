import XIcon from '@/shared-components/icons/components/public/XIcon';
import PopupToBottomSheet from '@/shared-components/popups/components/PopupToBottomSheet';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './virtual-list';

import './index.css';

export default function AddToArtlist({ open, close }) {
  return (
    <>
      <PopupToBottomSheet 
        open={open} 
        close={close} 
        popupOptions={{ opacity: true }} 
        onTouchStart={e=>e.stopPropagation()} 
        onTouchEnd={e=>e.stopPropagation()} 
        onWheel={e=>e.stopPropagation()}
      >
        <div className="artwork-view-add-to-artlist__container">
          <div className="artwork-view-add-to-artlist__header">
            <Text className="artwork-view-add-to-artlist__header-text" small>
                            Add to artlist
            </Text>

            <XIcon className="artwork-view-add-to-artlist__close" onClick={close}/>
          </div>

          <VirtualList close={close}/>
        </div>
      </PopupToBottomSheet>
    </>
  );
}
