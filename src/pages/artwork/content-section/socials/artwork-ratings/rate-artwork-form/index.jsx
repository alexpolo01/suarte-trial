import { useContext,useState } from 'react';

import ArtworkDataContext from '@/context/ArtworkDataContext';
import useProtectAction from '@/hooks/useProtectAction';
import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import Text from '@/shared-components/text/components/Text';

import RateCategory from './components/RateCategory';

import './index.css';

export default function RateArtworkForm({ onRateArtwork }) {
  const { cacheHandler } = useStateHandler();
  const { artworkData } = useContext(ArtworkDataContext);
  const [loading, setLoading] = useState(false);
  const privateActionHandler = useProtectAction({ typeOfProtection: "USER_ACCOUNT_REQUIRED" });
  async function submitArtworkRating(e) {
    e.preventDefault();
    setLoading(true);

    const myRating = {
      emotions: e.target.emotions.value,
      style: e.target.style.value,
      time_travel: e.target.time_travel.value
    };

    const { response, data } = await UserService.submitRating(artworkData._id, myRating);

    if(response.ok) {
      cacheHandler.triggerAction("NEW_RATING");
      onRateArtwork(data);
    }
  }

  return (
    <>
      <form onSubmit={(e)=>{e.preventDefault(); privateActionHandler(()=>submitArtworkRating(e));}} className={`artwork-view-rate-artwork-form__container ${loading ? "read-only" : ""}`}>
        <ArtworkImage 
          image={artworkData.artwork_media.artwork_main_picture.image_id} 
          imageTemplateClassName="artwork-view-rate-artwork-form__artwork-image" 
          imageClassName="artwork-view-rate-artwork-form__artwork-image"
        />

        <Text className="artwork-view-rate-artwork-form__see-results" paragraph small>
                    Rate this artwork to see the results
        </Text>

        <RateCategory 
          category="Emotions" 
          text="Does it evoke an emotional response on you?" 
          element="emotions"
        />

        <RateCategory 
          category="Style" 
          text="How would you rate the technique, use of color, composition, originality, and creative choices of the artist in this artwork?" 
          element="style"
        />

        <RateCategory 
          category="Time travel" 
          text="How likely is this artwork to stand the test of time?"
          element="time_travel"
        />

        <ContinueButton className="rate-artwork__submit-button" loading={loading}>
                    Submit
        </ContinueButton>
      </form>
    </>
  );
}