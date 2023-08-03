import Utils from '@/utils';

import ArtworkImage from './ArtworkImage';

import './styles/InventoryCard.css';

export default function InventoryCard({ artworkData, type, children }) {
  return (
    <>
      <div className="inventory-card__container">
        <ArtworkImage
          image={
            type === "draft" ? 
              artworkData.draft_container.artwork_media.artwork_main_picture.image_id
              :
              artworkData.artwork_media.artwork_main_picture.image_id
          }
          imageClassName="inventory-card__image"
          imageTemplateClassName="inventory-card__image"
          forceSmaller={300}
        />

        <div className="inventory-card__info">
          <div className="inventory-card__title-section">
            <span className="inventory-card__big-text dots-on-overflow --title mt-m">
              {
                type === "draft" ?
                  artworkData.draft_container.artwork_about.artwork_title
                  :
                  artworkData.artwork_about.artwork_title
              }
            </span>

            <span className="inventory-card__text mt-s" style={{ flexShrink: "0" }}>
              {Utils.getDateInStringFromTimestamp(new Date(artworkData.artwork_flags?.sold_at ? artworkData.artwork_flags.sold_at : artworkData.createdAt).getTime())}
            </span>
          </div>

          <div className="inventory-card__details-section">
            <div className="inventory-card__details-text">
              <span className="inventory-card__text dots-on-overflow mt-s">
                                by{" "}

                {
                  type === "draft" ?
                    artworkData.draft_container.artwork_about.artwork_artist.gallery_artist ?
                      artworkData.draft_container.artwork_about.artwork_artist.user_name
                      :
                      artworkData.draft_container.artwork_about.artwork_artist.artist_name
                    :
                    artworkData.artwork_about.artwork_artist ?
                      artworkData.artwork_about.artwork_artist.user_name
                      :
                      artworkData.artwork_about.artwork_gallery_artist.artist_name
                }
              </span>

              <span className="inventory-card__text dots-on-overflow mt-s">
                {
                  type === "draft" ?
                    artworkData.draft_container.artwork_about.artwork_medium
                    :
                    artworkData.artwork_about.artwork_medium
                }
              </span>

              <span className="inventory-card__text dots-on-overflow mt-s">
                {
                  type === "draft" ?
                    `${artworkData.draft_container.artwork_about.artwork_size.length} ${artworkData.draft_container.artwork_about.artwork_size.unit} x ${artworkData.draft_container.artwork_about.artwork_size.height} ${artworkData.draft_container.artwork_about.artwork_size.unit}`
                    :
                    `${artworkData.artwork_about.artwork_size.length} ${artworkData.artwork_about.artwork_size.unit} x ${artworkData.artwork_about.artwork_size.height} ${artworkData.artwork_about.artwork_size.unit}`
                }
              </span>
            </div>

            {children}
          </div>

          <span className="inventory-card__big-text dots-on-overflow mt-m">
            {
              type === "draft" ?
                Utils.getArtworkPrice(artworkData.draft_container.artwork_about.artwork_price, artworkData.draft_container.artwork_about.artwork_currency)
                :
                Utils.getArtworkPrice(artworkData.artwork_about.artwork_price, artworkData.artwork_about.artwork_currency)
            }
          </span>
        </div>
      </div>
    </>
  );
}
