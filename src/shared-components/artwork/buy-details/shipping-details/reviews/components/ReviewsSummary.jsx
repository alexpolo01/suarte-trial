import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import LimitedEditionIcon from '@/shared-components/icons/components/artwork/LimitedEditionIcon';
import ThumbIcon from '@/shared-components/icons/components/artwork/ThumbIcon';
import Utils from '@/utils';

import './styles/ReviewsSummary.css';

export default function ReviewsSummary({ purchaseFetchData, artworkData, typeOfPurchase }) {
  return (
    <>
      {
        typeOfPurchase === "limited_edition" ?
          <div className="reviews-summary__suarte">
            <LimitedEditionIcon className="reviews-summary__suarte-icon"/>

            <p className="reviews-summary__gallery-name dots-on-overflow mt-m">
                            Suarte
            </p>
          </div>
          :
          <div className="reviews-summary__suarte">
            <UserProfileImage
              typeOfProfile="gallery"
              image={artworkData.artwork_about.artwork_gallery.user_image?.image_id}
              className="reviews-summary__gallery-image"
            />

            <p className="reviews-summary__gallery-name dots-on-overflow mt-m">
              {artworkData.artwork_about.artwork_gallery.user_name}
            </p>
          </div>
      }

      <div className="reviews-summary__content">
        <div className="reviews-summary__column">
          <span className="reviews-summary__column-text mt-s">
                        Positive
          </span>

          <ThumbIcon className="reviews-summary__column-icon positive"/>

          <span className="reviews-summary__column-text mt-s">
            {Utils.numberParserMillionThousand(purchaseFetchData.valorations.positive)}
          </span>
        </div>

        <div className="reviews-summary__column">
          <span className="reviews-summary__column-text mt-s">
                        Neutral
          </span>

          <ThumbIcon className="reviews-summary__column-icon neutral"/>

          <span className="reviews-summary__column-text mt-s">
            {Utils.numberParserMillionThousand(purchaseFetchData.valorations.neutral)}
          </span>
        </div>

        <div className="reviews-summary__column">
          <span className="reviews-summary__column-text mt-s">
                        Negative
          </span>

          <ThumbIcon className="reviews-summary__column-icon negative"/>

          <span className="reviews-summary__column-text mt-s">
            {Utils.numberParserMillionThousand(purchaseFetchData.valorations.negative)}
          </span>
        </div>
      </div>
    </>
  );
}
