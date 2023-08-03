import Text from '@/shared-components/text/components/Text';

import './styles/SectionSelector.css';

export default function SectionSelector({ currentBuySection, setCurrentBuySection, typeOfPurchase, isShippingLocked }) {
  return (
    <>
      <div className="purchase-section-selector__container element-non-selectable">
        <div className="purchase-section-selector__options">
          {typeOfPurchase === "limited_edition" && (
            <div className="purchase-section-selector__option" onClick={()=>setCurrentBuySection("size")}>
              <Text className="purchase-section-selector__text" medium>
                                Size
              </Text>
            </div>
          )}

          <div className={`purchase-section-selector__option ${isShippingLocked ? "disabled" : ""}`} onClick={()=>setCurrentBuySection("shipping")}>
            <Text className="purchase-section-selector__text" medium>
                            Shipping details
            </Text>
          </div>

          <div 
            className="purchase-section-selector__active-bar" 
            style={{
              width: typeOfPurchase === "limited_edition" ? "50%" : "100%",
              transform: typeOfPurchase === "limited_edition" ? 
                currentBuySection === "shipping" ? 
                  "translateX(100%)" 
                  : 
                  "" 
                : 
                ""
            }}
          />
        </div>
      </div>
    </>
  );
}
