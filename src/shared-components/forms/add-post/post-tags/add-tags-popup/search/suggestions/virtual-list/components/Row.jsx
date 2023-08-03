import { useMemo } from 'react';

import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/Row.css';

export default function Row({ data, addTag, formState }) {
  const isAdded = useMemo(()=>(
    formState.post_tags.find(postTag => postTag._id === data._id)
  ), [formState.post_tags]);

  return (
    <>
      <div className={`post-tag__search-suggestion ${isAdded ? "added" : ""}`} onMouseDown={!isAdded ? ()=>addTag(data) : null}>
        <UserProfileImage 
          className="post-tag__search-suggestion-user-image" 
          typeOfProfile={data.user_type} 
          image={data.user_image?.image_id}
        />
                
        <div className="post-tag__search-suggestion-user-info">
          {
            data.user_type !== "collector" ?
              <>
                <Text className="post-tag__search-suggestion-main-text" paragraph small>
                  {data.user_name}
                  {(data.user_type === "artist" && data.user_flags.suarteroad_completed) && <ArtistVerifiedIcon className="post-tag__search-suggestion-artist-check"/>}
                </Text>

                <Text className="post-tag__search-suggestion-small-text" paragraph extraSmall>
                                    @{data.user_username}
                </Text>
              </>
              :
              <Text className="post-tag__search-suggestion-main-text" paragraph small>
                {data.user_username}
              </Text>
          }
        </div>
      </div>
    </>
  );
}
