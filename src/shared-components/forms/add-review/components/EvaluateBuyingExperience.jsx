import ThumbIcon from '@/shared-components/icons/components/artwork/ThumbIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/EvaluateBuyingExperience.css';

export default function EvaluateBuyingExperience({ formState, setFormState }) {
  function updateFormState(key, value) {
    setFormState({
      ...formState,
      [key]: value
    });
  }

  return (
    <>
      <div className="add-review__buying-experience">
        <div className={`add-review__thumb-container ${formState.valoration === "positive" ? "active" : ""}`}>
          <Text className="add-review__thumb-text" extraSmall>
                        Positive
          </Text>

          <ThumbIcon className="add-review__thumb positive" onClick={()=>updateFormState("valoration", "positive")}/>
        </div>

        <div className={`add-review__thumb-container ${formState.valoration === "neutral" ? "active" : ""}`}>
          <Text className="add-review__thumb-text" extraSmall>
                        Neutral
          </Text>

          <ThumbIcon className="add-review__thumb neutral" onClick={()=>updateFormState("valoration", "neutral")}/>
        </div>

        <div className={`add-review__thumb-container ${formState.valoration === "negative" ? "active" : ""}`}>
          <Text className="add-review__thumb-text" extraSmall>
                        Negative
          </Text>

          <ThumbIcon className="add-review__thumb negative" onClick={()=>updateFormState("valoration", "negative")}/>
        </div>
      </div>
    </>
  );
}
