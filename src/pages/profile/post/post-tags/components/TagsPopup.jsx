import { useNavigate } from 'react-router-dom';

import FollowButton from "@/shared-components/buttons/components/FollowButton";
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Popup from '@/shared-components/popups/components/Popup';
import Text from '@/shared-components/text/components/Text';

import './styles/TagsPopup.css';

export default function TagsPopup({ open, close, postTags }) {
  const navigate = useNavigate();

  return (
    <>
      <Popup 
        open={open} 
        close={close}
        title="Tagged" 
        className="display-post-tags__popup" 
        blur
      >
        <div className="display-post-tags__tags-list remove-scrollbar">
          {postTags.map(tag => (
            <div 
              key={tag._id}
              className="display-post-tags-popup__tag-container" 
              onClick={() => (
                navigate(`/user/${tag.user_username}`, {
                  state: {
                    from: true
                  }
                })
              )}
            >
              <div className="display-post-tags-popup__tag-user-info">
                <UserProfileImage 
                  image={tag.user_image?.image_id} 
                  typeOfProfile={tag.user_type} 
                  className="display-post-tags-popup__tag-user-image"
                />

                {
                  tag.user_type !== "collector" ? 
                    <div className="display-post-tags-popup__tag-name-block">
                      <Text className="display-post-tags-popup__tag-main-text" paragraph small>
                        {tag.user_name}
                        {(tag.user_type === "artist" && tag.user_flags.suarteroad_completed) && <ArtistVerifiedIcon className="display-post-tags-popup__suarteroad-completed-icon"/>}
                      </Text>

                      <Text className="display-post-tags-popup__tag-secondary-text" paragraph extraSmall>
                                                @{tag.user_username}
                      </Text>
                    </div>
                    :
                    <Text className="display-post-tags-popup__tag-main-text" paragraph small>
                      {tag.user_username}
                    </Text>
                }
              </div>

              <FollowButton 
                userId={tag._id} 
                imFollowing={tag.im_following} 
                isFollowingMe={tag.is_following_me} 
                extraSmall
              />
            </div>
          ))}
        </div>
      </Popup>
    </>
  );
}
