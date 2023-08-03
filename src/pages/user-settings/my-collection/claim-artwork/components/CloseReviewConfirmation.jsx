import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/CloseReviewConfirmation.css';

export default function CloseReviewConfirmation({ open, close, onConfirm }) {
  return (
    <>
      <GenericPopup open={open} className="close-review-confirmation" opacity>
        <div className="close-review-confirmation__header">
          <Text className="close-review-confirmation__header-text" medium>
                        Claim artwork
          </Text>

          <XIcon className="close-review-confirmation__close" onClick={close}/>
        </div>

        <Text className="close-review-confirmation__text" paragraph justify small>
                    Are you sure you want to exit the claim process? The artwork will not appear in your collection.
        </Text>

        <div className="close-review-confirmation__buttons">
          <Text className="close-review-confirmation__button cancel" onClick={close} medium>
                        Cancel
          </Text>

          <Text className="close-review-confirmation__button confirm" onClick={()=>{onConfirm(); close();}} medium>
                        Exit
          </Text>
        </div>
      </GenericPopup>
            
    </>
  );
}
