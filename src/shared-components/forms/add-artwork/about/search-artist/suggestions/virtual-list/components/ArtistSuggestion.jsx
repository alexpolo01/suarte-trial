import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/ArtistSuggestion.css';

export default function ArtistSuggestion({ artistData, currentArtist, selectArtist }) {
  if(artistData.gallery_artist) {
    return (
      <>
        <div className={`add-artwork-artist-card__container ${artistData._id === currentArtist?._id ? "selected" : ""}`} onClick={()=>selectArtist(artistData)}>
          <UserProfileImage 
            image={artistData.user_image?.image_id} 
            typeOfProfile="artist" 
            className="add-artwork-artist-card__artist-image"
          />
    
          <div className="add-artwork-artist-card__text-container">
            <Text className="add-artwork-artist-card__text dots-on-overflow name" small>
              {artistData.user_name} 
              {artistData.user_flags.suarteroad_completed && <ArtistVerifiedIcon className="add-artwork-artist-card__text-verified-icon"/>}
            </Text>
                        
            <Text className="add-artwork-artist-card__text dots-on-overflow" small>
                            @{artistData.user_username}
            </Text>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={`add-artwork-artist-card__container ${artistData._id === currentArtist?._id ? "selected" : ""}`} onClick={()=>selectArtist(artistData)}>
          <div className="add-artwork-artist-card__text-container">
            <Text className="add-artwork-artist-card__text dots-on-overflow name" small>
              {artistData.artist_name} 
            </Text>
                        
            <Text className="add-artwork-artist-card__text dots-on-overflow" small>
              {artistData.artist_nationality}, {artistData.artist_birth}
              {Boolean(artistData.artist_death) && `-${artistData.artist_death}`}
            </Text>
          </div>
        </div>
      </>
    );
  }
}
