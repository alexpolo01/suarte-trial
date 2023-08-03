import RemoveButton from '@/shared-components/buttons/components/RemoveButton';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/PostTag.css';

export default function PostTag({ removeTag, tag }) {
  return (
    <>
      <div className="post-removable-tag__container">
        <RemoveButton className="post-removable-tag__button" onClick={()=>removeTag(tag)}/>

        <UserProfileImage 
          className="post-removable-tag__user-image" 
          typeOfProfile={tag.user_type} 
          image={tag.user_image?.image_id}
        />

        <div className="post-removable-tag__user-info">
          {
            tag.user_name ? 
              <>
                <Text className="post-tag__search-suggestion-main-text" paragraph extraSmall>
                  {tag.user_name}
                  {(tag.user_type === "artist" && tag.user_flags.suarteroad_completed) && <ArtistVerifiedIcon className="post-tag__search-suggestion-artist-check"/>}
                </Text>

                <Text className="post-tag__search-suggestion-small-text" paragraph extraSmallPlus>
                                    @{tag.user_username}
                </Text>
              </>
              :
              <Text className="post-tag__search-suggestion-main-text" paragraph extraSmall>
                {tag.user_username}
              </Text>
          }
        </div>
      </div>
    </>
  );
}
