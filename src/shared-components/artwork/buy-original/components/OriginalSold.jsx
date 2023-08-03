import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '@/config';
import useCache from '@/hooks/useCache';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/OriginalSold.css';

function SoldDetails({ artworkData, close }) {
  const { loading, fetchData } = useCache(`${artworkData._id}_original_sold_details`, `${config.apis.api.url}/artwork/${artworkData._id}/sold-details`, {
    injectToken: true,
    expiresIn: ["0", "minutes"],
  });
  const navigate = useNavigate();

  return (
    <>
      <div className="original-sold-details__header">
        <Text className="original-sold-details__header-text dots-on-overflow" small>
          {artworkData.artwork_about.artwork_title}
        </Text>

        <XIcon className="original-sold-details__close" onClick={close}/>
      </div>

      {
        loading ? 
          <CustomSpinner className="original-sold-details__spinner" thin/>
          :
          <div className="original-sold-details__details">
            <div className="original-sold-details__column">
              <Text className="original-sold-details__column-header" small>
                Price
              </Text>

              <Text className="original-sold-details__column-normal-text dots-on-overflow" paragraph small>
                {Utils.getArtworkPrice(artworkData.artwork_about.artwork_price, artworkData.artwork_about.artwork_currency)}
              </Text>
            </div>

            <div className="original-sold-details__column">
              <Text className="original-sold-details__column-header" small>
                From
              </Text>

              <Text className="original-sold-details__user dots-on-overflow" onClick={()=>navigate(`/user/${artworkData.artwork_about.artwork_gallery.user_username}`, { state: { from: true } })} paragraph small>
                {artworkData.artwork_about.artwork_gallery.user_username}
              </Text>
            </div>

            <div className="original-sold-details__column">
              <Text className="original-sold-details__column-header" small>
                To
              </Text>

              {
                fetchData.to ? 
                  <Text className="original-sold-details__user dots-on-overflow" onClick={()=>navigate(`/user/${fetchData.to.user_username}`, { state: { from: true } })} paragraph small>
                    {fetchData.to.user_username}
                  </Text> 
                  : 
                  <Text className="original-sold-details__private dots-on-overflow" paragraph small>
                    Private
                  </Text>
              }
            </div>

            <div className="original-sold-details__column">
              <Text className="original-sold-details__column-header" small>
                Date
              </Text>

              <Text className="original-sold-details__column-normal-text dots-on-overflow" paragraph small>
                {Utils.getDateInStringFromTimestamp(new Date(fetchData.date).getTime())}
              </Text>
            </div>
          </div>
      }
    </>
  );
}

export default function OriginalSold({ artworkData }) {
  const [openSoldDetails, setOpenSoldDetails] = useState(false);

  return (
    <>
      <div className="original-sold-button__container element-non-selectable" onClick={(e)=>{e.stopPropagation(); setOpenSoldDetails(true);}}>
        <Text className="original-sold-button__text" small>
          Original sold
        </Text>
      </div>

      <GenericPopup 
        className="original-sold-popup remove-scrollbar" 
        open={openSoldDetails} 
        opacity 
        onTouchStart={e=>e.stopPropagation()} 
        onTouchEnd={e=>e.stopPropagation()} 
        onWheel={e=>e.stopPropagation()}
      >
        <SoldDetails artworkData={artworkData} close={()=>setOpenSoldDetails(false)}/>
      </GenericPopup>
    </>
  );
}
