import { useEffect, useMemo, useRef, useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import Text from '@/shared-components/text/components/Text';

import './styles/RatingBarDisplayer.css';

export default function RatingBarDisplayer({ username, userRating, myRating, ignoreRightOverflow=false, includeGuide=false }) {
  const { state } = useStateHandler();
  const [textStyle, setTextStyle] = useState(null);
  const userRatingPercentage = useMemo(()=>Math.floor((userRating/100)*100), [userRating]);
  const myRatingPercentage = useMemo(()=>Math.floor((myRating/100)*100), [myRating]);
  const artworkRatingDisplayerContainer = useRef();

  useEffect(() => {
    if(ignoreRightOverflow) return;

    setTimeout(() => {
      const leftWidth = artworkRatingDisplayerContainer.current.clientWidth * (1-(userRatingPercentage/100)) * 2;
      setTextStyle({ maxWidth: `${leftWidth + 40}px` });
    }, 50);
  }, []);

  return (
    <>
      <div className="artwork-rating-displayer__range-container" ref={artworkRatingDisplayerContainer}>
        <div style={{ width: `${myRatingPercentage}%` }} className="artwork-rating-displayer__bar my-rating"/>
        <div style={{ width: `${userRatingPercentage}%` }} className="artwork-rating-displayer__bar user-rating"/>

        <div style={{ left: `${myRatingPercentage}%` }}  className="artwork-rating-displayer__indicator my-rating">
          <div className="artwork-rating-displayer__indicator-bar my-rating"/>

          <Text className="artwork-rating-displayer__indicator-text my-rating" paragraph extraSmallPlus>
                        you
          </Text>
        </div>
            
        {state.user_session?.user_username !== username && (
          <div className="artwork-rating-displayer__indicator" style={{ left: `${userRatingPercentage}%` }}>
            <Text className="artwork-rating-displayer__indicator-text dots-on-overflow" style={textStyle} paragraph extraSmallPlus>
              {username}
            </Text>
                        
            <div className="artwork-rating-displayer__indicator-bar"/>
          </div>
        )}

        {includeGuide && <div className="artwork-rating-displayer__guide-container">
          <div style={{ left: "12.5%" }} className="artwork-rating-displayer__guide-indicator"/>
          <div style={{ left: "25%" }} className="artwork-rating-displayer__guide-indicator"/>
          <div style={{ left: "37.5%" }} className="artwork-rating-displayer__guide-indicator"/>
          <div style={{ left: "50%" }} className="artwork-rating-displayer__guide-indicator main"/>
          <div style={{ left: "62.5%" }} className="artwork-rating-displayer__guide-indicator"/>
          <div style={{ left: "75%" }} className="artwork-rating-displayer__guide-indicator"/>
          <div style={{ left: "87.5%" }} className="artwork-rating-displayer__guide-indicator"/>
        </div>}
      </div>
    </>
  );
}
