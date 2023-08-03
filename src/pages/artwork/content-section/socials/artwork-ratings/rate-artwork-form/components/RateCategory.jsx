import CustomInputRange from '@/shared-components/inputs/components/CustomInputRange';
import Text from '@/shared-components/text/components/Text';

import './styles/RateCategory.css';

export default function RateCategory({ category, text, element }) {
  return (
    <>
      <div className="artwork-rate-category__container">
        <Text className="artwork-rate-category__category" large>
          {category}
        </Text>

        <Text className="artwork-rate-category__text" paragraph justify small>
          {text}
        </Text>

        <div className={`artwork-rating-input__container artwork-rate-category__input`}>
          <CustomInputRange 
            className="artwork-rating-input" 
            defaultValue={0} 
            element={element} 
            thumb
          />

          <div className="artwork-rating-input__guide-container">
            <div style={{ left: "12.5%" }} className="artwork-rating-input__guide-indicator"/>
            <div style={{ left: "25%" }} className="artwork-rating-input__guide-indicator"/>
            <div style={{ left: "37.5%" }} className="artwork-rating-input__guide-indicator"/>
            <div style={{ left: "50%" }} className="artwork-rating-input__guide-indicator main"/>
            <div style={{ left: "62.5%" }} className="artwork-rating-input__guide-indicator"/>
            <div style={{ left: "75%" }} className="artwork-rating-input__guide-indicator"/>
            <div style={{ left: "87.5%" }} className="artwork-rating-input__guide-indicator"/>
          </div>
        </div>
      </div>
    </>
  );
}
