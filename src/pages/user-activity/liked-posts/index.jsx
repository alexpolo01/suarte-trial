import config from '@/config';
import useCache from '@/hooks/useCache';
import ActivityHeading from '@/shared-components/text/components/ActivityHeading';
import Text from '@/shared-components/text/components/Text';

import LikedPostsLoader from './components/LikedPostsLoader';
import VirtualList from './components/VirtualList';

import './index.css';

export default function LikedPosts() {
  const { loading, fetchData, loadMoreData } = useCache("liked_posts", `${config.apis.api.url}/posts/liked`, {
    injectToken: true,
    invalidateWhen: ["LIKE_POST"]
  });

  return (
    <>
      <ActivityHeading text="Liked posts"/>
      <div className="activity-liked-posts__container">
        {
          loading ? 
            <LikedPostsLoader/>
            : fetchData.data.length === 0 ? 
              <Text className="activity-liked-posts__text" medium>
                            Liked posts will be displayed here.
              </Text>
              :
              <VirtualList items={fetchData} onLoadMore={loadMoreData}/>
        }
      </div>
    </>
  );
}
