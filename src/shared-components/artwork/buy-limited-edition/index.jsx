import { useMemo, useState } from 'react';

import useProtectAction from '@/hooks/useProtectAction';
import useStateHandler from '@/hooks/useStateHandler';
import LimitedEditionIcon from '@/shared-components/icons/components/artwork/LimitedEditionIcon';
import GalleryBuyDenied from '@/shared-components/popups/components/GalleryBuyDenied';
import Text from '@/shared-components/text/components/Text';

import BuyDetails from '../buy-details';

import LimitedEditionsSold from './components/LimitedEditionsSold';

import './index.css';

export default function BuyLimitedEditionButton({ artworkData }) {
  const { state } = useStateHandler();
  const [openBuyDetails, setOpenBuyDetails] = useState(false);
  const [openGalleryDeniedPopup, setOpenGalleryDeniedPopup] = useState(false);
  const privateActionHandler = useProtectAction({ typeOfProtection: "USER_ACCOUNT_REQUIRED" });
  const areLimitedEditionsSold = useMemo(() => {
    if(artworkData.artwork_limited_editions) {
      for(const key in artworkData.artwork_limited_editions) {
        const limitedEditionSize = artworkData.artwork_limited_editions[key];
                
        if(Boolean(limitedEditionSize) && limitedEditionSize.sold < limitedEditionSize.quantity) {
          return false;
        }
      }
    
      return true;
    } else {
      return true;
    }
  }, []);

  function handleGetLimitedEdition() {
    if(state.user_session.user_type === "gallery") {
      setOpenGalleryDeniedPopup(true);
    } else {
      setOpenBuyDetails(true);
    }
  }

  if(!artworkData.artwork_limited_editions) {
    return (
      <>
        <div className="buy-limited-edition-button__container element-non-selectable not-available" onClick={(e)=>e.stopPropagation()}>
          <Text className="buy-limited-edition-button__text" small>
                        Limited Editions not available
          </Text>
        </div>
      </>
    );
  } else if(areLimitedEditionsSold) {
    return (
      <LimitedEditionsSold artworkData={artworkData}/>
    );
  } else {
    return (
      <>
        <div 
          className="buy-limited-edition-button__container element-non-selectable" 
          onClick={(e) => {
            e.stopPropagation();
            privateActionHandler(handleGetLimitedEdition);
          }}
        >
          <Text className="buy-limited-edition-button__text" small>
                        Get a Limited Edition
          </Text>
                    
          <LimitedEditionIcon className="buy-limited-edition-button__icon"/>
        </div>

        <GalleryBuyDenied 
          open={openGalleryDeniedPopup} 
          close={()=>setOpenGalleryDeniedPopup(false)}
        />

        <BuyDetails
          open={openBuyDetails}
          close={()=>setOpenBuyDetails(false)}
          artworkData={artworkData}
          typeOfPurchase="limited_edition"
        />
      </>
    );
  }
}
