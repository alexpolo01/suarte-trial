import { useContext, useState } from 'react';

import config from '@/config';
import ProfileDataContext from '@/context/ProfileDataContext';
import useCache from '@/hooks/useCache';
import CreateArtist from '@/shared-components/forms/create-artist';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import ArtworksOfArtist from './artworks-of-artist';
import VirtualList from './virtual-list';

import './index.css';

export default function ProfileArtists() {
  const { profileData, internal } = useContext(ProfileDataContext);
  const { loading, fetchData, setFetchData, loadMoreData } = useCache(`${profileData._id}_artists`, `${config.apis.api.url}/gallery/${profileData._id}/artists`, {
    injectToken: true,
    invalidateWhen: internal ? 
      ["BUY_ARTWORK", "EDIT_ARTWORK", "DELETE_ARTWORK", "NEW_ARTIST", `${profileData._id}_REFRESH`] 
      : 
      [`${profileData._id}_REFRESH`]
  });
  const [artistToEdit, setArtistToEdit] = useState(null);
  const [artistToOpen, setArtistToOpen] = useState(null);

  function onEditGalleryArtist(newGalleryArist) {
    setFetchData({
      ...fetchData,
      data: fetchData.data.map(artist => {
        if(artist._id === newGalleryArist._id) {
          return {
            ...newGalleryArist,
            artwork_count: artist.artwork_count,
            artworks: artist.artworks /** These last 2 values dont belong to artist scheme, that's why we need to add them manually */
          };
        } else {
          return artist;
        }
      })
    });
  }

  return (
    <>
      {
        loading ?   
          <CustomSpinner className="profile-artists__loader-spinner" thin/>
          : fetchData.data.length === 0 ?
            <Text className="user-profile__artists-empty-view" paragraph small>
              {
                internal ? 
                  "Your artists will build this view."
                  :
                  "No artists available at the moment."
              }
            </Text>
            :
            <VirtualList 
              items={fetchData} 
              onLoadMore={loadMoreData} 
              openArtistPreview={setArtistToOpen}
              openEditArtist={setArtistToEdit}
            />
      } 

      <ArtworksOfArtist
        open={Boolean(artistToOpen)}
        close={()=>setArtistToOpen(null)}
        artist={artistToOpen}
        profileData={profileData}
        internal={internal}
      />

      <CreateArtist
        open={Boolean(artistToEdit)}
        close={()=>setArtistToEdit(null)}
        onCreate={onEditGalleryArtist}
        artistData={artistToEdit}
        editMode
      />
    </>
  );
}
