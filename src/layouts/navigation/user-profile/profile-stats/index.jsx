import { useContext, useMemo,useState } from 'react';

import ProfileDataContext from '@/context/ProfileDataContext';
import useStateHandler from '@/hooks/useStateHandler';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import Inspiring from './inspiring';

import './index.css';

export default function ProfileStats({ fetchData }) {
  const { internal } = useContext(ProfileDataContext);
  const { cacheHandler } = useStateHandler();
  const [openInspiring, setOpenInspiring] = useState(false);
  const numberOfArtworks = useMemo(()=>(
    Utils.numberParserMillionThousand(fetchData.user_profile_info.user_artworks)
  ), [fetchData.user_profile_info.user_artworks]);
  const numberOfInspiring = useMemo(()=>(
    Utils.numberParserMillionThousand(fetchData.user_profile_info.user_inspiring)
  ), [fetchData.user_profile_info.user_inspiring]);
  const numberOfLikes = useMemo(()=>(
    Utils.numberParserMillionThousand(fetchData.user_profile_info.user_likes)
  ), [fetchData.user_profile_info.user_likes]);

  const onCloseClick = () => {
    setOpenInspiring(false);
    cacheHandler.removeFromCache(`${fetchData._id}_inspiring`);
    cacheHandler.removeFromCache(`${fetchData._id}_following`);
  };

  return (
    <>
      <div className="user-profile-profile-stats__container">
        {
          (internal || numberOfArtworks > 0) && (
            <div className="user-profile-stats__stat">
              <Text className="user-profile-stats__stat-number" large paragraph>
                {numberOfArtworks}
              </Text>

              <Text className="user-profile-stats__stat-text" paragraph medium>
                            Artworks
              </Text>
            </div>
          )
        }

        {
          (internal || numberOfInspiring > 0) && (
            <div className="user-profile-stats__stat button" onClick={()=>setOpenInspiring(true)}>
              <Text className="user-profile-stats__stat-number" large paragraph>
                {numberOfInspiring}
              </Text>

              <Text className="user-profile-stats__stat-text" paragraph medium>
                            Inspiring
              </Text>
            </div>
          )
        }

        {
          (internal || numberOfLikes > 0) && (
            <div className="user-profile-stats__stat">
              <Text className="user-profile-stats__stat-number" large paragraph>
                {numberOfLikes}
              </Text>

              <Text className="user-profile-stats__stat-text" paragraph medium>
                            Likes
              </Text>
            </div>
          )
        }

      </div>

      <Inspiring 
        open={openInspiring} 
        close={onCloseClick} 
        fetchData={fetchData} 
        numberOfInspiring={numberOfInspiring} 
      />
    </>
  );
}
