import { useNavigate } from 'react-router-dom';

import FollowButton from '@/shared-components/buttons/components/FollowButton';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/Row.css';

export default function Row({ data }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="search-users-user-suggestion__container" onClick={()=>navigate(`/user/${data.user_username}`, { state: { from: true } })}>
        <UserProfileImage 
          className="search-users-user-suggestion__image" 
          typeOfProfile={data.user_type} 
          image={data.user_image?.image_id}
        />
                
        <div className="search-users-user-suggestion__text-container">
          {
            data.user_type !== "collector" ? 
              <>
                <Text className="search-users-user-suggestion__main-text dots-on-overflow" medium>
                  {data.user_name}
                  {(data.user_type === "artist" && data.user_flags.suarteroad_completed) && <ArtistVerifiedIcon className="search-users-user-suggestion__verified-icon"/>}
                </Text>

                <Text className="search-users-user-suggestion__secondary-text dots-on-overflow" small>
                                    @{data.user_username}
                </Text>
              </>
              : 
              <Text className="search-users-user-suggestion__main-text dots-on-overflow" medium>
                {data.user_username}
              </Text>
          }
        </div>

        <FollowButton 
          userId={data._id} 
          imFollowing={data.im_following} 
          isFollowingMe={data.is_following_me} 
          className="search-users__follow-button" 
          small
        />
      </div>
    </>
  );
}