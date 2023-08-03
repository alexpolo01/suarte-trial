import useGoBack from '@/hooks/useGoBack';
import useScreenSize from '@/hooks/useScreenSize';
import PriceTag from '@/shared-components/artwork/components/PriceTag';
import LimitedEditionIcon from '@/shared-components/icons/components/artwork/LimitedEditionIcon';
import LikeIcon from '@/shared-components/icons/components/new-icons/LikeIcon';
import RatingIcon from '@/shared-components/icons/components/new-icons/RatingIcon';
import ThoughtIcon from '@/shared-components/icons/components/new-icons/ThoughtIcon';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';

import './styles/ArtworkNotFound.css';

export default function ArtworkNotFound() {
  const goBackHandler = useGoBack();
  const screenSize = useScreenSize();

  return (
    <>
      <div className="artwork-not-found__container">
        <div className="artwork-not-found__header --main">
          <BackArrowIcon className="artwork-not-found__back" onClick={goBackHandler}/>
          <div className="artwork-not-found__gallery-image"/>
          <div className="artwork-not-found__gallery-name"/>
        </div>

        <div className="artwork-not-found__image-container">
          <div className="artwork-not-found__image"/>
        </div>

        <div className="artwork-not-found__content">
          <div className="artwork-not-found__header">
            <BackArrowIcon className="artwork-not-found__back" onClick={goBackHandler}/>
            <div className="artwork-not-found__gallery-image"/>
            <div className="artwork-not-found__gallery-name"/>
          </div>

          <div className="artwork-not-found__label">
            <div className="artwork-not-found__artist">
              <div className="artwork-not-found__artist-image"/>
              <div className="artwork-not-found__artist-text-container">
                <div className="artwork-not-found__small-text" style={{ width: "150px" }}/>
                <div className="artwork-not-found__small-text" style={{ width: "100px" }}/>
              </div>
            </div>

            <span className="artwork-not-found__artwork-title mt-l">
                            Artwork not found
            </span>

            <div className="artwork-not-found__small-text" style={{ width: "110px" }}/>
            <div className="artwork-not-found__small-text" style={{ width: "130px" }}/>
            <div className="artwork-not-found__small-text" style={{ width: "90px" }}/>

            <div className="artwork-not-found__social-icons">
              <RatingIcon className="artwork-not-found__social-icon"/>
              <ThoughtIcon className="artwork-not-found__social-icon"/>
              <LikeIcon className="artwork-not-found__social-icon"/>
            </div>
          </div>

          <div className="artwork-not-found__small-text" style={{ width: "100%", marginBottom: "8px" }}/>
          <div className="artwork-not-found__small-text" style={{ width: "100%", marginBottom: "8px" }}/>
          {screenSize.width > 900 && <>
            <div className="artwork-not-found__small-text" style={{ width: "100%", marginBottom: "8px" }}/>
            <div className="artwork-not-found__small-text" style={{ width: "100%", marginBottom: "8px" }}/>
          </>}

          <div className="artwork-not-found__buttons">
            <div className="artwork-not-found-button">
              <PriceTag price={""} currency={""}/>
            </div>

            <div className="artwork-not-found-button margin">
              <LimitedEditionIcon className="artwork-not-found__limited-edition-icon"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
