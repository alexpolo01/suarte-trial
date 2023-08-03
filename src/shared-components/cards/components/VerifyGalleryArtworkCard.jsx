import { useNavigate } from 'react-router-dom';

import ForwardArrowIcon from '@/shared-components/icons/components/public/ForwardArrowIcon';
import Text from '@/shared-components/text/components/Text';

import ArtworkImage from './ArtworkImage';

import './styles/VerifyGalleryArtworkCard.css';

export default function VerifyGalleryArtworkCard({ artworkData }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="verify-gallery-artwork-card" onClick={()=>navigate("/verify-gallery/preview", { state: { draftData: artworkData, from: true } })}>
        <ArtworkImage 
          image={artworkData.draft_container.artwork_media.artwork_main_picture.image_id} 
          imageClassName="verify-gallery-artwork-card__image" 
          imageTemplateClassName="verify-gallery-artwork-card__image-template"
        />

        <div className="verify-gallery-artwork-card__info-container">
          <Text className="verify-gallery-artwork-card__info-text title" paragraph medium>
            {artworkData.draft_container.artwork_about.artwork_title}
          </Text>

          <Text className="verify-gallery-artwork-card__info-text" paragraph medium>
            {artworkData.draft_container.artwork_about.artwork_artist.artist_name}
          </Text>

          {
            artworkData.draft_status === "pending" ? 
              <div className="verify-gallery-artwork-card__info-status-card --pending">
                <Text className="verify-gallery-artwork-card__artwork-status-text" small>
                                    Pending approval
                </Text>
              </div>
              : artworkData.draft_status === "changes_required" ?
                <div className="verify-gallery-artwork-card__info-status-card --changes">
                  <Text className="verify-gallery-artwork-card__artwork-status-text" small>
                                    Changes required
                  </Text>
                </div>
                :
                <div className="verify-gallery-artwork-card__info-status-card --verified">
                  <Text className="verify-gallery-artwork-card__artwork-status-text" small>
                                    Verified
                  </Text>
                </div>
          }
        </div>

        <ForwardArrowIcon className="verify-gallery-artwork-card__enter-form-icon"/>
      </div>
    </>
  );
}
