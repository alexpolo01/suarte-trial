import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/Popup.scss';

export default function Popup({ children, className, title="", open, close, customRef, blur=false, darkerBlur=false, opacity=false }) {

  return (
    <>   
      <GenericPopup 
        open={open} 
        blur={blur} 
        darkerBlur={darkerBlur} 
        opacity={opacity} 
        customRef={customRef} 
        className={`normal-popup__popup remove-scrollbar ${className}`}
      >
        <div className="normal-popup__header-section">
          <XIcon className="normal-popup__close-button" onClick={close}/>
                    
          <Text className="normal-popup__title" medium paragraph>
            {title}
          </Text>
        </div>

        {children}
      </GenericPopup>
    </>
  );
}
