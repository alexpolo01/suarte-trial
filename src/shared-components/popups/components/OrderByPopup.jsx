import { useState } from 'react';

import QuestionsIcon from '@/shared-components/icons/components/public/QuestionsIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/OrderByPopup.css';

export default function OrderByPopup({ onChangeOption, options, defaultOption }) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  return (
    <>
      <div tabIndex={0} className={`order-by-popup__container element-non-selectable${open ? " active" : ""}`} onClick={()=>setOpen(!open)} onBlur={()=>setOpen(false)}>
        <Text className="order-by-popup__selected-option" small paragraph>{selectedOption}<QuestionsIcon/></Text>
        <div className="order-by-popup__options">
          {options.map((item, index) => (item !== selectedOption && <Text key={index} className="order-by-popup__option" small paragraph onClick={()=>{setSelectedOption(item); if(onChangeOption) onChangeOption(item);}}>{item}</Text>))}
        </div>
      </div>
    </>
  );
}
