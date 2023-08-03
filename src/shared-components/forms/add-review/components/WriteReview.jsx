import SwitchInput from '@/shared-components/inputs/components/SwitchInput';
import Text from '@/shared-components/text/components/Text';

import './styles/WriteReview.css';

export default function WriteReview({ typeOfArtwork, formState, setFormState }) {
  return (
    <>
      <div className="write-review__container">
        <Text 
          style={{ fontWeight: "600", marginBottom: "5px" }}
          className="add-review__write-review-text" 
          paragraph 
          justify 
          large
        >
          {
            formState.valoration === "positive" ?
              "Glad to hear it arrived safely and you're happy with it!"
              : formState.valoration === "neutral" ?
                "We are sorry your experience was not perfect"
                :
                "We apologize if it didn't meet your expectations"
          }
        </Text>

        <Text 
          className="add-review__write-review-text" 
          paragraph 
          justify 
          small
        >
          {
            typeOfArtwork === "original" ?
              "Your feedback contributes to the gallery's growth and improvement."
              :
              "Your feedback contributes to Suarte's growth and improvement."
          }
        </Text>

        <textarea 
          placeholder="Write a review"
          className="write-review__textarea mt-m"
          value={formState.comment}
          onChange={e=>setFormState({ ...formState, comment: e.target.value })}
          spellCheck={false}
        />

        <div className="write-review__anonymous">
          <SwitchInput
            value={formState.is_anonymous}
            onChange={value=>setFormState({ ...formState, is_anonymous: value })}
            className="write-review__anonymous-switch"
          />
          <Text className="add-review__anonymous-text" small>
                        Make it anonymous
          </Text>
        </div>
      </div>
    </>
  );
}
