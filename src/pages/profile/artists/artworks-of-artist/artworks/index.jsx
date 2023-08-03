import { useNavigate } from 'react-router-dom';

import config from '@/config';
import useCache from '@/hooks/useCache';
import useNavigateToArtwork from '@/hooks/useNavigateToArtwork';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import ArtistArtworksHeader from '../../components/ArtistArtworksHeader';

import VirtualList from './components/VirtualList';

import './index.css';

export default function Artworks({ artist, profileData, internal }) {
  const { loading, fetchData, loadMoreData } = useCache(`artworks_of_${artist._id}_in_${profileData._id}`, `${config.apis.api.url}/gallery/${profileData._id}/artist/${artist._id}/artworks`, {
    includeSearchQueries: { artist_type: artist.gallery_artist ? "artist" : "gallery_artist" },
    invalidateWhen: internal ? 
      ["EDIT_ARTWORK", "DELETE_ARTWORK", "NEW_ARTIST", `${profileData._id}_REFRESH`]
      : 
      [`${profileData._id}_REFRESH`]
  });
  const navigateToArtwork = useNavigateToArtwork(
    `artworks_of_${artist._id}_in_${profileData._id}`, 
    fetchData, 
    `/gallery/${profileData._id}/artist/${artist._id}/artworks?artist_type=${artist.gallery_artist ? "artist" : "gallery_artist"}`
  );
  const navigate = useNavigate();

  function navigateToProfileIfPossible() {
    if(artist.gallery_artist) {
      navigate(`/user/${artist.user_username}`, { state: { from: true } });
    }
  }

  return (
    <>
      <div className={`artist-artworks-content__header ${artist.gallery_artist ? "click" : ""}`} onClick={navigateToProfileIfPossible}>
        <ArtistArtworksHeader artistData={artist} preview/>
      </div>

      <Text className="artist-artworks-content__artwork-count" paragraph extraSmall>
        {artist.artwork_count} artworks
      </Text>

      {
        loading ?
          <CustomSpinner className="artist-artworks-content__content-spinner" thin/>
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
