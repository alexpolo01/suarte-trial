import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import EditArtlistForm from './edit-artlist-form';

import './index.css';

export default function EditArtlist({ open, close }) {
  return (
    <>
      <GenericPopup 
        className="edit-artlist-popup" 
        open={open}
        opacity
      >
        <div className="edit-artlist-content__outter-container">
          <div className="edit-artlist-content__container">
            <div className="edit-artlist-content__header">
              <Text className="edit-artlist-content__header-text" medium>
                                Save changes
              </Text>

              <XIcon className="edit-artlist-content__close" onClick={close}/>
            </div>

            <EditArtlistForm close={close}/>
          </div>
        </div>
      </GenericPopup>
    </>
  );
}
