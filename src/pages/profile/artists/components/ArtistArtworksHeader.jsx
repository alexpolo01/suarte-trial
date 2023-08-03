import { useContext } from 'react';

import ProfileDataContext from '@/context/ProfileDataContext';
import ContinueButton from '@/shared-components/buttons/components/ContinueButton';
import FollowButton from '@/shared-components/buttons/components/FollowButton';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ForwardArrowIcon from '@/shared-components/icons/components/public/ForwardArrowIcon';
import ArtistVerifiedIcon from '@/shared-components/icons/components/user-profile/ArtistVerifiedIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/ArtistArtworksHeader.css';

export default function ArtistArtworksHeader({ artistData, openEditArtist, preview=false }) {
  const { profileData, internal } = useContext(ProfileDataContext);

  return (
    <>
      <div className="artist-artworks-header__artist-section element-non-selectable">
        <div className="artist-artworks-header__artist-info">
          {Boolean(artistData.gallery_artist) &&
                        <UserProfileImage 
                          image={artistData.user_image?.image_id} 
                          typeOfProfile="artist" 
                          className={`artist-artworks-header__artist-image ${preview ? "preview" : ""}`}
                        />
          }

          <div className="artist-artworks-header__artist-name-section">
            {
              artistData.gallery_artist ?
                <>
                  <Text className="artist-artworks-header__artist-name-text name" small paragraph>
                    {artistData.user_name}
                    {artistData.user_flags.suarteroad_completed && <ArtistVerifiedIcon className="artist-artworks-header__artist-verified-icon"/>}
                  </Text>

                  <Text className="artist-artworks-header__artist-name-text username" small paragraph>
                                        @{artistData.user_username}
                  </Text>
                </>
                :
                <>
                  <Text className="artist-artworks-header__artist-name-text name" small paragraph>
                    {artistData.artist_name}
                  </Text>

                  <Text className="artist-artworks-header__artist-name-text username" small paragraph>
                    {artistData.artist_nationality}, {artistData.artist_birth}
                    {Boolean(artistData.artist_death) && `-${artistData.artist_death}`}
                  </Text>
                </>
            }
          </div>

          {!preview && <ForwardArrowIcon className={`artist-artworks-header__artist-enter-preview${!artistData?.artist_username ? " light-offset" : ""}`}/>}
        </div>

        {
          artistData.gallery_artist ? 
            <FollowButton 
              className="artist-artworks-header__artist-follow-button" 
              userId={artistData._id} 
              imFollowing={artistData.im_following} 
              isFollowingMe={artistData.is_following_me} 
              small
            />
            : 
            ((!preview) && (internal) && (artistData.gallery._id === profileData._id)) && (
              <ContinueButton className="artist-artworks-header__edit-artist mt-s" onClick={(e)=>{e.stopPropagation(); openEditArtist(artistData);}}>
                                Edit artist
              </ContinueButton>
            )
        }
      </div>
    </>
  );
}