import { useMemo, useState } from 'react';

import useScreenSize from '@/hooks/useScreenSize';
import XIcon from '@/shared-components/icons/components/public/XIcon';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import GenericBottomSheet from '@/shared-components/popups/components/GenericBottomSheet';
import Text from '@/shared-components/text/components/Text';
import TextHandler from '@/shared-components/text/components/TextHandler';

import './styles/DisplayDescription.css';

export default function DisplayDescription({ fetchData }) {
  const [showText, setShowText] = useState(false);
  const screenSize = useScreenSize();
  const threshold = useMemo(()=>{
    if(screenSize.width >= 840) return 200;
    if(screenSize.width >= 753) return 170;
    if(screenSize.width >= 680) return 145;
    if(screenSize.width >= 590) return 130;
    if(screenSize.width >= 455) return 116;
    if(screenSize.width >= 420) return 100;
    else return 90;
  }, [screenSize.width]);

  return (
    <>
      <TextHandler 
        className="profile-info-display-description__text" 
        controlsClassName="profile-info-display-description__more-button" 
        text={fetchData.user_profile_info.user_description} 
        maxCharactersWhenCollapsed={threshold} 
        moreControlClick={()=>setShowText(true)} 
        medium
      />

      <GenericBottomSheet 
        open={showText} 
        close={() => setShowText(false)} 
        className="profile-info-display__description-bottom-sheet"
      >
        <div className="profile-info-display__description-content remove-scrollbar element-non-selectable">
          <div className="profile-info-display__description-content-header">
            <Text className="profile-info__user_name header dots-on-overflow" medium paragraph>
              {
                fetchData.user_type === "collector" ? 
                  fetchData.user_username 
                  : 
                  fetchData.user_name
              }
                            
              {(fetchData.user_type === "artist" && fetchData.user_flags.suarteroad_completed) && <ArtistVerifiedIcon className="profile-info__artist-verified-icon"/>}
            </Text>

            <XIcon className="profile-info-display__description-content-close" onClick={()=>setShowText(false)}/>
          </div>

          <Text className="profile-info-display__description-bottom-sheet-text" medium paragraph justify>
            {fetchData.user_profile_info.user_description}
          </Text>
        </div>
      </GenericBottomSheet>
    </>
  );
}
