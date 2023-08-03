import { useState } from 'react';
// import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';
import { Link } from 'react-router-dom';

import GalleryService from '@/services/gallery.service';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import SwitchInput from '@/shared-components/inputs/components/SwitchInput';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Utils from '@/utils';

import './styles/ArtworkContract.css';

export default function ArtworkContract({ artworkData, open, close, onContractRenewalChange, onWithdrawArtwork }) {
  // const [formState, setFormState] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [openWithdrawArtwork, setOpenWithdrawArtwork] = useState(false);

  function changeRenewal(isAutomatic) {
    onContractRenewalChange(artworkData._id, isAutomatic);
    GalleryService.changeRenewalOfContract(artworkData._id, isAutomatic);
  }

  async function withdrawArtwork() {
    setFormLoading(true);

    const { response } = await GalleryService.withdrawArtwork(artworkData._id);

    if(response.ok) {
      onWithdrawArtwork(artworkData._id);
    }
  }

  return (
    <>
      <GenericPopup 
        open={open}
        className="artwork-contract-popup"
        opacity
      >
        <div className="generic-popup-header">
          <span className="generic-popup-header-text mt-m">
                        Artwork contract
          </span>

          <XIcon className="generic-popup-close" onClick={close}/>
        </div>

        <ArtworkImage
          image={artworkData.artwork_media.artwork_main_picture.image_id}
          imageClassName="artwork-contract-popup__image"
          imageTemplateClassName="artwork-contract-popup__image"
        />

        <p className="artwork-contract-popup__text --less-margin mt-m">
                    Upload date:{" "}

          <span>
            {Utils.getDateInStringFromTimestamp(artworkData.createdAt)}
          </span>
        </p>

        <p className="artwork-contract-popup__text mt-m">
                    Expiration date:{" "}

          <span>
            {Utils.getDateInStringFromTimestamp(Utils.getTimestampOneYearLater(artworkData.createdAt))}
          </span>
        </p>

        <p className="artwork-contract-popup__text mt-s">
          {
            artworkData.automatic_renewal ?
              "The automatic renewal is currently activated. This means that when the expiration date arrives, the agreement will automatically renew for the next 12 months. You can update these preferences at any time."
              :
              "The automatic renewal is currently deactivated. This means that when the expiration date arrives, the agreement will automatically be canceled. You can update these preferences at any time."
          }
        </p>

        <p className="artwork-contract-popup__text mt-s">
                    Please visit the{" "} 

          <Link to="/artwork-agreement" target="_blank" rel="noreferrer">
                        Artwork Agreement
          </Link>
                     
          {" "}for more information.
        </p>

        <div className="artwork-contract-popup__renewal-container">
          <span className="artwork-contract-popup__renewal-text mt-l">
                        Automatic renewal
          </span>

          <SwitchInput
            value={artworkData.artwork_flags.automatic_renewal !== false}
            onChange={isAutomatic=>changeRenewal(isAutomatic)}
          />
        </div>

        <span className="artwork-contract-popup__withdraw-button element-non-selectable mt-s" onClick={()=>setOpenWithdrawArtwork(true)}>
                    Withdraw artwork
        </span>
      </GenericPopup>

      <GenericPopup
        open={openWithdrawArtwork}
        className="artwork-contract-popup"
        opacity
      >
        <div className="generic-popup-header">
          <span className="generic-popup-header-text mt-m">
                        Withdraw artwork
          </span>

          <XIcon className="generic-popup-close" onClick={()=>setOpenWithdrawArtwork(false)}/>
        </div>

        <p className="artwork-contract-popup__text mt-s">
                    If this artwork has been sold, click on "Buy Now" from your 
                    profile and enter the collector's email address to enable 
                    them to claim it in their profile. If you choose to remove this artwork, 
                    keep in mind that there is no withdrawal penalty for artworks uploaded before 2024. 
        </p>

        {/* <PublicFormInput 
                    element="withdraw-artwork-checkbox" 
                    type="checkbox"
                    readOnly={formLoading}
                    value={formState} 
                    onChange={(value)=>setFormState(value)}
                >
                    I understand and accept the fee to be included in my next invoice.   
                </PublicFormInput> */}
                
        <ContinueButton
          loading={formLoading}
          // turnOff={!Boolean(formState)}
          className="artwork-contract-popup__submit-withdraw-button mt-m"
          onClick={withdrawArtwork}
        >
                    Withdraw artwork
        </ContinueButton>
      </GenericPopup>
    </>
  );
}
