import { useContext,useState } from 'react';

import ArtworkDataContext from '@/context/ArtworkDataContext';

import PicturesSlider from './components/PicturesSlider';

import './index.css';

export default function PicturesSection() {
  const { artworkData } = useContext(ArtworkDataContext);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <div className="artwork-view-pictures-section__container">
        <PicturesSlider activeSlide={activeSlide} setActiveSlide={setActiveSlide}/>

        {artworkData.artwork_media.artwork_secondary_pictures.length > 0 && (
          <div className="artwork-view-pictures-section__slide-indicators">
            <div className={`artwork-view-pictures-section__slide-indicator${activeSlide === 0 ? " active" : ""}`}/>

            {artworkData.artwork_media.artwork_secondary_pictures.map((secondaryPicture, index) => (
              <div key={secondaryPicture.image_id} className={`artwork-view-pictures-section__slide-indicator ${activeSlide === (index + 1) ? "active" : ""}`}/>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
