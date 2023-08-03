import { useNavigate } from 'react-router-dom';

import FollowButton from '@/shared-components/buttons/components/FollowButton';
import Text from '@/shared-components/text/components/Text';

import './styles/ProfileButton.css';

export default function ProfileButton({ fetchData, setFetchData, internal }) {
  const navigate = useNavigate();

  function onFollowAction(followStatus) {
    if(followStatus) {
      setFetchData({
        ...fetchData,
        user_profile_info: {
          ...fetchData.user_profile_info,
          user_inspiring: fetchData.user_profile_info.user_inspiring + 1
        }
      });
    } else {
      setFetchData({
        ...fetchData,
        user_profile_info: {
          ...fetchData.user_profile_info,
          user_inspiring: fetchData.user_profile_info.user_inspiring - 1
        }
      });
    }
  }

  if(internal) {
    return (
      <Text className="profile-button__button" medium onClick={()=>navigate("/profile/settings/edit-profile", { state: { from: true } })}>
                Edit profile
      </Text>
    );
  } else {
    return (
      <FollowButton 
        userId={fetchData._id} 
        imFollowing={fetchData.im_following} 
        isFollowingMe={fetchData.is_following_me} 
        onFollowAction={onFollowAction}
        className="profile-button__follow-button" 
        medium
      />
    );
  }
}
