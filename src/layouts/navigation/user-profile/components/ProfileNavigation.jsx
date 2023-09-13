import { useContext, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import config from '@/config';
import ProfileDataContext from '@/context/ProfileDataContext';
import useQuery from '@/hooks/useQuery';
// import useCache from '@/hooks/useCache';
import RippleButton from '@/shared-components/buttons/components/RippleButton';
import ArtistIcon from '@/shared-components/icons/components/user-profile/ArtistIcon';
import ArtlistIcon from '@/shared-components/icons/components/user-profile/ArtlistIcon';
import ArtworkIcon from '@/shared-components/icons/components/user-profile/ArtworkIcon';
import BoardIcon from '@/shared-components/icons/components/user-profile/BoardIcon';
import CollectionIcon from '@/shared-components/icons/components/user-profile/CollectionIcon';
import CommunityIcon from '@/shared-components/icons/components/user-profile/CommunityIcon';
import Text from '@/shared-components/text/components/Text';

import './styles/ProfileNavigation.css';

function ProfileNavigationTab({ to, tabName, tabIcon, tabCount }) {
  const location = useLocation();

  return (
    <>
      <RippleButton className={`profile-navigation__tab ${tabCount === 1 ? "profile-navigation__one-tab-link": ""}`}>
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

export function GalleryProfileNavigation({ userProfileInfo, internal }) {
  const navigate = useNavigate();

  const tempTabCount = [
    userProfileInfo.data.artworks,
    userProfileInfo.data.posts,
    userProfileInfo.data.artlists,
    userProfileInfo.data.artists
  ].reduce((count, value) => count + (value ? 1 : 0), 0);

  useEffect(() => {
    let redirectUrl = "artworks";
    if (userProfileInfo && userProfileInfo.data.artworks) redirectUrl = "artworks";
    else if (userProfileInfo && userProfileInfo.data.posts) redirectUrl = "board";
    else if (userProfileInfo && userProfileInfo.data.artlists) redirectUrl = "artlists";
    else if (userProfileInfo && userProfileInfo.data.artists) redirectUrl = "artists";
    navigate(redirectUrl, { replace: true, state: location.state?.from });
  }, []);

  return (
    <div className="profile-navigation__container">
      {(internal || userProfileInfo.data.artworks) ? <ProfileNavigationTab
        to="artworks"
        tabName="Artworks"
        tabIcon={<ArtworkIcon className="profile-navigation__tab-icon artworks"/>}
        tabCount={tempTabCount}
      />: ""}

      {(internal || userProfileInfo.data.artists) ? <ProfileNavigationTab
        to="artists"
        tabName="Artists"
        tabIcon={<ArtistIcon className="profile-navigation__tab-icon artists"/>}
        tabCount={tempTabCount}
      />: ""}

      {(internal || userProfileInfo.data.artlists) ? <ProfileNavigationTab
        to="artlists"
        tabName="Artlists"
        tabIcon={<ArtlistIcon className="profile-navigation__tab-icon artlists"/>}
        tabCount={tempTabCount}
      />: ""}

      {(internal || userProfileInfo.data.posts) ? <ProfileNavigationTab
        to="board"
        tabName="Board"
        tabIcon={<BoardIcon className="profile-navigation__tab-icon board"/>}
        tabCount={tempTabCount}
      />: ""}
    </div>
  );

}

export function ArtistProfileNavigation({ userProfileInfo, internal }) {
  const navigate = useNavigate();

  const tempTabCount = [
    userProfileInfo.data.artworks,
    userProfileInfo.data.collections,
    userProfileInfo.data.thoughts || userProfileInfo.data.ratings,
    userProfileInfo.data.artlists
  ].reduce((count, value) => count + (value ? 1 : 0), 0);

  useEffect(() => {
    let redirectUrl = "artworks";
    if (userProfileInfo && userProfileInfo.data.artworks) redirectUrl = "artworks";
    else if (userProfileInfo && userProfileInfo.data.collections) redirectUrl = "collection";
    else if (userProfileInfo && (userProfileInfo.data.thoughts || userProfileInfo.data.ratings)) redirectUrl = "community";
    else if (userProfileInfo && userProfileInfo.data.artlists) redirectUrl = "artlists";
    navigate(redirectUrl, { replace: true, state: location.state?.from });
  }, []);

  return (
    <div className="profile-navigation__container">
      {(internal || userProfileInfo.data.artworks) ? <ProfileNavigationTab
        to="artworks"
        tabName="Artworks"
        tabIcon={<ArtworkIcon className="profile-navigation__tab-icon artworks"/>}
        tabCount={tempTabCount}
      />: ""}

      {(internal || userProfileInfo.data.collections) ? <ProfileNavigationTab
        to="collection"
        tabName="Collection"
        tabIcon={<CollectionIcon className="profile-navigation__tab-icon collection"/>}
        tabCount={tempTabCount}
      />: ""}

      {(internal || userProfileInfo.data.thoughts || userProfileInfo.data.ratings) ? <ProfileNavigationTab
        to="community"
        tabName="Community"
        tabIcon={<CommunityIcon className="profile-navigation__tab-icon community"/>}
        tabCount={tempTabCount}
      />: ""}

      {(internal || userProfileInfo.data.artlists) ? <ProfileNavigationTab
        to="artlists"
        tabName="Artlists"
        tabIcon={<ArtlistIcon className="profile-navigation__tab-icon artlists"/>}
        tabCount={tempTabCount}
      />: ""}
    </div>
  );
}

export function CollectorProfileNavigation({ userProfileInfo, internal }) {
  const navigate = useNavigate();
  const tempTabCount = [
    userProfileInfo.data.collections,
    userProfileInfo.data.thoughts || userProfileInfo.data.ratings,
    userProfileInfo.data.artlists
  ].reduce((count, value) => count + (value ? 1 : 0), 0);

  useEffect(() => {
    let redirectUrl = "collection";
    if (userProfileInfo && userProfileInfo.data.collections) redirectUrl = "collection";
    else if (userProfileInfo && (userProfileInfo.data.thoughts || userProfileInfo.data.ratings)) redirectUrl = "community";
    else if (userProfileInfo && userProfileInfo.data.artlists) redirectUrl = "artlists";
    navigate(redirectUrl, { replace: true, state: location.state?.from });
  }, []);

  return (
    <div className="profile-navigation__container">
      {(internal || userProfileInfo.data.collections) ? <ProfileNavigationTab
        to="collection"
        tabName="Collection"
        tabIcon={<CollectionIcon className="profile-navigation__tab-icon collection"/>}
        tabCount={tempTabCount}
      /> : ""}

      {(internal || userProfileInfo.data.thoughts || userProfileInfo.data.ratings) ? <ProfileNavigationTab
        to="community"
        tabName="Community"
        tabIcon={<CommunityIcon className="profile-navigation__tab-icon community"/>}
        tabCount={tempTabCount}
      />: ""}

      {(internal || userProfileInfo.data.artlists) ? <ProfileNavigationTab
        to="artlists"
        tabName="Artlists"
        tabIcon={<ArtlistIcon className="profile-navigation__tab-icon artlists"/>}
        tabCount={tempTabCount}
      />: ""}
    </div>
  );
}

export default function ProfileNavigation({ fetchData }) {
  const { profileData, internal } = useContext(ProfileDataContext);
  const fetchUrl = `${config.apis.api.url}/user/userProfile/${profileData._id}`;
  const query = { user_type: fetchData.user_type };
  const { queryData: userProfileInfo } = useQuery(`${profileData._id}_userProfileInfo`, fetchUrl, query, {
    expiresIn: ["10", "minutes"]
  });

  if(fetchData.user_type === "gallery") {
    return (
      <>
        {
          userProfileInfo && (
            <>
              <GalleryProfileNavigation userProfileInfo={userProfileInfo.data} internal={internal}/>
            </>
          )
        }
      </>
    );
  } else if(fetchData.user_type === "artist") {
    return (
      <>
        { userProfileInfo && (
          <>
            <ArtistProfileNavigation userProfileInfo={userProfileInfo.data} internal={internal}/>
          </>
        )
        }
      </>
    );
  } else {
    return (
      <>
        {
          userProfileInfo && (
            <>
              <CollectorProfileNavigation userProfileInfo={userProfileInfo.data} internal={internal}/>
            </>
          )
        }
      </>
    );
  }
}
