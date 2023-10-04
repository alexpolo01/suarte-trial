import config from '@/config';
import useCache from '@/hooks/useCache';
import useNavigateToArtwork from '@/hooks/useNavigateToArtwork';
import ActivityHeading from '@/shared-components/text/components/ActivityHeading';
import Text from '@/shared-components/text/components/Text';

import LikedArtworksLoader from './components/LikedArtworksLoader';
import VirtualList from './components/VirtualList';

import './index.css';

export default function LikedArtworks() {
  const { loading, fetchData, loadMoreData } = useCache("liked_artworks", `${config.apis.api.url}/liked/artworks`, {
    injectToken: true,
    invalidateWhen: ["LIKE_ARTWORK"]
  });
  const navigateToArtwork = useNavigateToArtwork("liked_artworks", fetchData, "/liked/artworks?");

  return (
    <>
      <ActivityHeading text="Liked artworks"/>

      <div className="activity-liked-artworks__container">
        {
          loading ? 
            <LikedArtworksLoader/>
            : fetchData.data.length === 0 ? 
              <Text className="activity-liked-artworks__text" medium>
                            Liked artwoks will be displayed here.
              </Text>
              :
              <VirtualList 
                items={fetchData} 
                onLoadMore={loadMoreData}
                navigateToArtwork={navigateToArtwork}
              />
        }
      </div>
    </>
  );
}
