import { useRef } from 'react';

import useNavigateWithTransition from '@/hooks/useNavigateWithTransition';
import FollowButton from '@/shared-components/buttons/components/FollowButton';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/HomeUserCard.css';

export default function HomeUserCard({ userData, style={}, infiniteScrollObserver }) {
  const navigateWithTransition = useNavigateWithTransition();
  const imageWrapperRef = useRef(null);

  return (
    <>
      <div 
        className="home-user-card__container element-non-selectable" 
        style={style} 
        onClick={() => {
          imageWrapperRef.current.style.viewTransitionName = `user_${userData._id}_animation`;
          navigateWithTransition(`/user/${userData.user_username}`, { state: { from: true } });
        }} 
        ref={infiniteScrollObserver}
      >
        <div className="home-user-card__image-wrapper" ref={imageWrapperRef}>
          <UserProfileImage 
            className="home-user-card__image" 
            image={userData.user_image?.image_id} 
            typeOfProfile={userData.user_type}
          />
        </div>

        <div className="home-user-card__info">
          <Text className="home-user-card__user-name dots-on-overflow" medium>
            {userData.user_name}
            {(userData.user_type === "artist" && userData.user_flags.suarteroad_completed) && <ArtistVerifiedIcon className="home-user-card__artist-verified"/>}
          </Text>

          <Text className="home-user-card__username dots-on-overflow" extraSmall>
                        @{userData.user_username}
          </Text>

          <div className="home-user-card__stats-container">
            <div className="home-user-card__stat">
              <Text className="home-user-card__stat-number" medium>
                {Utils.numberParserMillionThousand(userData.user_profile_info.user_artworks)}
              </Text>

              <Text className="home-user-card__stat-category" extraSmall>
                                Artworks
              </Text>
            </div>
                        
            <div className="home-user-card__stat">
              <Text className="home-user-card__stat-number" medium>
                {Utils.numberParserMillionThousand(userData.user_profile_info.user_inspiring)}
              </Text>

              <Text className="home-user-card__stat-category" extraSmall>
                                Inspiring
              </Text>
            </div>

            <div className="home-user-card__stat">
              <Text className="home-user-card__stat-number" medium>
                {Utils.numberParserMillionThousand(userData.user_profile_info.user_likes)}
              </Text>

              <Text className="home-user-card__stat-category" extraSmall>
                                Likes
              </Text>
            </div>
          </div>

          <FollowButton 
            className="home-user-card__follow-button" 
            userId={userData._id} 
            isFollowingMe={userData.is_following_me} 
            imFollowing={userData.im_following} 
            small
          />
        </div>
      </div>
    </>
  );
}
