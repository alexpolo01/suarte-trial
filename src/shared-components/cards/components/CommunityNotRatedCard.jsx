import { useNavigate } from 'react-router-dom';

import useProtectAction from '@/hooks/useProtectAction';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/CommunityNotRatedCard.css';

export default function CommunityNotRatedCard({ data, ratingUser }) {
  const privateActionHandler = useProtectAction({ typeOfProtection: "USER_ACCOUNT_REQUIRED" });
  const navigate = useNavigate();

  return (
    <>
      <div className="community-not-rated-card__outter-container">
        <div className="community-not-rated-card__container">
          <div className="comunity-not-rated-card__user-section">
            <UserProfileImage 
              image={ratingUser.user_image?.image_id} 
              typeOfProfile={ratingUser.user_type} 
              className="community-not-rated-card__user-image"
            />

            <Text className="community-not-rated-card__small-text" extraSmall paragraph>
              <span className="username">
                {ratingUser.user_username}
              </span> 

              {" "}on{" "} 

              <span className="title">
                {data.rating_artwork.artwork_about.artwork_title}
              </span>
            </Text>

            <Text className="community-not-rated-card__small-text elapsed" extraSmall paragraph>
              {Utils.elapsedTime(new Date(data.createdAt).getTime())}
            </Text>
          </div>

          <Text className="community-not-rated-card__rate-button" small onClick={()=>privateActionHandler(()=>navigate(`/artwork/${data.rating_artwork._id}?rate=true`, { state: { from: true } }))}>
                        Rate
          </Text>

          <ArtworkImage 
            image={data.rating_artwork.artwork_media.artwork_main_picture.image_id} 
            imageClassName="community-not-rated-card__artwork-image" 
            imageTemplateClassName="community-not-rated-card__artwork-image"
            forceSmaller={300}
          />
        </div>
      </div>
    </>
  );
}
