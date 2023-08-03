import { useContext,useState } from 'react';

import ArtworkDataContext from '@/context/ArtworkDataContext';
import useGetSearchParams from '@/hooks/useGetSearchParams';
import BuyLimitedEditionButton from '@/shared-components/artwork/buy-limited-edition';
import BuyOriginalButton from '@/shared-components/artwork/buy-original';
import ArtworkLabel from '@/shared-components/artwork/components/ArtworkLabel';

import ArtworkHeader from '../artwork-header';

import AudioPlayer from './components/AudioPlayer';
import Description from './components/Description';
import DesktopControls from './components/DesktopControls';
import Socials from './socials';

import './index.css';

export default function ContentSection({ hasPrev, hasNext }) {
  const { artworkData, socialsData, setSocialsData } = useContext(ArtworkDataContext);
  const [params] = useGetSearchParams({ validParams: ["rate", "thought"] });
  const [selectedSocial, setSelectedSocial] = useState(initSocials());

  function initSocials() {
    if(params?.rate) {
      return "ratings";
    } else if(params?.thought) {
      return "thoughts";
    } else {
      return "initial-thoughts";
    }
  }

  return (
    <>
      <div className="artwork-view-content-section__container">
        <ArtworkHeader/>

        <div className="artwork-view-content-section__content">
          <DesktopControls hasPrev={hasPrev} hasNext={hasNext}/>
                    
          <div className="artwork-view-content-section__artwork-info">
            <ArtworkLabel 
              artworkData={artworkData} 
              socialsData={socialsData}
              onClickThought={()=>setSelectedSocial("thoughts")} 
              onClickRating={()=>setSelectedSocial("ratings")}
              onClickLike={likeStatus => {
                if(socialsData) {
                  setSocialsData({
                    ...socialsData,
                    likes_count: likeStatus ? socialsData.likes_count + 1 : socialsData.likes_count - 1
                  });
                }
              }}
            />
                        
            {Boolean(artworkData.artwork_media.artwork_audio) && <AudioPlayer audio={artworkData.artwork_media.artwork_audio.audio_id}/>}

            <Description artworkData={artworkData}/>

            <div className="artwork-view-content-section__buy-section">
              <BuyOriginalButton artworkData={artworkData}/>
              <BuyLimitedEditionButton artworkData={artworkData}/>
            </div>

            {selectedSocial && (
              <Socials selectedSocial={selectedSocial} closeSocial={()=>setSelectedSocial(null)}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
