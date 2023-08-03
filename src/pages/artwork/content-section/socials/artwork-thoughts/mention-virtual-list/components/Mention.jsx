import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/Mention.css';

export default function Mention({ mentionData, selectMention }) {
  return (
    <>
      <div className="thought-mention-result__container element-non-selectable" onClick={selectMention}>
        <UserProfileImage 
          className="thought-mention-result__image" 
          typeOfProfile={mentionData.user_type} 
          image={mentionData.user_image?.image_id}
        />

        <div className="thought-mention-result__text-container">
          {
            mentionData.user_type !== "collector" ?
              <>
                <Text className="thought-mention-result__text dots-on-overflow name" paragraph small>
                  {mentionData.user_name}
                  {mentionData.user_type === "artist" && mentionData.user_flags.suarteroad_completed && <ArtistVerifiedIcon className="thought-mention-result__verified-icon"/>}
                </Text>

                <Text className="thought-mention-result__text dots-on-overflow" paragraph extraSmall>
                                    @{mentionData.user_username}
                </Text>
              </>
              :
              <Text className="thought-mention-result__text dots-on-overflow" paragraph extraSmall>
                {mentionData.user_username}
              </Text>
          } 
        </div>
      </div>
    </>
  );
}
