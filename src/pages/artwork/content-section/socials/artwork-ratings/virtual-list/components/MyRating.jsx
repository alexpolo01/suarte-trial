import RatingBarDisplayer from '@/shared-components/inputs/components/RatingBarDisplayer';
import Text from '@/shared-components/text/components/Text';

import './styles/MyRating.css';

export default function MyRating({ category, text, myRating, averageRating }) {
  return (
    <>
      <div className="artwork-ratings-my-rating__container">
        <Text className="artwork-ratings-my-rating__category" small>
          {category}
        </Text>

        <Text className="artwork-ratings-my-rating__text" paragraph justify small>
          {text}
        </Text>

        <div className="artwork-ratings-my-rating__rating-bar-container">
          <RatingBarDisplayer 
            username="Average" 
            userRating={averageRating} 
            myRating={myRating} 
            ignoreRightOverflow 
            includeGuide
          />
        </div>
      </div>
    </>
  );
}
