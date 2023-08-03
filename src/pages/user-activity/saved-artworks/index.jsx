import config from '@/config';
import useCache from '@/hooks/useCache';
import useNavigateToArtwork from '@/hooks/useNavigateToArtwork';
import ActivityHeading from '@/shared-components/text/components/ActivityHeading';
import Text from '@/shared-components/text/components/Text';

import SavedArtworksLoader from './components/SavedArtworksLoader';
import VirtualList from './components/VirtualList';

import './index.css';

export default function SavedArtworks() {
  const { loading, fetchData, loadMoreData } = useCache("saved_artworks", `${config.apis.api.url}/saved/artworks`, {
    injectToken: true,
    invalidateWhen: ["SAVE_ARTWORK"]
  });
  const navigateToArtwork = useNavigateToArtwork("saved_artworks", fetchData, "/saved/artworks?");

  return (
    <>
      <ActivityHeading text="Saved artworks"/>

      <div className="activity-saved-artworks__container">
        {
          loading ? 
            <SavedArtworksLoader/>
            : fetchData.data.length === 0 ? 
              <Text className="activity-saved-artworks__text" medium>
                            You haven't saved any artworks yet. Create your personal gallery by saving 
                            the pieces that inspire you. It's a great way to curate your own collection 
                            and easily find them later.
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
