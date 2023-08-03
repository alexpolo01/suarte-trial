import { useRef } from 'react';
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import config from '@/config';
import ArtworkDataContext from '@/context/ArtworkDataContext';
import useCache from '@/hooks/useCache';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import SkeletonArtwork from '@/shared-components/loaders/components/SkeletonArtwork';
import Utils from '@/utils';

import ArtworkNotFound from './components/ArtworkNotFound';
import useArtwork from './hooks/useArtwork';
import useArtworkSlider from './hooks/useArtworkSlider';
import ArtworkHeader from './artwork-header';
import ContentSection from './content-section';
import PicturesSection from './pictures-section';

import './index.css';

function ArtworkSlide({ artworkData, hasPrev, hasNext, displayLoader }) {
  const { fetchData, setFetchData }  = useCache(`artwork_${artworkData._id}_socials`, `${config.apis.api.url}/artwork/${artworkData._id}/social`, {
    type: "@cache/dynamic",
    injectToken: true,
  });
  const scrollableDiv = useRef();
  const { onTouchStart, onTouchEnd, onWheel } = useArtworkSlider(scrollableDiv);

  return (
    <>
      <ArtworkDataContext.Provider 
        value={{
          artworkData, 
          socialsData: fetchData, 
          setSocialsData: setFetchData
        }}
      >
        <div 
          className="artwork__container remove-scrollbar" 
          onTouchStart={onTouchStart} 
          onTouchEnd={onTouchEnd} 
          onWheel={onWheel} 
          ref={scrollableDiv}
        >
          <div className="artwork__wrap">
            <ArtworkHeader className="main-header"/>
                        
            <PicturesSection/>

            <ContentSection hasPrev={hasPrev} hasNext={hasNext}/>
          </div>

          {displayLoader && (
            <CustomSpinner className="artwork__spinner" thin/>
          )}
        </div>
      </ArtworkDataContext.Provider>
    </>
  );
}
export default function Artwork() {
  const { loading, error, artworks, shouldLoadMore, activeSlide, setActiveSlide } = useArtwork();
  const isDevice = useRef(Utils.isDevice());

  if(loading) { 
    return (
      <SkeletonArtwork/>
    );
  } else if(error) {
    return (
      <ArtworkNotFound/>
    );
  } else {
    return (
      <>
        <Swiper 
          className="artwork__swiper"
          direction='vertical'
          allowTouchMove={false}
          speed={isDevice.current ? 400 : 900}
          onInit={swiper => swiper.slideTo(activeSlide, 0)}
          onSlideChange={swiper => setActiveSlide(swiper.activeIndex)}
          modules={[Virtual]}
          virtual
        >
          {artworks.data.map((artworkData, index) => (
            <SwiperSlide key={artworkData.product_id ? artworkData.product_id : artworkData._id} virtualIndex={index}>
              <ArtworkSlide 
                artworkData={artworkData}
                hasPrev={index !== 0}
                hasNext={index !== (artworks.data.length - 1)}
                displayLoader={shouldLoadMore && (index === (artworks.data.length - 1))}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  }
}
