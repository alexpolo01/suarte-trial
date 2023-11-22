import { useNavigate } from 'react-router-dom';

import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtworkRatingDisplayer from '@/shared-components/inputs/components/ArtworkRatingDisplayer';
import Text from '@/shared-components/text/components/Text';

import './styles/RatingCard.css';

export default function RatingCard({ myRatingData, ratingData }) {
  const navigate = useNavigate();
  console.log(myRatingData, ratingData);

  return (
    <>
      <div className="artwork-user-rating-card__container" onClick={()=>navigate(`/user/${ratingData.rating_creator.user_username}`, { state: { from: true } })}>
        <UserProfileImage
          typeOfProfile={ratingData.rating_creator?.user_type ?? ""}
          image={ratingData.rating_creator?.user_image?.image_id ?? ""}
          className="artwork-user-rating-card__user-image"
        />

        <Text className="artwork-user-rating-card__username dots-on-overflow" paragraph extraSmall>
          {ratingData.rating_creator?.user_username ?? ""}
        </Text>

        <div className="artwork-user-rating-card__rating-categories">
          <ArtworkRatingDisplayer 
            className="artwork-user-rating-card__rating-displayer" 
            category="Emotions" 
            username={ratingData.rating_creator?.user_username ?? ""} 
            userRating={ratingData.rating_values.emotions} 
            myRating={myRatingData.rating_values.emotions}
          />

          <ArtworkRatingDisplayer 
            className="artwork-user-rating-card__rating-displayer" 
            category="Style" 
            username={ratingData.rating_creator?.user_username ?? ""} 
            userRating={ratingData.rating_values.style} 
            myRating={myRatingData.rating_values.style}
          />

          <ArtworkRatingDisplayer 
            className="artwork-user-rating-card__rating-displayer" 
            category="Time travel" 
            username={ratingData.rating_creator?.user_username ?? ""} 
            userRating={ratingData.rating_values.time_travel} 
            myRating={myRatingData.rating_values.time_travel}
          />
        </div>
      </div>
    </>
  );
}
