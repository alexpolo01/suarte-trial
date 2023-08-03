import { useRef,useState } from 'react';

import OpenStepAccordeonIcon from '@/shared-components/icons/components/forms/OpenStepAccordeonIcon';

import './styles/MultipleSelector.css';

export default function MultipleSelector({ element, selectOptions, readOnly, placeholder, fillWith }) {
  const [selectedOptions, setOptions] = useState(fillWith ? fillWith : selectOptions.defaultOption ? [selectOptions.defaultOption] : []);
  const selectContainer = useRef(null);
    
  function toggleOptions() {
    selectContainer.current.classList.toggle("active");
  }

  function closeOptions() {
    selectContainer.current.classList.remove("active");
  }

  function isSelected(option) {
    return selectedOptions.includes(option);
  }

  function removeOption(option) {
    setOptions(selectedOptions.filter(item => item !== option));
  }

  return (
    <>
      <div className={`multiple-select__container ${readOnly ? "read-only" : ""}`} id={`${element}_error`} ref={selectContainer}>
        <div tabIndex={0} onClick={toggleOptions} onBlur={closeOptions}>
          <label htmlFor={element} className="multiple-select__label"> {placeholder} </label>
          <div className="multiple-select__selected-options-container">
            <input type="text" className="multiple-select__selected-options" value={selectedOptions.join(", ")} id={element} name={element} readOnly={true} />
            <div className="multiple-select__open-options-container">
              {!readOnly && <OpenStepAccordeonIcon className="multiple-select__open-options" />}
            </div>
          </div>
        </div>
                
        <div className="multiple-select__options-container">
          {selectOptions.options.map((option, index) => {
            if(isSelected(option)) {
              return <p className="multiple-select__option selected" onMouseDown={()=>removeOption(option)} key={index}>{option}</p>;
            }
            return <p className="multiple-select__option" onMouseDown={()=>setOptions([...selectedOptions, option])} key={index}>{option}</p>;
          })}
        </div>
      </div>
    </>
  );
}
