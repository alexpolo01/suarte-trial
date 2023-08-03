import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import InfoIcon from '@/shared-components/icons/components/public/InfoIcon';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import Popup from '@/shared-components/popups/components/Popup';
import Text from '@/shared-components/text/components/Text';

import './styles/ProfileUsername.css';

export default function ProfileUsername({ userType, userFlags, readOnly, error, value, onChange }) {
  const [openUsernameLockedModal, setOpenUsernameLockedModal] = useState(false);
  const isUsernameLocked = (userType !== "gallery" && !userFlags.suarteroad_completed);
  const navigate = useNavigate();

  return (
    <>
      <div className={`profile-username__container ${isUsernameLocked ? "locked" : ""}`}>
        <PublicFormInput 
          element="user_username"
          placeholder="Username" 
          readOnly={readOnly || isUsernameLocked} 
          error={error} 
          value={value}
          onChange={onChange}
        />

        <InfoIcon className="profile-username__username-locked-icon" onClick={()=>setOpenUsernameLockedModal(true)}/>
      </div>

      <Popup 
        open={openUsernameLockedModal} 
        close={()=>setOpenUsernameLockedModal(false)} 
        className="profile-username__locked-popup" 
        title="Change username" 
        darkerBlur
      >
        <Text className="profile-username__locked-text" small paragraph justify>
                    Usernames are locked for editing. However, 
                    once you complete Suarte Road, you'll have the 
                    opportunity to update it one more time.
        </Text>

        <ContinueButton className="profile-username__suarteroad-button mt-m" onClick={()=>navigate("/profile/suarte-road", { from: true })}>
                    Go to Suarte Road
        </ContinueButton>
      </Popup>
    </>
  );
}
