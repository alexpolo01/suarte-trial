import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGoBack from '@/hooks/useGoBack';
import ShareProfileIcon from '@/shared-components/icons/components/actions/ShareProfileIcon';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import ThreeDotsIcon from '@/shared-components/icons/components/public/ThreeDotsIcon';
import ProfileNotificationsIcon from '@/shared-components/icons/components/user-profile/ProfileNotificationsIcon';

import ProfileOptions from './components/ProfileOptions';

import './index.css';

export default function ProfileTopButtons({ fetchData, internal }) {
  const [open, setOpen] = useState(false);
  const goBackHandler = useGoBack("/");
  const navigate = useNavigate();

  if(!internal) {
    return (
      <>
        <BackArrowIcon className="profile-top-buttons__go-back" onClick={goBackHandler}/>

        {navigator.share && (
          <ShareProfileIcon 
            className="profile-top-buttons__share-button" 
            onClick={()=>{
              navigator.share({
                title: `@${fetchData.user_username}'s profile`,
                text: `Take a look at @${fetchData.user_username}'s profile:`,
                url: `https://suarte.art/user/${fetchData.user_username}`
              });
            }}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <div className="profile-top-buttons__group">
          <ProfileNotificationsIcon className="profile-top-buttons__notifications-icon" onClick={()=>navigate('/notifications')}/>
          <ThreeDotsIcon className={`profile-top-buttons__profile-options-icon${open ? " active" : ""}`} onClick={()=>setOpen(!open)}/>
        </div>
    
        <ProfileOptions 
          open={open} 
          setOpen={setOpen} 
          fetchData={fetchData}
        />
      </>
    );
  }
}
