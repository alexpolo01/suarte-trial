import Text from '@/shared-components/text/components/Text';

import './styles/ChooseInput.css';

/**
 * This component only allows to be used in a controlled state
 */
export default function ChooseInput({ optionA, optionB, readOnly, value, onChange }) {
  return (
    <>
      <div className={`choose-input__container element-non-selectable${readOnly ? " read-only" : ""}`}>
        <div className={`choose-input__option${value === optionA ? " active" : ""}`} onClick={()=>{onChange(optionA);}}>
          <Text className="choose-input__text" medium>{optionA}</Text>
        </div>

        <div className={`choose-input__option${value === optionB ? " active" : ""}`} onClick={()=>{onChange(optionB);}}>
          <Text className="choose-input__text" medium>{optionB}</Text>
        </div>
      </div>
    </>
  );
}
