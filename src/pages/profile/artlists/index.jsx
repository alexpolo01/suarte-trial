import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '@/config';
import ProfileDataContext from '@/context/ProfileDataContext';
import useCache from '@/hooks/useCache';
import ProfileAddButton from '@/shared-components/buttons/components/ProfileAddButton';
import CreateNewArtlist from '@/shared-components/forms/components/CreateNewArtlist';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import ArtlistsVirtualList from './components/ArtlistsVirtualList';

import './index.css';

export default function ProfileArtlists() {
  const { profileData, internal } = useContext(ProfileDataContext);
  const { loading, fetchData, loadMoreData } = useCache(`${profileData._id}_artlists`, `${config.apis.api.url}/artlist/user/${profileData._id}`, {
    injectToken: true,
    invalidateWhen: internal ? 
      ["NEW_ARTLIST", "EDIT_ARTLIST", "DELETE_ARTLIST", "ADD_TO_ARTLIST", "ADD_TO_ARTLIST_FROM_ARTWORK", "REMOVE_FROM_ARTLIST", `${profileData._id}_REFRESH`] 
      : 
      [`${profileData._id}_REFRESH`]
  });
  const [openCreateArtlist, setOpenCreateArtlist] = useState(false);
  const navigate = useNavigate();

  function onCreateNewArtlist(newArtlist) {
    navigate(`/artlist/${newArtlist._id}`, {
      state: {
        from: true
      }
    });
  }

  return (
    <>
      {internal && (
        <>
          <ProfileAddButton onClick={()=>setOpenCreateArtlist(true)}/>

          <CreateNewArtlist 
            open={openCreateArtlist} 
            close={()=>setOpenCreateArtlist(false)} 
            onCreateNewArtlist={onCreateNewArtlist}
          />
        </>
      )}

      {
        loading ?
          <CustomSpinner className="profile-artlists__artlists-spinner" thin/>
          : fetchData.data.length === 0 ? 
            <Text className="user-profile__artlists-empty-view" paragraph small>
              {
                internal ? 
                  profileData.user_type === "gallery" ? 
                    "Curate your artworks and create artlists for collectors to feel engaged with your gallery."
                    :
                    "Be a curator! Create new artlists and share your tastes."
                  :
                  "There are no artlists available at the moment. Stay tuned for future additions."
              }                        
            </Text>
            :
            <ArtlistsVirtualList items={fetchData} onLoadMore={loadMoreData}/>
      }
    </>
  );
}
