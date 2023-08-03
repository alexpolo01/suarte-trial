import { useNavigate } from 'react-router-dom';

import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtworkRatingDisplayer from '@/shared-components/inputs/components/ArtworkRatingDisplayer';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/CommunityRatingCard.css';

export default function CommunityRatingCard({ data, ratingUser }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="community-rating-card__container" onClick={()=>navigate(`/artwork/${data.rating_artwork._id}`, { state: { from: true } })}>
        <div className="comunity-rating-card__user-section">
          <UserProfileImage 
            image={ratingUser.user_image?.image_id} 
            typeOfProfile={ratingUser.user_type} 
            className="community-rating-card__user-image"
          />

          <Text className="community-rating-card__small-text" extraSmall paragraph>
            <span className="username">
              {ratingUser.user_username}
            </span> 

            {" "}on{" "} 

            <span className="title">
              {data.rating_artwork.artwork_about.artwork_title}
            </span>
          </Text>

          <Text className="community-rating-card__small-text elapsed" extraSmall paragraph>
            {Utils.elapsedTime(new Date(data.createdAt).getTime())}
          </Text>
        </div>

        <div className="community-rating-card__rating-section">
          <div className="community-rating-card__ratings">
            <ArtworkRatingDisplayer 
              className="community-rating-card__rating" 
              category="Emotions" 
              username={ratingUser.user_username} 
              userRating={data.rating_values.emotions} 
              myRating={data.my_rating.rating_values.emotions}
            />

            <ArtworkRatingDisplayer 
              className="community-rating-card__rating" 
              category="Style" 
              username={ratingUser.user_username} 
              userRating={data.rating_values.style} 
              myRating={data.my_rating.rating_values.style}
            />

            <ArtworkRatingDisplayer 
              className="community-rating-card__rating" 
              category="Time travel" 
              username={ratingUser.user_username} 
              userRating={data.rating_values.time_travel} 
              myRating={data.my_rating.rating_values.time_travel}
            />
          </div>

          <ArtworkImage 
            image={data.rating_artwork.artwork_media.artwork_main_picture.image_id} 
            imageClassName="community-rating-card__artwork-image" 
            imageTemplateClassName="community-rating-card__artwork-image"
            forceSmaller={300}
          />
        </div>
      </div>
    </>
  );
}
