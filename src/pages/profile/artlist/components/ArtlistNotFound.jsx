import GoBackButton from '@/shared-components/buttons/components/GoBackButton';
import PlayArtlistButton from '@/shared-components/buttons/components/PlayArtlistButton';
import ArtlistImage from '@/shared-components/cards/components/ArtlistImage';
import LikeIcon from '@/shared-components/icons/components/actions/LikeIcon';
import ShareProfileIcon from '@/shared-components/icons/components/actions/ShareProfileIcon';
import ArtworkIcon from '@/shared-components/icons/components/user-profile/ArtworkIcon';

import './styles/ArtlistNotFound.css';

export default function ArtlistNotFound() {
  return (
    <>
      <div className="artlist-not-found__page">
        <GoBackButton/>

        <div className="artlist-not-found__header">
          <ArtlistImage className="artlist-not-found__artlist-image" image=""/>

          <div className="artlist-not-found__info-section">
            <h1 className="artlist-not-found__artlist-title">
                            Artlist not found
            </h1>

            <div className="artlist-not-found__creator-info">
              <div className="artlist-not-found__creator-image"/>

              <div className="artlist-not-found__text" style={{ width: "10%", minWidth: "110px" }}/>
            </div>

            <div className="artlist-not-found__text" style={{ width: "100%", marginBottom: "10px" }}/>
            <div className="artlist-not-found__text" style={{ width: "60%", marginBottom: "10px" }}/>

            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <ArtworkIcon className="artlist-not-found__artwork-icon"/>
              <div className="artlist-not-found__text" style={{ width: "7%", minWidth: "74px" }}/>
              <div className="artlist-not-found__separator"/>
              <div className="artlist-not-found__text" style={{ width: "7%", minWidth: "74px" }}/>
            </div>
          </div>
        </div>

        <div className="artlist-not-found__options-container">
          <PlayArtlistButton className="artlist-not-found__play"/>

          <LikeIcon className="artlist-not-found__like"/>

          <ShareProfileIcon className="artlist-not-found__share"/>
        </div>
      </div>
    </>
  );
}
