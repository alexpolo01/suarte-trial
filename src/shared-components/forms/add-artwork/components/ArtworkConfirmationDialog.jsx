import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/ArtworkConfirmationDialog.css';

export default function ArtworkConfirmationDialog({ open, close, children, onConfirm, confirmText, loading }) {
  return (
    <>
      <GenericPopup className="artwork-confirmation-dialog remove-scrollbar" open={open} opacity>
        {children}

        <div className="artwork-confirmation-dialog__action-buttons element-non-selectable">
          <Text className="artwork-confirmation-dialog__button cancel" onClick={close} medium>
                        No, go back
          </Text>
                    
          <Text className={`artwork-confirmation-dialog__button confirm ${loading ? "loading" : ""}`} onClick={onConfirm} medium>
            {confirmText}
            {loading && <CustomSpinner className="artwork-confirmatin-dialog__spinner" thin/>}
          </Text>
        </div>
      </GenericPopup>
    </>
  );
}
