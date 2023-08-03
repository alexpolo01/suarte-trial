import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/NotificationsHeader.css';

export default function NotificationsHeader({ user, primaryText, secondaryText }) {
  return (
    <>
      <div className="home-notifications-header">
        <UserProfileImage 
          image={user.user_image?.image_id} 
          typeOfProfile={user.user_type} 
          className="home-notifications-header__user-image" 
          onClick={()=>alert("Esto deberia de ir al perfil del usuario")}
        />

        <div className="home-notifications-header__text-container">
          <Text className="home-notifications-header__user-name dots-on-overflow" medium>
            {user.user_name ? user.user_name : user.user_username}
            {(user.user_type === "artist" && user.user_flags.suarteroad_completed) && <ArtistVerifiedIcon className="home-notifications-header__artist-icon"/>}
          </Text>

          <Text className="home-notifications-header__text dots-on-overflow" small>
            {primaryText}
            {secondaryText && <span>"<span className="home-notifications-header__secondary-text">{secondaryText}</span>"</span>}
          </Text>
        </div>
      </div>
    </>
  );
}
