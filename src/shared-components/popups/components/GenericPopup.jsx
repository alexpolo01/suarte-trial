import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import './styles/GenericPopup.css';

export default function GenericPopup({ open=false, children, customRef, animation=true, blur=false, darkerBlur=false, opacity=false, className="", backgroundClassName="", ...events }) {
  const didIRemoveTheScroll = useRef(false);

  useEffect(()=>{
    if(open === true) {
      if(!document.body.classList.contains("no-scroll")) {
        document.body.classList.add("no-scroll");
        didIRemoveTheScroll.current = true;
      }
    } else { 
      if(didIRemoveTheScroll.current) {
        document.body.classList.remove("no-scroll");
        didIRemoveTheScroll.current = false;
      }
    }
  }, [open]);

  useEffect(()=>{
    return () => {
      if(didIRemoveTheScroll.current) {
        document.body.classList.remove("no-scroll"); /** Prevents closed popups from removing this class when unmount */
      } 
    };
  }, []);

  if(!open) {
    return (
      <></>
    );
  }

  return createPortal(
    <>
      <div 
        className={
          `generic-popup__background
                    ${blur ? "blur" : ""}
                    ${darkerBlur ? "darker-blur" : ""}
                    ${opacity ? "opacity" : ""}
                    ${animation ? "enter-animation" : ""} 
                    ${backgroundClassName}`
        } 
        onClick={(e)=>e.stopPropagation()} 
        {...events} /** Although we are using portals, React mantains the same original tree for events. That's why we want to stopPropagating the clickEvent. So that it behaves as if the portal was truly real. In case we need to mantain the original event call stack, we should double check this */
      > 
        <div className={`generic-popup__card ${className}`} ref={customRef}>
          {children}
        </div>
      </div>
    </>, document.getElementById("portal-generic-popup")
  );
}