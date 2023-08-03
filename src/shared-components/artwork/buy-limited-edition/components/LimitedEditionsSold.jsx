import { useState } from 'react';

import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import './styles/LimitedEditionsSold.css';

export default function LimitedEditionsSold({ artworkData }) {
  const [openSoldDetails, setOpenSoldDetails] = useState(false);

  return (
    <>
      <div className="limited-editions-sold-button__container element-non-selectable" onClick={()=>setOpenSoldDetails(true)}>
        <Text className="limited-editions-sold-button__text" small>
                    Limited editions sold
        </Text>
      </div>

      <GenericPopup 
        className="limited-editions-sold-popup remove-scrollbar" 
        open={openSoldDetails} 
        opacity 
        onTouchStart={e=>e.stopPropagation()} 
        onTouchEnd={e=>e.stopPropagation()} 
        onWheel={e=>e.stopPropagation()}
      >
        <div className="limited-editions-sold-popup__header">
          <Text className="limited-editions-sold-popup__header-text dots-on-overflow" paragraph small>
            {artworkData.artwork_about.artwork_title}
          </Text>

          <XIcon className="limited-editions-sold-popup__close" onClick={()=>setOpenSoldDetails(false)}/>
        </div>

        <div className="limited-editions-sold-popup__sold-details">
          <div className="limited-editions-sold-popup__sold-details-main-column">
            <Text className="limited-editions-sold-popup__sold-details-main-column-text" small>
                            Size
            </Text>

            <Text className="limited-editions-sold-popup__sold-details-main-column-text" small>
                            Sold
            </Text>
          </div>

          {Object.keys(artworkData.artwork_limited_editions).map(limitedEditionSize => (
            Boolean(artworkData.artwork_limited_editions[limitedEditionSize]) && (
              <div key={limitedEditionSize} className="limited-editions-sold-popup__sold-details-column">
                <Text className="limited-editions-sold-popup__sold-details-column-header dots-on-overflow" paragraph extraSmall>
                  {artworkData.artwork_limited_editions[limitedEditionSize].width} cm x{" "}
                  {artworkData.artwork_limited_editions[limitedEditionSize].height} cm
                </Text>

                <Text className="limited-editions-sold-popup__sold-details-quantity-sold" paragraph extraSmall>
                  {artworkData.artwork_limited_editions[limitedEditionSize].sold}
                </Text>
              </div>
            )
          ))}
        </div>
      </GenericPopup>
    </>
  );
}
