import config from '@/config';
import useCache from '@/hooks/useCache';
import ActivityHeading from '@/shared-components/text/components/ActivityHeading';
import Text from '@/shared-components/text/components/Text';

import LikedArtlistsLoader from './components/LikedArtlistsLoader';
import VirtualList from './components/VirtualList';

import './index.css';

export default function LikedArtlists() {
  const { loading, fetchData, loadMoreData } = useCache("liked_artlists", `${config.apis.api.url}/artlists/liked`, {
    injectToken: true,
    invalidateWhen: ["LIKE_ARTLIST"]
  });

  return (
    <>
      <ActivityHeading text="Liked artlists"/>

      <div className="activity-liked-artlists__container">
        {
          loading ? 
            <LikedArtlistsLoader/>
            : fetchData.data.length === 0 ? 
              <Text className="activity-liked-artlists__text" medium>
                            Liked posts will be displayed here.
              </Text>
              :
              <VirtualList items={fetchData} onLoadMore={loadMoreData}/>
        }
      </div>
    </>
  );
}
