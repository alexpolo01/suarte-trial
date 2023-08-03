import { useRef } from 'react';

import './styles/RippleButton.scss';

const RippleButton = ({ children, className="", active=true, onClick }) => {
  const rippleButton = useRef();

  function createRipple(event) {
    const position = rippleButton.current.getBoundingClientRect();
    const circle = document.createElement("span");

    circle.style.width = circle.style.height = `10px`;
    circle.style.left = `${event.clientX - position.x}px`;
    circle.style.top = `${event.clientY - position.y}px`;
    circle.classList.add("ripple-effect__class");

    const ripple = rippleButton.current.getElementsByClassName("ripple-effect__class")[0];

    if(ripple) {
      ripple.remove();
    }

    rippleButton.current.appendChild(circle); 

    if(onClick) onClick(); // EXECUTE THE ONCLICK FUNCTION THAT THE USER SENT US!
  }

  return (
    <>
      <div className={`ripple-button__effect ${className} ${!active && "disabled"}`} onClick={active ? createRipple : null} ref={rippleButton} disabled={!active}>
        {children}
      </div> 
    </>
  );
};

export default RippleButton;