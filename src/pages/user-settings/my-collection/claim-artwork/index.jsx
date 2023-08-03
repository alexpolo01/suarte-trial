import { useState } from 'react';

import AddReview from '@/shared-components/forms/add-review';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import GenericPopup from '@/shared-components/popups/components/GenericPopup';
import Text from '@/shared-components/text/components/Text';

import ClaimArtworkForm from './components/ClaimArtworkForm';
import CloseReviewConfirmation from './components/CloseReviewConfirmation';

import './index.css';

export default function ClaimArtwork({ onClaimArtwork }) {
  const [openClaimArtwork, setOpenClaimArtwork] = useState(false);
  const [artworkToClaim, setArtworkToClaim] = useState(null);
  const [openCloseReviewConfirmation, setOpenCloseReviewConfirmation] = useState(false);

  return (
    <>
      <Text 
        className="claim-artwork__button element-non-selectable" 
        onClick={()=>setOpenClaimArtwork(true)}
        medium 
      >
                Claim artwork
      </Text>

      <GenericPopup open={openClaimArtwork} className="claim-artwork-popup" opacity>
        <div className="claim-artwork-popup__header">
          <Text className="claim-artwork-popup__header-text" medium>
                        Claim artwork
          </Text>

          <XIcon className="claim-artwork-popup__close" onClick={()=>setOpenClaimArtwork(false)}/>
        </div>

        <ClaimArtworkForm 
          onArtworkFound={artwork => {
            setArtworkToClaim(artwork); 
            setOpenClaimArtwork(false);
          }}
        />
      </GenericPopup>

      <AddReview
        headerText="Claim artwork"
        artworkToReview={artworkToClaim}
        open={Boolean(artworkToClaim)}
        typeOfArtwork={artworkToClaim?.product_metadata.is_limited_edition ? "limited_edition" : "original"}
        close={()=>setArtworkToClaim(null)}
        onClose={()=>setOpenCloseReviewConfirmation(true)}
        onReview={()=>onClaimArtwork(artworkToClaim)}
      />

      <CloseReviewConfirmation
        open={openCloseReviewConfirmation}
        close={()=>setOpenCloseReviewConfirmation(false)}
        onConfirm={()=>setArtworkToClaim(null)}
      />
    </>
  );
}