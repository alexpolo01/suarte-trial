import config from '@/config';
import useCache from '@/hooks/useCache';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './components/VirtualList';

import './index.css';

export default function Thoughts({ profileData, internal }) {
  const { loading, fetchData, setFetchData, loadMoreData } = useCache(`${profileData._id}_thoughts`, `${config.apis.api.url}/thought/user/${profileData._id}`, {
    injectToken: true,
    invalidateWhen: internal ? 
      ["NEW_THOUGHT", "DELETE_THOUGHT", `${profileData._id}_REFRESH`] 
      : 
      [`${profileData._id}_REFRESH`]
  });

  if(loading) { 
    return (
      <CustomSpinner className="profile-community-thoughts__thoughts-spinner" thin/>
    );
  } else {
    return (
      <>
        {
          fetchData.data.length === 0 ?
            <Text className="profile-community-thoughts__empty-text" paragraph small>
              {
                internal ? 
                  "Your thoughts will build up this view."
                  :
                  "No thoughts available."
              } 
            </Text>
            :
            <VirtualList 
              items={fetchData} 
              setItems={setFetchData} 
              onLoadMore={loadMoreData} 
              cacheKey={`${profileData._id}_thoughts`}
            />
        }
      </>
    );
  }
}
