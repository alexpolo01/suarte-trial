import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '@/config';
import ProfileDataContext from '@/context/ProfileDataContext';
import useCache from '@/hooks/useCache';
import DraftsProfileButton from '@/shared-components/buttons/components/DraftsProfileButton';
import ProfileAddButton from '@/shared-components/buttons/components/ProfileAddButton';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';

import PostsVirtualList from './components/PostsVirtualList';

import './index.css';

export default function ProfileBoard() {
  const { profileData, internal } = useContext(ProfileDataContext);
  const { loading, fetchData, loadMoreData } = useCache(`${profileData._id}_posts`, `${config.apis.api.url}/posts/gallery/${profileData._id}`, {
    injectToken: true,
    invalidateWhen: internal ? 
      ["SUBMIT_POST", "DELETE_POST", `${profileData._id}_REFRESH`] 
      : 
      [`${profileData._id}_REFRESH`]
  });
  const navigate = useNavigate();

  return (
    <>
      {
        internal && (
          <>
            <DraftsProfileButton 
              draftsCount={profileData.post_draft_count} 
              onClick={() => (
                navigate("/profile/board/drafts", {
                  replace: true, 
                  preventScrollReset: true
                })
              )}
            />

            <ProfileAddButton to="/profile/add-post"/>
          </>
        )
      }

      {
        loading ?
          <CustomSpinner className="profile-board__posts-spinner" thin/>
          : fetchData.data.length === 0 ?
            <Text className="user-profile__board-empty-view" paragraph small>
              {
                internal ? 
                  "This is your personal space. Inform the community about your upcoming exhibitions, artists, and gallery news."
                  :
                  "The gallery hasn't shared any posts yet. Stay tuned for updates and future artistic creations."
              }
            </Text>
            : 
            <PostsVirtualList items={fetchData} onLoadMore={loadMoreData}/>
      }
    </>
  );
}
