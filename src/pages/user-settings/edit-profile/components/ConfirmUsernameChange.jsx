import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import Popup from '@/shared-components/popups/components/Popup';
import Text from '@/shared-components/text/components/Text';

import './styles/ConfirmUsernameChange.css';

export default function ConfirmUsernameChange({ open, close, onConfirm, newUsername, userType }) {
  return (
    <>
      <Popup 
        open={open} 
        close={close} 
        className="edit-profile__confirm-username-popup" 
        title="Confirm username" 
        opacity
      >
        <Text className="edit-profile__confirm-username-text" small paragraph justify>
                    Do you confirm <span>{newUsername}</span> as your new username?{" "}

          {
            userType === "gallery" ? 
              "Choose wisely, you only get one change every 14 days." 
              :
              "Choose wisely, you will not be able to change it in a year."
          }
        </Text>

        <ContinueButton className="edit-profile__confirm-username-button mt-m" onClick={()=>{close(); onConfirm();}}>
                    Confirm
        </ContinueButton>
      </Popup>
    </>
  );
}
