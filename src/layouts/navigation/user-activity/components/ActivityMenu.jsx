import { NavLink } from 'react-router-dom';

import ThoughtIcon from '@/shared-components/icons/components/artwork/ThoughtIcon';
import SavedArtworksIcon from '@/shared-components/icons/components/navigation/SavedArtworksIcon';
import ArtlistIcon from '@/shared-components/icons/components/user-profile/ArtlistIcon';
import ArtworkIcon from '@/shared-components/icons/components/user-profile/ArtworkIcon';
import BoardIcon from '@/shared-components/icons/components/user-profile/BoardIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/ActivityMenu.css';

function ActivityMenuNavLink({ to, Icon, iconClassName, text, replace }) {
  return (
    <>
      <NavLink className={({ isActive }) =>`activity-menu__menu-link${isActive ? " active" : ""}`} to={to} state={{ from: true }} replace={replace}>
        <div className="activity-menu__menu-link-icon-container">
          <Icon className={`activity-menu__menu-link-icon ${iconClassName}`}/>
        </div>
        <Text className="activity-menu__menu-link-text" medium>{text}</Text>
      </NavLink>
    </>
  );
}

export default function ActivityMenu({ replace=false }) {
  return (
    <>
      <div className="activity-menu__container">
        <ActivityMenuNavLink 
          to="/profile/activity/liked-artworks" 
          iconClassName="liked-artworks" 
          text="Liked artworks" 
          Icon={ArtworkIcon}
          replace={replace}
        />

        <ActivityMenuNavLink 
          to="/profile/activity/liked-thoughts" 
          iconClassName="liked-thoughts" 
          text="Liked thoughts" 
          Icon={ThoughtIcon}
          replace={replace}
        />

        <ActivityMenuNavLink 
          to="/profile/activity/liked-artlists" 
          iconClassName="liked-artlists"
          text="Liked artlists" 
          Icon={ArtlistIcon}
          replace={replace}
        />

        <ActivityMenuNavLink 
          to="/profile/activity/liked-posts" 
          iconClassName="liked-posts" 
          text="Liked posts" 
          Icon={BoardIcon}
          replace={replace}
        />

        <ActivityMenuNavLink 
          to="/profile/activity/saved-artworks" 
          iconClassName="saved-artworks" 
          text="Saved artworks" 
          Icon={SavedArtworksIcon}
          replace={replace}
        />
      </div>
    </>
  );
}
