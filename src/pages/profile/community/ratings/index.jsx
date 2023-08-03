import config from '@/config';
import useCache from '@/hooks/useCache';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import VirtualList from './components/VirtualList';

import './index.css';

export default function Ratings({ profileData, internal }) {
  const { loading, fetchData, loadMoreData } = useCache(`${profileData._id}_ratings`, `${config.apis.api.url}/rating/user/${profileData._id}`, {
    injectToken: true,
    invalidateWhen: ["NEW_RATING", `${profileData._id}_REFRESH`]
  });

  if(loading) { 
    return (
      <CustomSpinner className="profile-community-ratings__ratings-spinner" thin/>
    );
  } else {
    return (
      <>
        {
          fetchData.data.length === 0 ?
            <Text className="profile-community-ratings__empty-text" paragraph small>
              {
                internal ? 
                  "Your ratings will build up this view."
                  :
                  "No ratings available."
              } 
            </Text>
            :
            <VirtualList items={fetchData} onLoadMore={loadMoreData}/>
        }
      </>
    );
  }
}
