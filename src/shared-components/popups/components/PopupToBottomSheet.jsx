import useScreenSize from '@/hooks/useScreenSize';

import GenericBottomSheet from './GenericBottomSheet';
import GenericPopup from './GenericPopup';

import './styles/PopupToBottomSheet.css';

/**
 * @note -> If the content component ( @children ) needs some request data logic, it's recommended
 * to have a Content component that has that logic with the UI html values instead of having everything in the global component where
 * we use PopupToBottomSheet. This is because PopupToBottomSheet only mounts the @children component when @open is true. 
 * If we had the request data logic on the global component, it will fetch the data even if the popup/bottom sheet is closed, which in most cases
 * is not the wanted behavior. We need to have it in a separated component so that we only request the data when it's mounted. And use that component as the @children
 */
export default function PopupToBottomSheet({ className, children, open, close, popupOptions={}, bottomSheetOptions={}, ...rest }) {
  const screenSize = useScreenSize();

  if(screenSize.width <= 800) {
    return (
      <>
        <GenericBottomSheet className="popup-to-bottom-sheet-bottom-sheet" open={open} close={close} {...bottomSheetOptions} {...rest}>
          {children}
        </GenericBottomSheet>
      </>
    );
  }

  return (
    <>
      <GenericPopup open={open} className={`popup-to-bottom-sheet-popup ${className}`} {...popupOptions} {...rest}>
        {children}
      </GenericPopup>
    </>
  );
}
