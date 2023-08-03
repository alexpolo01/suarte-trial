import BarsLoader from '@/shared-components/loaders/components/BarsLoader';

import './styles/ContinueButton.scss';

export default function ContinueButton({ children, className="", turnOff=false, loading=false, round=false, success, successText, onClick=null, link=false }) {
  if(success === true) {
    return (
      <button className={`continue-button__button element-non-selectable success ${round ? "rounded-corners" : ""} ${className}`} disabled>
        {successText}
      </button>
    );
  }

  return (
    <>
      {
        link ? /** If this button is used as a link, we need to change button tag to div tag because no button tags are allowed inside A tags. It would've been better to use this as generic styles instead of a component, but too late for that now xd */
          <div 
            className={
              `continue-button__button 
                            element-non-selectable
                            ${loading ? "disabled" : ""}
                            ${round ? "rounded-corners" : ""}
                            ${turnOff ? "turn-off" : ""}
                            ${className}`
            } 
            disabled={loading || turnOff} 
            onClick={onClick}
          >
            {loading && <BarsLoader className="continue-button__loader"/>}

            <span>
              {children}
            </span>
          </div>
          :
          <button 
            className={
              `continue-button__button
                            element-non-selectable 
                            ${loading ? "disabled" : ""}
                            ${round ? "rounded-corners" : ""}
                            ${turnOff ? "turn-off" : ""}
                            ${className}`
            } 
            disabled={loading || turnOff} 
            onClick={onClick}
          >
            {loading && <BarsLoader className="continue-button__loader"/>}

            <span>
              {children}
            </span>
          </button>
      }
    </>
  );
}
