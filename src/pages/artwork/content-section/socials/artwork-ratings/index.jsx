import { useContext,useRef } from 'react';

import config from '@/config';
import ArtworkDataContext from '@/context/ArtworkDataContext';
import useCache from '@/hooks/useCache';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';

import SocialsHeader from '../components/SocialsHeader';

import RateArtworkForm from './rate-artwork-form';
import VirtualList from './virtual-list';

import './index.css';

export default function ArtworkRatings({ closeSocial }) {
  const { artworkData, socialsData, setSocialsData } = useContext(ArtworkDataContext);
  const { loading, fetchData, setFetchData, loadMoreData } = useCache(`artwork_${artworkData._id}_ratings`, `${config.apis.api.url}/rating/artwork/${artworkData._id}`, {
    injectToken: true
  });
  const ratingsContainer = useRef(null);

  function onRateArtwork(myRating) {
    ratingsContainer.current.classList.add("ratings-animation");
        
    if(socialsData) {
      setSocialsData({
        ...socialsData,
        published_rating: true,
        ratings_count: socialsData.ratings_count + 1
      });
    }

    setFetchData({
      ...fetchData,
      my_rating: myRating,
    });
  }

  return (
    <>
      <div 
        className="artwork-view-ratings__outter-container" 
        onTouchStart={e=>e.stopPropagation()} 
        onTouchEnd={e=>e.stopPropagation()} 
        onWheel={e=>e.stopPropagation()} 
        ref={ratingsContainer}
      >
        <SocialsHeader close={closeSocial} type="ratings"/>
                
        <div className="artwork-view-ratings__content-container">
          {
            loading ?
              <CustomSpinner className="artwork-view-ratings-loading__spinner" thin/>
              : fetchData.my_rating ?
                <VirtualList ratingsData={fetchData} onLoadMore={loadMoreData}/>
                :
                <RateArtworkForm onRateArtwork={onRateArtwork}/>
          }
        </div>
      </div>
    </>
  );
}
