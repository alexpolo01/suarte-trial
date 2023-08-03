import { useEffect, useRef } from 'react';
import { AiFillWarning } from 'react-icons/ai';

import config from '@/config';

import './styles/FormError.scss';

// TODO: IMPROVEMENT: RENAME EVERYTHING AND THIS SHOULD ALSO BE READY FOR PROGRAMATICALLY PAINT ERRORS IN SCREEN WITHOUT NEEDING TO HAVE A CERTAIN DOM ELEMENT (JUST A KEY THAT IDENTIFIES THE ERROR AND TO CHECK IF ERROR MATCHES THAT KEY)

export default function FormError({ error, element, focus=false, errorClassName="", alternativeElement=null }) {
  const errorContainer = useRef();
  const errorMessage = useRef();

  useEffect(()=>{
    const elementThatCausedError = alternativeElement ? document.getElementById(alternativeElement) : document.getElementById(element); // Sometimes the input is not always the one we want to apply class and scrollIntoView, that's why alternativeElement is here to configure it

    if(error?.element === element) { /** This means that this component has to be the one to handle the error */
      elementThatCausedError.scrollIntoView({
        behavior: "smooth"
      });
            
      if(errorClassName) elementThatCausedError.classList.add(errorClassName);

      if(error?.error_code) {
        errorContainer.current.classList.add("active");
        errorMessage.current.innerText = config.errorCodes[error.error_code];
      }

      if(focus === true) elementThatCausedError.focus();
    } else {
      if(errorClassName) elementThatCausedError.classList.remove(errorClassName);
      errorContainer.current.classList.remove("active");
    }
  }, [error]);

  return (
    <>
      <div className="form-error__message-container" ref={errorContainer}>
        <AiFillWarning className="form-error__message-icon"/>
        <p className="form-error__message-text" ref={errorMessage}></p>
      </div>
    </>
  );
}
