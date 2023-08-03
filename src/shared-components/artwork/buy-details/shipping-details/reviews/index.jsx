import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';

import ReviewsSummary from './components/ReviewsSummary';

import './index.css';

export default function Reviews({ purchaseFetchData, artworkData, typeOfPurchase, close }) {
  return (
    <>
      <div className="reviews__container">
        <div className="reviews__header element-non-selectable" onClick={close}>
          <BackArrowIcon className="reviews__back-button"/>

          <span className="reviews__header-text mt-s">
                        Go back to shipping
          </span>
        </div>

        <ReviewsSummary
          purchaseFetchData={purchaseFetchData}
          artworkData={artworkData}
          typeOfPurchase={typeOfPurchase}
        />

        {/* TODO: NO VIRTUAL LIST FOR NOW */}
      </div>
    </>
  );
}
