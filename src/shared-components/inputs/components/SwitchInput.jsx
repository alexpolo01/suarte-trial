import './styles/SwitchInput.css';

/**
 * Little @note -> This component is prepared to apply the animation with the default size values. If you decide you want to change the default sizes of the elements, then you need to reapply the new active styles
 * to the element in the new active class. You should only modify the translate value when active. The formula is the following: 
 * 
 * TranstionX(value) where value is => inputWidth - switchWidth - 2*inputPadding. 
 */
export default function SwitchInput({ value, onChange, className="" }) {
  return (
    <>
      <div className={`switch-input__container ${value ? "activated" : ""} ${className}`} onClick={()=>onChange(!value)}>
        <div className="switch-input__switch"/>
      </div>
    </>
  );
}
