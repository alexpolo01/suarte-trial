import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import ArtlistDataContext from '@/context/ArtlistDataContext';
import ArtlistImage from '@/shared-components/cards/components/ArtlistImage';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import ArtworkIcon from '@/shared-components/icons/components/user-profile/ArtworkIcon';
import Text from '@/shared-components/text/components/Text';
import Utils from '@/utils';

import './styles/ArtlistHeader.css';

export default function ArtlistHeader() {
  const { artlistData } = useContext(ArtlistDataContext);
  const navigate = useNavigate();
    
  return (
    <>
      <div className="artlist-header__container">
        <ArtlistImage className="artlist-header__artlist-image" image={artlistData.artlist_image?.image_id} style={{ viewTransitionName: `artlist_${artlistData._id}_animation` }}/>

        <div className="artlist-header__info-section">
          <h1 className="artlist-header__artlist-title">
            {artlistData.artlist_title}
          </h1>

          <div className="artlist-header__creator-info" onClick={()=>navigate(`/user/${artlistData.artlist_creator.user_username}`, { state: { from: true } })}>
            <UserProfileImage 
              className="artlist-header__creator-image" 
              typeOfProfile={artlistData.artlist_creator.user_type} 
              image={artlistData.artlist_creator.user_image?.image_id}
            />

            <Text className="artlist-header__creator-username" medium paragraph>
              {artlistData.artlist_creator.user_username}
            </Text>
          </div>

          {Boolean(artlistData.artlist_description) && (
            <Text className="artlist-header__artlist-description" medium paragraph justify>
              {artlistData.artlist_description}
            </Text>
          )}

          <div className="artlist-header__artlist-stats">
            <ArtworkIcon className="artlist-header__artwork-icon"/>

            <Text className="artlist-header__artlist-stats-text" small>
              {Utils.numberParserMillionThousand(artlistData.artlist_artworks.length)} artworks
            </Text>

            <div className="artlist-header__artlist-stats-separator"/>

            <Text className="artlist-header__artlist-stats-text" small>
              {Utils.numberParserMillionThousand(artlistData.artlist_likes)} likes
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
