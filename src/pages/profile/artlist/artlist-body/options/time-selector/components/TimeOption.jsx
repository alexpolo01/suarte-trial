import Text from '@/shared-components/text/components/Text';

import './styles/TimeOption.css';

export default function TimeOption({ text, isSelected, selectOption }) {
  return (
    <>
      <div className={`time-option__container element-non-selectable ${isSelected ? "selected" : ""}`} onClick={!isSelected ? selectOption : null}>
        <div className={`time-option__indicator`}/>

        <Text className="time-option__text" medium>
          {text}
        </Text>
      </div>
    </>
  );
}
