import ForwardArrowIcon from '@/shared-components/icons/components/public/ForwardArrowIcon';

import './styles/SliderControls.css';

export function PrevButton({ className="", onClick }) {
  return (
    <>
      <div tabIndex={0} className={`slider-controls__button ${className}`} onClick={onClick}>
        <ForwardArrowIcon className="slider-controls__button-icon prev"/>
      </div>
    </>
  );
}

export function NextButton({ className="", onClick }) {
  return (
    <>
      <div tabIndex={0} className={`slider-controls__button ${className}`} onClick={onClick}>
        <ForwardArrowIcon className="slider-controls__button-icon next"/>
      </div>
    </>
  );
}
