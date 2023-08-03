import { useContext, useRef,useState } from 'react';

import ArtworkDataContext from '@/context/ArtworkDataContext';
import useGoBack from '@/hooks/useGoBack';
import useNavigateWithTransition from '@/hooks/useNavigateWithTransition';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import BackArrowIcon from '@/shared-components/icons/components/public/BackArrowIcon';
import ThreeDotsIcon from '@/shared-components/icons/components/public/ThreeDotsIcon';
import Text from '@/shared-components/text/components/Text';

import Options from './options';

import './index.css';

export default function ArtworkHeader({ className }) {
  const { artworkData } = useContext(ArtworkDataContext);
  const [openOptions, setOpenOptions] = useState(false);
  const goBackHandler = useGoBack("/");
  const imageWrapperRef = useRef(null);
  const navigateWithTransition = useNavigateWithTransition();

  return (
    <>
      <div className={`artwork-view-header__container element-non-selectable ${className}`}>
        <div className="artwork-view-header__inner-container">
          <BackArrowIcon className="artwork-view-header__go-back-button" onClick={goBackHandler}/>

          <div 
            className="artwork-view-header__gallery-container" 
            onClick={() => {
              imageWrapperRef.current.style.viewTransitionName = `user_${artworkData.artwork_about.artwork_gallery._id}_animation`;
              navigateWithTransition(`/user/${artworkData.artwork_about.artwork_gallery.user_username}`, {
                state: {
                  from: true
                }
              });
            }}
          >
            <div className="artwork-view-header__gallery-image-wrapper" ref={imageWrapperRef}>
              <UserProfileImage 
                typeOfProfile={artworkData.artwork_about.artwork_gallery.user_type} 
                image={artworkData.artwork_about.artwork_gallery.user_image?.image_id} 
                className="artwork-view-header__gallery-image"
              />
            </div>

            <Text className="artwork-view-header__gallery-name dots-on-overflow" paragraph medium>
              {artworkData.artwork_about.artwork_gallery.user_name}
            </Text>
          </div>

          <ThreeDotsIcon className="artwork-view-header__options-button" onClick={()=>setOpenOptions(true)}/>
        </div>

        <Options open={openOptions} close={()=>setOpenOptions(false)}/>
      </div>
    </>
  );
}
