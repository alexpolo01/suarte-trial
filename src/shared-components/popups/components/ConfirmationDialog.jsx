import XIcon from '@/shared-components/icons/components/public/XIcon';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import GenericPopup from './GenericPopup';

import './styles/ConfirmationDialog.css';

/** ClassName is only used to specify the size of the popup. The rest is generic */
export default function ConfirmationDialog({ className, title, open, onClose, onCloseAction, onConfirm, closeButtonText, confirmButtonText, dialogText, loading, opacity=false, blur=false, darkerBlur=false }) {
  return (
    <>
      <GenericPopup open={open} className={`confirmation-dialog-popup remove-scrollbar ${className}`} opacity={opacity} blur={blur} darkerBlur={darkerBlur}>
        <div className="confirmation-dialog-popup__header">
          <Text className="confirmation-dialog-popup__header-text" medium>{title}</Text>
          <XIcon className="confirmation-dialog-popup__close" onClick={onClose}/>
        </div>

        <Text className="confirmation-dialog-popup__text" paragraph small>{dialogText}</Text>

        <Text className="confirmation-dialog-popup__option element-non-selectable" onClick={onCloseAction ? onCloseAction : onClose} medium>{closeButtonText}</Text>
        <Text className={`confirmation-dialog-popup__option element-non-selectable delete${loading ? " disabled" : ""}`} onClick={onConfirm} medium>
          {confirmButtonText}
          {loading && <CustomSpinner className="confirmation-dialog-popup__spinner" thin/>}
        </Text>
      </GenericPopup>
    </>
  );
}
