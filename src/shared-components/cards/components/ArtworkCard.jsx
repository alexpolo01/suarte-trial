import LimitedEditionIcon from '@/shared-components/icons/components/artwork/LimitedEditionIcon';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import ArtworkImage from './ArtworkImage';

import './styles/ArtworkCard.css';

export default function ArtworkCard({ artworkData, className="", onClick }) {
  return (
    <>
      <div className={`artwork-card__card ${className} ${onClick ? "pointer" : ""}`} onClick={onClick}>
        <ArtworkImage 
          image={artworkData.artwork_media.artwork_main_picture.image_id} 
          imageClassName="artwork-card__artwork-image" 
          imageTemplateClassName="artwork-card__image-template" 
          style={{ aspectRatio: artworkData.artwork_media.artwork_main_picture.image_original_data.aspect_ratio }}
          forceSmaller={300}
          forceSmallerDimension={artworkData.artwork_media.artwork_main_picture.image_original_data.aspect_ratio > 1 ? "height" : "width"}
        />

        <div className={`artwork-card__title-section${artworkData.artwork_limited_edition ? " limited-edition" : ""}`}>
          <Text className="artwork-card__title" paragraph medium>
            {artworkData.artwork_about.artwork_title}
          </Text>

          {Boolean(artworkData.artwork_limited_editions) && <LimitedEditionIcon className="artwork-card__limited-edition-icon"/>}
        </div>

        <Text className="artwork-card__text artist" paragraph small>
          {
            artworkData.artwork_about.artwork_artist ?
              artworkData.artwork_about.artwork_artist.user_name
              :
              artworkData.artwork_about.artwork_gallery_artist.artist_name
          }
        </Text>

        <p className="artwork-card__text medium-year mt-s">
          {artworkData.artwork_about.artwork_medium}, {artworkData.artwork_about.artwork_year}
        </p>

        <Text className="artwork-card__text price" paragraph small>
          {Utils.getArtworkPrice(artworkData.artwork_about.artwork_price, artworkData.artwork_about.artwork_currency)}
        </Text>
      </div>
    </>
  );
}
