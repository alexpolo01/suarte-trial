import config from "@/config";
import Text from "@/shared-components/text/components/Text";

import "./index.css";

export default function ArtworkRow({
  artwork,
  onClickAdd,
  added
}) {
  const image = artwork.artwork_media.artwork_main_picture.image_id;
  
  return (
    <div className="add-artworks-popup__artwork-row">
      <img
        src={`${config.app.imageServiceDomain}/${image}/w=200`}
        srcSet={
          `${config.app.imageServiceDomain}/${image}/w=200 200w,
                        ${config.app.imageServiceDomain}/${image}/w=400 400w,
                        ${config.app.imageServiceDomain}/${image}/w=600 600w,
                        ${config.app.imageServiceDomain}/${image}/w=800 800w,
                        ${config.app.imageServiceDomain}/${image}/w=1000 1000w,
                        ${config.app.imageServiceDomain}/${image}/w=1200 1200w,
                        ${config.app.imageServiceDomain}/${image}/w=1400 1400w,
                        ${config.app.imageServiceDomain}/${image}/w=1600 1600w,
                        ${config.app.imageServiceDomain}/${image}/w=1800 1800w,
                        ${config.app.imageServiceDomain}/${image}/w=2000 2000w,
                        ${config.app.imageServiceDomain}/${image}/w=2200 2200w`
        }
        alt="artwork main preview"
        className="add-artworks-popup__artwork-img"
      />
      <div className="add-artworks-popup__artwork-text">
        <Text small paragraph>{artwork.artwork_about.artwork_title}</Text>
        <Text small paragraph>by {artwork.artwork_about.artwork_gallery_artist.artist_name}</Text>
      </div>
      <div className="add-artworks-popup__artwork-add" onClick={() => onClickAdd(artwork)}>
        { added 
          ? 
          <Text small paragraph style={{ color: 'white' }}>Added</Text>
          : 
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9.25" stroke="#FFBA00" strokeWidth="1.5"/>
            <path d="M6 10H14" stroke="#FFBA00" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 6L10 14" stroke="#FFBA00" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        }
      </div>
    </div>
  );
}