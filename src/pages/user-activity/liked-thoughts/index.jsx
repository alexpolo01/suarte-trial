import config from '@/config';
import useCache from '@/hooks/useCache';
import ActivityHeading from '@/shared-components/text/components/ActivityHeading';
import Text from '@/shared-components/text/components/Text';

import LikedThoughtsLoader from './components/LikedThoughtsLoader';
import VirtualList from './components/VirtualList';

import './index.css';

export default function LikedThoughts() {
  const { loading, fetchData, setFetchData, loadMoreData } = useCache("liked_thoughts", `${config.apis.api.url}/thoughts/liked`, {
    injectToken: true,
    expiresIn: ["0", "seconds"]
  });

  return (
    <>
      <ActivityHeading text="Liked thoughts"/>
      <div className="activity-liked-thoughts__container">
        {
          loading ? 
            <LikedThoughtsLoader/>
            : fetchData.data.length === 0 ? 
              <Text className="activity-liked-thoughts__text" medium>
                            Looks like you haven't given any likes to thoughts yet. Start engaging with the community 
                            by liking the thoughts that stand out to you. 
              </Text>
              :
              <VirtualList
                items={fetchData}
                setItems={setFetchData}
                onLoadMore={loadMoreData}
                cacheKey="liked_thoughts"
              />
        }
      </div>
    </>
  );
}
