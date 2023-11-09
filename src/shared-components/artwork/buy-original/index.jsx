import { useState } from 'react';

import useProtectAction from '@/hooks/useProtectAction';
import useStateHandler from '@/hooks/useStateHandler';
import PriceTag from '@/shared-components/artwork/components/PriceTag';
import GalleryBuyDenied from '@/shared-components/popups/components/GalleryBuyDenied';
import Text from '@/shared-components/text/components/Text';

import BuyDetails from '../buy-details';

import GalleryClosedPopup from './components/GalleryClosedPopup';
import MarkAsSoldPopup from './components/MarkAsSoldPopup';
import OriginalSold from './components/OriginalSold';

import './index.css';

export default function BuyOriginalButton({ artworkData }) {
  const { state } = useStateHandler();
  const [openGalleryClosed, setOpenGalleryClosed] = useState(false);
  const [openMarkAsSold, setOpenMarkAsSold] = useState(false);
  const [openBuyDetails, setOpenBuyDetails] = useState(false);
  const [openGalleryDeniedPopup, setOpenGalleryDeniedPopup] = useState(false);
  const privateActionHandler = useProtectAction({ typeOfProtection: "USER_ACCOUNT_REQUIRED" });

  function handleBuyNow() {
    if(state.user_session._id === artworkData.artwork_about.artwork_gallery._id) {
      setOpenMarkAsSold(true);
    } else if(state.user_session.user_type === "gallery") {
      setOpenGalleryDeniedPopup(true);
    } else if(artworkData.artwork_about.artwork_gallery.gallery_closed) {
      setOpenGalleryClosed(true);
    } else {
      setOpenBuyDetails(true);
    }
  }

  if(artworkData.artwork_status === "original_sold" || artworkData.artwork_status === "sold") {
    return (
      <OriginalSold artworkData={artworkData}/>
    );
  } else if(artworkData.artwork_status === "unavailable") {
    return (
      <div className="buy-original-button__container disabled element-non-selectable">
        <Text className="buy-original-button__text" small>
                    Original not available
        </Text>
      </div>
    );
  } else {
    return (
      <>
        <div 
          className="buy-original-button__container element-non-selectable" 
          onClick={(e) => {
            e.stopPropagation();
            privateActionHandler(handleBuyNow);
          }}
        >
          <Text className="buy-original-button__text" extraSmall>
                        Purchase Now
          </Text>
    
          <PriceTag 
            className="buy-original-button__price-tag" 
            currency={artworkData.artwork_about.artwork_currency} 
            price={artworkData.artwork_about.artwork_price} 
          />
        </div>

        <MarkAsSoldPopup
          open={openMarkAsSold}
          close={()=>setOpenMarkAsSold(false)}
          artworkData={artworkData}
        />

        <GalleryClosedPopup
          open={openGalleryClosed}
          close={()=>setOpenGalleryClosed(false)}
          artworkData={artworkData}
        />

        <GalleryBuyDenied 
          open={openGalleryDeniedPopup} 
          close={()=>setOpenGalleryDeniedPopup(false)}
        />

        <BuyDetails
          open={openBuyDetails}
          close={()=>setOpenBuyDetails(false)}
          artworkData={artworkData}
          typeOfPurchase="original"
        />
      </>
    );
  }
}
