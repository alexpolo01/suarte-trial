import { useNavigate } from 'react-router-dom';

import LikeButton from '@/shared-components/buttons/components/LikeButton';
import ArtworkImage from '@/shared-components/cards/components/ArtworkImage';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import Text from '@/shared-components/text/components/Text';
import TextHandler from '@/shared-components/text/components/TextHandler';
import Utils from '@/utils';

import './styles/CommunityThoughtCard.css';

export default function CommunityThoughtCard({ data, onLikeAction }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="community-thought-card__container" onClick={()=>navigate(`/artwork/${data.thought_artwork._id}?thought=${data._id}`, { state: { from: true } })}>
        <div className="community-thought-card__thought-content">
          <UserProfileImage 
            image={data.thought_creator.user_image?.image_id} 
            typeOfProfile={data.thought_creator.user_type} 
            className="community-thought-card__user-image"
          />

          <div className="community-thought-card__text-content">
            <Text className="community-thought-card__small-text margin" extraSmall paragraph>
              <span className="username">
                {data.thought_creator.user_username}
              </span> 

              {" "}on{" "} 

              <span className="title">
                {data.thought_artwork.artwork_about.artwork_title}
              </span>
            </Text>

            <TextHandler 
              moreControlClick={()=>{}}
              className="community-thought-card__thought-text-container" 
              maxCharactersWhenCollapsed={400} 
              controlsClassName="community-thought-card__thought-text-controls" 
              text={data.thought_message} 
              small
            />
                        
            <Text className="community-thought-card__small-text" extraSmall paragraph>
              {Utils.elapsedTime(new Date(data.createdAt).getTime())}
            </Text>
          </div>
        </div>

        <div className="community-thought-card__thought-like-image-section">
          <div className="community-thought-card__thought-like-section">
            <LikeButton 
              itemId={data._id}
              typeOfItem="THOUGHT"
              isLiked={data.is_liked} 
              className="community-thought-card__thought-like-icon" 
              onLikeAction={onLikeAction}
            />

            <Text className="community-thought-card__small-text" extraSmall paragraph>
              {Utils.numberParserMillionThousand(data.thought_likes_count)}
            </Text>
          </div>

          <ArtworkImage 
            image={data.thought_artwork.artwork_media.artwork_main_picture.image_id} 
            imageClassName="community-thought-card__thought-image" 
            imageTemplateClassName="community-thought-card__thought-image" 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/artwork/${data.thought_artwork._id}`, { state: { from: true } });
            }}
            forceSmaller={300}
          />
        </div>
      </div>
    </>
  );
}
