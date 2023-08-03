import useGoBack from '@/hooks/useGoBack';
import useScreenSize from '@/hooks/useScreenSize';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';

import SkeletonThought from './SkeletonThought';

import './styles/SkeletonArtwork.css';

export default function SkeletonArtwork() {
  const goBackHandler = useGoBack();
  const screenSize = useScreenSize();

  return (
    <>
      <div className="skeleton-artwork__container">
        <div className="skeleton-artwork__header --main">
          <BackArrowIcon className="skeleton-artwork__back" onClick={goBackHandler}/>
          <div className="skeleton-artwork__gallery-image"/>
          <div className="skeleton-artwork__gallery-name"/>
        </div>

        <div className="skeleton-artwork__image-container">
          <div className="skeleton-artwork__image"/>
        </div>

        <div className="skeleton-artwork__content">
          <div className="skeleton-artwork__header">
            <BackArrowIcon className="skeleton-artwork__back" onClick={goBackHandler}/>
            <div className="skeleton-artwork__gallery-image"/>
            <div className="skeleton-artwork__gallery-name"/>
          </div>

          <div className="skeleton-artwork__label">
            <div className="skeleton-artwork__artist">
              <div className="skeleton-artwork__artist-image"/>
              <div className="skeleton-artwork__artist-text-container">
                <div className="skeleton-artwork__small-text" style={{ width: "150px" }}/>
                <div className="skeleton-artwork__small-text" style={{ width: "100px" }}/>
              </div>
            </div>

            <div className="skeleton-artwork__artwork-title"/>

            <div className="skeleton-artwork__small-text" style={{ width: "110px" }}/>
            <div className="skeleton-artwork__small-text" style={{ width: "130px" }}/>
            <div className="skeleton-artwork__small-text" style={{ width: "90px" }}/>
          </div>

          <div className="skeleton-artwork__small-text" style={{ width: "100%", marginBottom: "8px" }}/>
          <div className="skeleton-artwork__small-text" style={{ width: "100%", marginBottom: "8px" }}/>
          {screenSize.width > 900 && <>
            <div className="skeleton-artwork__small-text" style={{ width: "100%", marginBottom: "8px" }}/>
            <div className="skeleton-artwork__small-text" style={{ width: "100%", marginBottom: "8px" }}/>
          </>}

          <div className="skeleton-artwork__buttons">
            <div className="skeleton-artwork-button"/>
            <div className="skeleton-artwork-button margin"/>
          </div>

          <div className="skeleton-artwork__thoughts remove-scrollbar">
            <SkeletonThought/>
            <SkeletonThought/>
            <SkeletonThought/>
            <SkeletonThought/>
            <SkeletonThought/>
            <SkeletonThought/>
            <SkeletonThought/>
            <SkeletonThought/>
            <SkeletonThought/>
            <SkeletonThought/>
            <SkeletonThought/>
            <SkeletonThought/>
            <SkeletonThought/>
          </div>
        </div>
      </div>
    </>
  );
}
