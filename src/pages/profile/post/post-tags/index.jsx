import { useState } from 'react';

import LikeButton from '@/shared-components/buttons/components/LikeButton';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import Text from '@/shared-components/text/components/Text';

import TagsPopup from './components/TagsPopup';

import './index.css';

export default function PostTags({ postTags, fetchData }) {
  const [openTagsPopup, setOpenTagsPopup] = useState(false);

  return (
    <>
      <div className={`display-post-tags__container ${postTags.length === 0 ? "no-tags" : ""}`}>
        {postTags.length > 0 && (
          <div className="display-post-tags__tags" onClick={()=>setOpenTagsPopup(true)}>
            <UserProfileImage 
              image={postTags[0].user_image?.image_id} 
              typeOfProfile={postTags[0].user_type} 
              className="display-post-tags__preview-image first"
            />

            {postTags.length > 1 && (
              <UserProfileImage 
                image={postTags[1].user_image?.image_id} 
                typeOfProfile={postTags[1].user_type}
                className="display-post-tags__preview-image second"
              />
            )}

            {postTags.length > 2 && (
              <UserProfileImage 
                image={postTags[2].user_image?.image_id} 
                typeOfProfile={postTags[2].user_type} 
                className="display-post-tags__preview-image third"
              />
            )}

            <Text className="display-post-tags__tags-text" paragraph extraSmall>
              {postTags[0].user_username}{" "} 
              {postTags.length > 1 && (
                <span>
                                    and {postTags.length-1} more
                </span>
              )}
            </Text>
          </div>
        )}

        <LikeButton 
          itemId={fetchData._id}
          typeOfItem="POST"
          isLiked={fetchData.is_liked} 
          className="display-post-tags__like" 
        />
      </div>

      <TagsPopup
        open={openTagsPopup}
        close={()=>setOpenTagsPopup(false)}
        postTags={postTags}
      />
    </>
  );
}
