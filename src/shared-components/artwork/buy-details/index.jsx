import { useState } from 'react';

import XIcon from '@/shared-components/icons/components/public/XIcon';
import PopupToBottomSheet from '@/shared-components/popups/components/PopupToBottomSheet';
import Text from '@/shared-components/text/components/Text';

import PurchaseInfo from './components/PurchaseInfo';
import SectionSelector from './components/SectionSelector';
import SelectSize from './select-size';
import ShippingDetails from './shipping-details';

import './index.css';

export default function BuyDetails({ open, close, artworkData, typeOfPurchase }) {
  const [currentBuySection, setCurrentBuySection] = useState(typeOfPurchase === "limited_edition" ? "size" : "shipping");
  const [isShippingLocked, setIsShippingLocked] = useState(typeOfPurchase === "limited_edition");
  const [formState, setFormState] = useState({
    limited_edition_size: null,
    shipping_details: null,
    personalized_message: ""
  });

  return (
    <>
      <PopupToBottomSheet
        open={open}
        close={close}
        className="buy-details__popup-bottom-sheet"
        popupOptions={{ opacity: true }}
        onTouchStart={e => e.stopPropagation()} 
        onTouchEnd={e => e.stopPropagation()} 
        onWheel={e => e.stopPropagation()}
      >
        <div className="buy-details__container">
          <div className="buy-details__header-outter">
            <div className="buy-details__header">
              <Text className="buy-details__header-text" medium>
                                Purchase Now
              </Text>

              <XIcon className="buy-details__close" onClick={close}/>
            </div>
          </div>

          <div className="buy-details__content">
            <div className="buy-details__info-container">
              <PurchaseInfo artworkData={artworkData} typeOfPurchase={typeOfPurchase}/>
            </div>
                        
            <div className="buy-details__sections">
              <SectionSelector 
                currentBuySection={currentBuySection}
                setCurrentBuySection={setCurrentBuySection}
                typeOfPurchase={typeOfPurchase}
                isShippingLocked={isShippingLocked}
              />

              {
                currentBuySection === "size" ?
                  <SelectSize 
                    artworkData={artworkData} 
                    formState={formState} 
                    setFormState={setFormState}
                    continueToShipping={() => {
                      setCurrentBuySection("shipping");
                      setIsShippingLocked(false);
                    }}
                  />
                  :
                  <ShippingDetails
                    artworkData={artworkData} 
                    formState={formState} 
                    setFormState={setFormState}
                    typeOfPurchase={typeOfPurchase}
                  />
              }
            </div>
          </div>
        </div>
      </PopupToBottomSheet>
    </>
  );
}
