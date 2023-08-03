import Text from '@/shared-components/text/components/Text';

import RatingBarDisplayer from './RatingBarDisplayer';

import './styles/ArtworkRatingDisplayer.css';

export default function ArtworkRatingDisplayer({ className="", category, username, userRating, myRating }) {
  return (
    <>
      <div className={`artwork-rating-displayer__container ${className}`}>
        <Text className="artwork-rating-displayer__category" small paragraph>
          {category}
        </Text>

        <RatingBarDisplayer 
          username={username} 
          userRating={userRating} 
          myRating={myRating}
        />
      </div>
    </>
  );
}
