import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LikeButton from '@/shared-components/buttons/components/LikeButton';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/ThoughtCard.css';

export default function ThoughtCard({ thoughtData, loadRepliesOfThought, setReply, onLikeAction }) {
  const [repliesLoading, setRepliesLoading] = useState(false);
  const thoughtTextWithMentions = useMemo(()=>Utils.parserUserMentions(thoughtData.thought_message), [thoughtData.thought_message]);
  const isReply = Boolean(thoughtData.thought_parent);
  const isLoading = Boolean(thoughtData.isLoading);
  const isSpecial = Boolean(thoughtData.isSpecial);
  const navigate = useNavigate();

  function navigateToUserProfile() {
    navigate(`/user/${thoughtData.thought_creator.user_username}`, {
      state: {
        from: true
      }
    });
  }

  return (
    <>
      <div className={`artwork-view-thought__container element-non-selectable ${isReply ? "reply" : ""} ${isLoading ? "read-only": ""} ${isSpecial ? "special": ""}`}>
        <UserProfileImage 
          typeOfProfile={thoughtData.thought_creator.user_type} 
          className="artwork-view-thought__user-image" 
          image={thoughtData.thought_creator.user_image?.image_id} 
          onClick={navigateToUserProfile}
        />

        <div className="artwork-view-thought__text-section">
          <Text 
            className="artwork-view-thought__small-text username dots-on-overflow" 
            paragraph 
            extraSmall 
            onClick={navigateToUserProfile}
          >
            {thoughtData.thought_creator.user_username}
            {thoughtData.thought_creator.user_type === "artist" && thoughtData.thought_creator.user_flags.suarteroad_completed && <ArtistVerifiedIcon className="artwork-view-thought__artist-verified-icon"/>}
          </Text>

          <Text className="artwork-view-thought__text" paragraph small>
            {thoughtTextWithMentions}
          </Text>

          {
            isLoading ? 
              <Text className="artwork-view-thought__small-text loading" extraSmall>
                                Publishing...
                <CustomSpinner className="artwork-view-thought__spinner" thin/>
              </Text>
              :
              <>
                <Text className="artwork-view-thought__small-text elapsed" extraSmall>
                  {Utils.elapsedTime(new Date(thoughtData.createdAt).getTime())}
                </Text>

                <Text className="artwork-view-thought__small-text reply" onClick={()=>setReply(thoughtData)} extraSmall>
                                    Reply
                </Text>

                {Boolean(thoughtData.hasReplies) && (
                  repliesLoading ?
                    <Text className="artwork-view-thought__small-text view-more" extraSmall>
                                            Loading replies...
                    </Text>
                    :
                    <Text className="artwork-view-thought__small-text view-more" onClick={()=>{setRepliesLoading(true); loadRepliesOfThought(thoughtData);}} extraSmall>
                      {
                        isReply ? 
                          `View more (${thoughtData.hasReplies.repliesLeft})`
                          : 
                          `View replies (${thoughtData.hasReplies.repliesLeft})`
                      }
                    </Text>
                )}
              </>
          }

          {!isLoading && (
            <div className="artwork-view-thought__like-section">
              <LikeButton 
                itemId={thoughtData._id}
                typeOfItem="THOUGHT"
                isLiked={thoughtData.is_liked} 
                className="artwork-view-thought__like" 
                onLikeAction={likeStatus=>onLikeAction(likeStatus, thoughtData._id)}
              />

              <span className="artwork-view-thought__like-count st-m">
                {Utils.numberParserMillionThousand(thoughtData.like_count)}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
