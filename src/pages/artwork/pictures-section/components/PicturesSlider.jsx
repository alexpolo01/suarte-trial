import { useContext,useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import ArtworkDataContext from '@/context/ArtworkDataContext';
import { NextButton,PrevButton } from '@/shared-components/buttons/components/SliderControls';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import PictureViewer from '@/shared-components/popups/components/PictureViewer';

import './styles/PicturesSlider.css';

export default function PicturesSlider({ activeSlide, setActiveSlide }) {
  const { artworkData } = useContext(ArtworkDataContext);
  const [swiper, setSwiper] = useState(null);
  const [pictureToZoom, setPictureToZoom] = useState(null);

  return (
    <>
      <div className="artwork-view-pictures-slider__container element-non-selectable">
        <Swiper 
          className="artwork-view-pictures-slider__swiper" 
          spaceBetween={10} 
          onInit={swiper => setSwiper(swiper)} 
          onSlideChange={swiper => setActiveSlide(swiper.activeIndex)} 
          simulateTouch={false}
        >
          <SwiperSlide>
            <ArtworkImage 
              image={artworkData.artwork_media.artwork_main_picture.image_id} 
              imageClassName="artwork-view-pictures-slider__artwork-picture" 
              imageTemplateClassName="artwork-view-pictures-slider__artwork-picture template" 
              onClick={()=>setPictureToZoom(artworkData.artwork_media.artwork_main_picture.image_id)}
            />
          </SwiperSlide>

          {artworkData.artwork_media.artwork_secondary_pictures.map(secondaryPicture => (
            <SwiperSlide key={secondaryPicture.image_id}>
              <ArtworkImage 
                image={secondaryPicture.image_id} 
                imageClassName="artwork-view-pictures-slider__artwork-picture" 
                imageTemplateClassName="artwork-view-pictures-slider__artwork-picture template" 
                onClick={()=>setPictureToZoom(secondaryPicture.image_id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {artworkData.artwork_media.artwork_secondary_pictures.length > 0 && (
          <>
            <div className="artwork-view-pictures-slider__control-outter prev" onClick={()=>swiper?.slidePrev()}>
              <PrevButton className={`artwork-view-pictures-slider__control ${activeSlide === 0 ? "disabled" : ""}`}/>
            </div>

            <div className="artwork-view-pictures-slider__control-outter next" onClick={()=>swiper?.slideNext()}>
              <NextButton className={`artwork-view-pictures-slider__control ${activeSlide === artworkData.artwork_media.artwork_secondary_pictures.length ? "disabled" : ""}`}/>
            </div>
          </>
        )}
      </div> 
            
      <PictureViewer picture={pictureToZoom} close={()=>setPictureToZoom(null)}/>
    </>
  );
}
