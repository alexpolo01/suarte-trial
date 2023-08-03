import { NavLink, useLocation } from 'react-router-dom';

import RippleButton from '@/shared-components/buttons/components/RippleButton';
import ArtistIcon from '@/shared-components/icons/components/user-profile/ArtistIcon';
import ArtlistIcon from '@/shared-components/icons/components/user-profile/ArtlistIcon';
import ArtworkIcon from '@/shared-components/icons/components/user-profile/ArtworkIcon';
import BoardIcon from '@/shared-components/icons/components/user-profile/BoardIcon';
import CollectionIcon from '@/shared-components/icons/components/user-profile/CollectionIcon';
import CommunityIcon from '@/shared-components/icons/components/user-profile/CommunityIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/ProfileNavigation.css';

function ProfileNavigationTab({ to, tabName, tabIcon }) {
  const location = useLocation();

  return (
    <>
      <RippleButton className="profile-navigation__tab">
        <NavLink 
          className={({ isActive }) => isActive ? "profile-navigation__tab-link active" : "profile-navigation__tab-link"} 
          to={to} 
          aria-label={tabName} 
          preventScrollReset 
          state={location.state}
          replace
        >
          <div>
            {tabIcon}

            <Text className="profile-navigation__tab-name" paragraph extraSmall>
              {tabName}
            </Text>
          </div>
        </NavLink>
      </RippleButton>
    </>
  );
}

export default function ProfileNavigation({ fetchData }) {
  if(fetchData.user_type === "gallery") {
    return (
      <div className="profile-navigation__container">
        <ProfileNavigationTab
          to="artworks"
          tabName="Artworks"
          tabIcon={<ArtworkIcon className="profile-navigation__tab-icon artworks"/>}
        />

        <ProfileNavigationTab
          to="artists"
          tabName="Artists"
          tabIcon={<ArtistIcon className="profile-navigation__tab-icon artists"/>}
        />

        <ProfileNavigationTab
          to="artlists"
          tabName="Artlists"
          tabIcon={<ArtlistIcon className="profile-navigation__tab-icon artlists"/>}
        />

        <ProfileNavigationTab
          to="board"
          tabName="Board"
          tabIcon={<BoardIcon className="profile-navigation__tab-icon board"/>}
        />
      </div>
    );
  } else if(fetchData.user_type === "artist") {
    return (
      <div className="profile-navigation__container">
        <ProfileNavigationTab
          to="artworks"
          tabName="Artworks"
          tabIcon={<ArtworkIcon className="profile-navigation__tab-icon artworks"/>}
        />

        <ProfileNavigationTab
          to="collection"
          tabName="Collection"
          tabIcon={<CollectionIcon className="profile-navigation__tab-icon collection"/>}
        />

        <ProfileNavigationTab
          to="community"
          tabName="Community"
          tabIcon={<CommunityIcon className="profile-navigation__tab-icon community"/>}
        />

        <ProfileNavigationTab
          to="artlists"
          tabName="Artlists"
          tabIcon={<ArtlistIcon className="profile-navigation__tab-icon artlists"/>}
        />
      </div>
    );
  } else {
    return (
      <div className="profile-navigation__container">
        <ProfileNavigationTab
          to="collection"
          tabName="Collection"
          tabIcon={<CollectionIcon className="profile-navigation__tab-icon collection"/>}
        />

        <ProfileNavigationTab
          to="community"
          tabName="Community"
          tabIcon={<CommunityIcon className="profile-navigation__tab-icon community"/>}
        />

        <ProfileNavigationTab
          to="artlists"
          tabName="Artlists"
          tabIcon={<ArtlistIcon className="profile-navigation__tab-icon artlists"/>}
        />
      </div>
    );
  }
}
