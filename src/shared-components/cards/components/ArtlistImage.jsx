import config from '@/config';
import ArtlistIcon from '@/shared-components/icons/components/user-profile/ArtlistIcon';

import ArtworkImage from './ArtworkImage';

import './styles/ArtlistImage.css';

export default function ArtlistImage({ className="", image, style={} }) {
  if(!image) {
    return (
      <>
        <div className={`artlist-image__artlist-image-template ${className}`} style={style}>
          <ArtlistIcon className="artlist-image__artlist-icon"/>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={`artlist-image__artlist-image-container ${className}`} style={{ ...style, backgroundImage: `url(${config.app.imageServiceDomain}/${image}/w=200,blur=15,brightness=0.8` }}>
          <div className="artlist-image__artlist-overlay">
            <ArtworkImage 
              image={image} 
              imageTemplateClassName="artlist-image__artlist-image" 
              imageClassName="artlist-image__artlist-image"
              forceSmaller={300}
            />
          </div>
        </div>
      </>
    );
  }
}
