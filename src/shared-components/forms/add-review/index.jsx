import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';
import UserService from '@/services/user.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import PopupToBottomSheet from '@/shared-components/popups/components/PopupToBottomSheet';
import Text from '@/shared-components/text/components/Text';

import EvaluateBuyingExperience from './components/EvaluateBuyingExperience';
import Info from './components/Info';
import WriteReview from './components/WriteReview';

import './index.css';

function AddReviewContent({ artwork, typeOfArtwork, close, headerText, onClose, onReview }) {
  const { stateHandler, cacheHandler } = useStateHandler();
  const [formState, setFormState] = useState({
    valoration: "",
    comment: "",
    is_anonymous: false
  });
  const [loading, setLoading] = useState(false);

  async function submitReview() {
    setLoading(true);

    const { response, data } = await UserService.submitReview(typeOfArtwork === "original" ? artwork.artwork_about.artwork_gallery._id : undefined, formState);

    if(response.ok) {
      if(typeOfArtwork === "original") {
        cacheHandler.triggerAction(`NEW_REVIEW_ON_${artwork.artwork_about.artwork_gallery._id}`);
      } else {
        cacheHandler.triggerAction(`NEW_REVIEW_ON_SUARTE`);
      }
      stateHandler.set("temporalPopup", { text: "New review submitted successfully!", type: "no-navigation" });
      onReview(data);
      close();
    }
  }

  return (
    <>
      <div className="add-review__container remove-scrollbar">
        <div className="add-review__header">
          <Text className="add-review__header-text" medium>
            {headerText}
          </Text>

          <XIcon className="add-review__close" onClick={onClose ? onClose : close}/>
        </div>

        <Info artwork={artwork} typeOfArtwork={typeOfArtwork}/>

        <EvaluateBuyingExperience formState={formState} setFormState={setFormState}/>

        {Boolean(formState.valoration) && (
          <WriteReview 
            typeOfArtwork={typeOfArtwork}
            formState={formState} 
            setFormState={setFormState}
          />
        )}

        <ContinueButton
          loading={loading}
          turnOff={formState.valoration === ""}
          className="add-review__submit-button mt-m"
          onClick={submitReview}
        >
                    Submit
        </ContinueButton>
      </div>
    </>
  );
}

export default function AddReview({ artworkToReview, typeOfArtwork, open, close, headerText, onClose, onReview }) {
  return (
    <>
      <PopupToBottomSheet
        open={open}
        close={onClose ? onClose : close}
        popupOptions={{ opacity: true }}
        className="add-review-popup"
      >
        <AddReviewContent 
          artwork={artworkToReview}
          typeOfArtwork={typeOfArtwork}
          close={close}
          headerText={headerText}
          onClose={onClose}
          onReview={onReview}
        />
      </PopupToBottomSheet>
    </>
  );
}
