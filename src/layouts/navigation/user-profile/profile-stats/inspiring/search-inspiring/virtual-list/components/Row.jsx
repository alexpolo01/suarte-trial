import { useNavigate } from 'react-router-dom';

import FollowButton from '@/shared-components/buttons/components/FollowButton';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/Row.css';

export default function Row({ item }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="render-inspiring-result__outter">
        <div className="render-inspiring__result" onClick={()=>navigate(`/user/${item.user_username}`, { state: { from: true } })}>
          <div className="render-inspiring-result__container">
            <UserProfileImage 
              image={item.user_image?.image_id} 
              typeOfProfile={item.user_type} 
              className="render-inspiring-result__image"
            />

            <div className="render-inspiring-result__name-block">
              {
                item.user_type === "collector" ? 
                  <Text className="render-inspiring-result__name-username as-name" paragraph small>
                    {item.user_username}
                  </Text>
                  : 
                  <>
                    <Text className="render-inspiring-result__name-name" small paragraph>
                      {item.user_name}
                      {item.user_type === "artist" && item.user_flags.suarteroad_completed ? <ArtistVerifiedIcon className="render-inspiring-result__user-verified-icon"/> : <></>}
                    </Text>

                    <Text className="render-inspiring-result__name-username" paragraph extraSmall>
                                            @{item.user_username}
                    </Text>
                  </>
              }
            </div>

            <FollowButton 
              userId={item._id} 
              imFollowing={item.im_following} 
              isFollowingMe={item.is_following_me} 
              className="render-inspiring-result__follow-button" 
              small
            />
          </div>
        </div>
      </div>
    </>
  );
}
