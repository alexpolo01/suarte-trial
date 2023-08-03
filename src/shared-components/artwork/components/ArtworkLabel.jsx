import { useNavigate } from 'react-router-dom';

import LikeButton from '@/shared-components/buttons/components/LikeButton';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import FillableThoughtIcon from '@/shared-components/icons/components/artwork/FillableThoughtIcon';
import RatingIcon from '@/shared-components/icons/components/artwork/RatingIcon';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/ArtworkLabel.css';

function ArtworkSocials({ artworkData, socialsData, onClickThought, onClickRating, onClickLike }) {
  return (
    <>
      <div className="artwork-label-socials__container element-non-selectable">
        <div className="artwork-label-socials__item" onClick={(e)=>{e.stopPropagation(); onClickRating();}}>
          <RatingIcon className={`artwork-label-socials__item-icon-rating ${socialsData?.published_rating ? "active" : ""}`}/>

          <Text className="artwork-label-socials__item-count" extraSmall>
            {Utils.numberParserMillionThousand(socialsData?.ratings_count)}
          </Text>
        </div>

        <div className="artwork-label-socials__item" onClick={(e)=>{e.stopPropagation(); onClickThought();}}>
          <FillableThoughtIcon className={`artwork-label-socials__item-icon-thought ${socialsData?.written_thought ? "active" : ""}`}/>

          <Text className="artwork-label-socials__item-count" extraSmall>
            {Utils.numberParserMillionThousand(socialsData?.thoughts_count)}
          </Text>
        </div>

        <div className="artwork-label-socials__item">
          <LikeButton 
            itemId={artworkData._id}
            typeOfItem="ARTWORK"
            isLiked={socialsData?.is_liked} 
            className="artwork-label-socials__item-icon-like" 
            onLikeAction={onClickLike}
          />

          <Text className="artwork-label-socials__item-count" extraSmall>
            {Utils.numberParserMillionThousand(socialsData?.likes_count)}
          </Text>
        </div>
      </div>
    </>
  );    
}

export default function ArtworkLabel({ artworkData, socialsData, onClickThought, onClickRating, onClickLike, hideSocials=false }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="artwork-label__container element-non-selectable">
        {
          artworkData.artwork_about.artwork_artist ?
            <div className="artwork-label__artist-section element-non-selectable" onClick={()=>navigate(`/user/${artworkData.artwork_about.artwork_artist.user_username}`, { state: { from: true } })}>
              <UserProfileImage 
                className="artwork-label__artist-image" 
                typeOfProfile="artist" 
                image={artworkData.artwork_about.artwork_artist.user_image?.image_id}
              />

              <div className="artwork-label__artist-name-section">
                <Text className="artwork-label__artist-name dots-on-overflow" medium paragraph>
                  {artworkData.artwork_about.artwork_artist.user_name}
                  {artworkData.artwork_about.artwork_artist.user_flags.suarteroad_completed && <ArtistVerifiedIcon className="artwork-label__suarteroad-completed"/>}
                </Text>

                <Text className="artwork-label__artist-personal dots-on-overflow" small>
                  {artworkData.artwork_about.artwork_gallery_artist.artist_nationality},{" "}
                  {artworkData.artwork_about.artwork_gallery_artist.artist_birth}
                  {Boolean(artworkData.artwork_about.artwork_gallery_artist.artist_death) && `-${artworkData.artwork_about.artwork_gallery_artist.artist_death}`}
                </Text>
              </div>
            </div>
            :
            <div className="artwork-label__artist-section element-non-selectable no-artist">
              <div className="artwork-label__artist-name-section">
                <Text className="artwork-label__artist-name dots-on-overflow" medium paragraph>
                  {artworkData.artwork_about.artwork_gallery_artist.artist_name}
                </Text>

                <Text className="artwork-label__artist-personal dots-on-overflow" small>
                  {artworkData.artwork_about.artwork_gallery_artist.artist_nationality},{" "}
                  {artworkData.artwork_about.artwork_gallery_artist.artist_birth}
                  {Boolean(artworkData.artwork_about.artwork_gallery_artist.artist_death) && `-${artworkData.artwork_about.artwork_gallery_artist.artist_death}`}
                </Text>
              </div>
            </div> 
        }

        <Text className="artwork-label__title" large paragraph>
          {artworkData.artwork_about.artwork_title}
        </Text>
                
        <Text className="artwork-label__artwork-details" small>
          {artworkData.artwork_about.artwork_medium}
        </Text>

        <Text className="artwork-label__artwork-details" small>
          {artworkData.artwork_about.artwork_size.length}{" "} 
          {artworkData.artwork_about.artwork_size.unit} x{" "} 
          {artworkData.artwork_about.artwork_size.height}{" "} 
          {artworkData.artwork_about.artwork_size.unit}
        </Text>

        <Text className="artwork-label__artwork-details" small>
          {artworkData.artwork_about.artwork_year}
        </Text>

        {!hideSocials && (
          <ArtworkSocials 
            artworkData={artworkData} 
            socialsData={socialsData}
            onClickThought={onClickThought} 
            onClickRating={onClickRating}
            onClickLike={onClickLike}
          />
        )}
      </div>
    </>
  );
}
