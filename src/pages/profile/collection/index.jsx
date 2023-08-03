import { useContext } from 'react';

import config from '@/config';
import ProfileDataContext from '@/context/ProfileDataContext';
import useCache from '@/hooks/useCache';
import useNavigateToArtwork from '@/hooks/useNavigateToArtwork';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './components/VirtualList';

import './index.css';

export default function ProfileCollection() {
  const { profileData, internal } = useContext(ProfileDataContext);
  const { loading, fetchData, loadMoreData } = useCache(`${profileData._id}_collection`, `${config.apis.api.url}/collection/${profileData._id}`, {
    injectToken: true,
    includeSearchQueries: { visibility: "private" }, 
    invalidateWhen: internal ? 
      ["BUY_ARTWORK", "EDIT_COLLECTION", `${profileData._id}_REFRESH`] 
      : 
      [`${profileData._id}_REFRESH`]
  });
  const navigateToArtwork = useNavigateToArtwork(`${profileData._id}_collection`, fetchData, `/collection/${profileData._id}?`);

  return (
    <>
      {
        loading ?
          <CustomSpinner className="profile-collection__collection-spinner" thin/>
          : fetchData.data.length === 0 ? 
            <Text className="user-profile__collection-empty-view" paragraph small>
              {
                internal ? 
                  "To begin your collection, purchase an Original Artwork or Limited Edition."
                  :
                  "The collection is currently empty. Check back later for future additions."
              }                        
            </Text>
            :
            <VirtualList 
              items={fetchData} 
              onLoadMore={loadMoreData}
              navigateToArtwork={navigateToArtwork}
            />
      }
    </>
  );
}
