import "swiper/css/effect-fade";

import { useEffect, useRef, useState } from 'react';
import { Navigate,useLocation, useNavigate } from 'react-router-dom';
import { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import PlayArtlistButton from '@/shared-components/buttons/components/PlayArtlistButton';
import StopArtlistButton from '@/shared-components/buttons/components/StopArtlistButton';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import XIcon from '@/shared-components/icons/components/public/XIcon';

import './index.css';

export default function PlayArtlist() {
  const [artlistPlaying, setArtlistPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const isTouchStartTriggered = useRef(false);
  const containerElement = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const timeoutId = useRef();

  useEffect(() => {
    if(containerElement.current.requestFullscreen) {
      containerElement.current.requestFullscreen();
    }
  }, []);

  if(!location.state?.artlistArtworks) {
    return (
      <Navigate to="/" replace/>
    );
  }

  function pauseArtlist() {
    setArtlistPlaying(false);
    swiper.autoplay.stop();
  }

  function resumeArtlist() {
    setArtlistPlaying(true);
    swiper.autoplay.start();
  }

  function handleShowControls() {
    setShowControls(true);
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(()=>setShowControls(false), 2000);
  }

  function handleTouchEnd(e) {
    isTouchStartTriggered.current = true;

    if(showControls && (e.target.classList.contains("play-artlist__controls") || e.target.classList.contains("play-artlist__controls-wrap"))) {
      clearTimeout(timeoutId.current);
      setShowControls(false);
    } else {
      handleShowControls();
    }
  }

  function handleMouseMove() {
    if(isTouchStartTriggered.current) {
      isTouchStartTriggered.current = false;
    } else {
      handleShowControls();
    }
  }

  return (
    <>
      <div 
        className={`play-artlist__container${showControls ? " controls-active" : ""}`} 
        onMouseMove={handleMouseMove} 
        onTouchEnd={handleTouchEnd} 
        ref={containerElement}
      >
        <div className="play-artlist__controls">
          <div className="play-artlist__controls-wrap">
            {
              artlistPlaying ? 
                <StopArtlistButton className="play-artlist__controls-stop" onClick={pauseArtlist}/> 
                : 
                <PlayArtlistButton className="play-artlist__controls-resume" onClick={resumeArtlist}/>
            }

            <XIcon className="play-artlist__controls-exit" onClick={()=>navigate(-1)}/> {/** If this is visible, it means that we've entered using an artlist, so we are safe to use navigate(-1) */}
          </div>
        </div>

        <Swiper 
          autoplay={{
            delay: Math.max(0, (location.state.slideDuration-1500)), 
            disableOnInteraction: false
          }}
          speed={1500}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          allowTouchMove={false}
          loop={true}
          className="play-artlist-swiper"
          modules={[EffectFade, Autoplay]}
          onInit={(swiperInstance)=>setSwiper(swiperInstance)}
        >
          {location.state.artlistArtworks.map((artwork) => (
            <SwiperSlide key={artwork._id}>
              <ArtworkImage
                image={artwork.artwork_media.artwork_main_picture.image_id}
                imageClassName="play-artlist-swiper__item"
                imageTemplateClassName="play-artlist-swiper__item"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
