import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import ArtworkImage from './ArtworkImage';

import './styles/ArtworkSliderCard.css';

export default function ArtworkSliderCard({ artworkData, cardClassName="", imageClassName="", hideText=false, onClick }) {
  return (
    <>
      <div className={`artwork-slider-card__card ${cardClassName} ${onClick ? "pointer" : ""}`} onClick={onClick}>
        <ArtworkImage 
          image={artworkData.artwork_media.artwork_main_picture.image_id} 
          imageClassName={imageClassName} 
          imageTemplateClassName={imageClassName}
          style={{ aspectRatio: artworkData.artwork_media.artwork_main_picture.image_original_data.aspect_ratio }}
          forceSmaller={300}
          forceSmallerDimension={artworkData.artwork_media.artwork_main_picture.image_original_data.aspect_ratio > 1 ? "height" : "width"}
        />

        {!hideText && (
          <>
            <div className="artworks-slider-card__card-content-no-layout">
              <Text className="artworks-slider-card__card-content-title dots-on-overflow" paragraph medium>
                {artworkData.artwork_about.artwork_title}
              </Text>

              <Text className="artworks-slider-card__card-content-text artist dots-on-overflow" paragraph small>
                {
                  artworkData.artwork_about.artwork_artist ?
                    artworkData.artwork_about.artwork_artist.user_name
                    :
                    artworkData.artwork_about.artwork_gallery_artist.artist_name
                }
              </Text>

              <p className="artworks-slider-card__card-content-text medium-year dots-on-overflow mt-s">
                {artworkData.artwork_about.artwork_medium}, {artworkData.artwork_about.artwork_year}
              </p>

              <Text className="artworks-slider-card__card-content-text price dots-on-overflow" paragraph small>
                {Utils.getArtworkPrice(artworkData.artwork_about.artwork_price, artworkData.artwork_about.artwork_currency)}
              </Text>
            </div>

            <div className="artworks-slider-card__card-content-layout">
              <Text className="artworks-slider-card__card-content-title" paragraph medium>.</Text>
              <Text className="artworks-slider-card__card-content-text artist" paragraph small>.</Text>
              <p className="artworks-slider-card__card-content-text medium-year">.</p>
              <Text className="artworks-slider-card__card-content-text price" paragraph small>.</Text>
            </div>
          </>
        )}
      </div>
    </>
  );
}
