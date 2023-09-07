import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import config from '@/config';
import ProfileDataContext from '@/context/ProfileDataContext';
import useCache from '@/hooks/useCache';
import useQuery from '@/hooks/useQuery';
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

export default function ProfileNavigation({ fetchData }) {
  const { profileData, internal } = useContext(ProfileDataContext);
  const { fetchData: artistsFetchData } = useCache(`${profileData._id}_artists`, `${config.apis.api.url}/gallery/${profileData._id}/artists`, {
    injectToken: true,
    invalidateWhen: internal ? 
      ["BUY_ARTWORK", "EDIT_ARTWORK", "DELETE_ARTWORK", "NEW_ARTIST", `${profileData._id}_REFRESH`] 
      : 
      [`${profileData._id}_REFRESH`]
  });

  const { queryData: artworksQueryData } = useQuery(`${profileData._id}_artworks`, `${config.apis.api.url}/artworks/${profileData._id}`, "", {
    invalidateWhen: internal ? 
      ["BUY_ARTWORK", "EDIT_ARTWORK", "DELETE_ARTWORK", `${profileData._id}_REFRESH`] 
      : 
      [`${profileData._id}_REFRESH`]  
  });

  const { fetchData: artlistsFetchData } = useCache(`${profileData._id}_artlists`, `${config.apis.api.url}/artlist/user/${profileData._id}`, {
    injectToken: true,
    invalidateWhen: internal ? 
      ["NEW_ARTLIST", "EDIT_ARTLIST", "DELETE_ARTLIST", "ADD_TO_ARTLIST", "ADD_TO_ARTLIST_FROM_ARTWORK", "REMOVE_FROM_ARTLIST", `${profileData._id}_REFRESH`] 
      : 
      [`${profileData._id}_REFRESH`]
  });

  const { fetchData: boardFetchData } = useCache(`${profileData._id}_posts`, `${config.apis.api.url}/posts/gallery/${profileData._id}`, {
    injectToken: true,
    invalidateWhen: internal ? 
      ["SUBMIT_POST", "DELETE_POST", `${profileData._id}_REFRESH`] 
      : 
      [`${profileData._id}_REFRESH`]
  });

  const { fetchData: collectionFetchData } = useCache(`${profileData._id}_collection`, `${config.apis.api.url}/collection/${profileData._id}`, {
    injectToken: true,
    includeSearchQueries: { visibility: "private" }, 
    invalidateWhen: internal ? 
      ["BUY_ARTWORK", "EDIT_COLLECTION", `${profileData._id}_REFRESH`] 
      : 
      [`${profileData._id}_REFRESH`]
  });

  const { fetchData: thoughtsFetchData } = useCache(`${profileData._id}_thoughts`, `${config.apis.api.url}/thought/user/${profileData._id}`, {
    injectToken: true,
    invalidateWhen: internal ? 
      ["NEW_THOUGHT", "DELETE_THOUGHT", `${profileData._id}_REFRESH`] 
      : 
      [`${profileData._id}_REFRESH`]
  });

  const { fetchData: ratingFetchData } = useCache(`${profileData._id}_ratings`, `${config.apis.api.url}/rating/user/${profileData._id}`, {
    injectToken: true,
    invalidateWhen: ["NEW_RATING", `${profileData._id}_REFRESH`]
  });

  console.log("artists:", artistsFetchData, "artworks:", artworksQueryData, "artlists:", artlistsFetchData, "board:", boardFetchData, "collection:", collectionFetchData, "thoughts:", thoughtsFetchData, "rating:", ratingFetchData);

  if(fetchData.user_type === "gallery") {
    let tempTabCount = 0;
    if ((internal || (artworksQueryData && artworksQueryData?.data.data.length > 0))) tempTabCount ++;
    if ((internal || (artistsFetchData && artistsFetchData.data.length > 0))) tempTabCount ++;
    if ((internal || (artlistsFetchData && artlistsFetchData.data.length > 0))) tempTabCount ++;
    if ((internal || (boardFetchData && boardFetchData.data.length > 0))) tempTabCount ++;

    return (
      <div className="profile-navigation__container">
        {(internal || (artworksQueryData && artworksQueryData?.data.data.length > 0)) && <ProfileNavigationTab
          to="artworks"
          tabName="Artworks"
          tabIcon={<ArtworkIcon className="profile-navigation__tab-icon artworks"/>}
          tabCount={tempTabCount}
        />}

        {(internal || (artistsFetchData && artistsFetchData.data.length > 0)) && <ProfileNavigationTab
          to="artists"
          tabName="Artists"
          tabIcon={<ArtistIcon className="profile-navigation__tab-icon artists"/>}
          tabCount={tempTabCount}
        />}

        {(internal || (artlistsFetchData && artlistsFetchData.data.length > 0)) && <ProfileNavigationTab
          to="artlists"
          tabName="Artlists"
          tabIcon={<ArtlistIcon className="profile-navigation__tab-icon artlists"/>}
          tabCount={tempTabCount}
        />}

        {(internal || (boardFetchData && boardFetchData.data.length > 0)) && <ProfileNavigationTab
          to="board"
          tabName="Board"
          tabIcon={<BoardIcon className="profile-navigation__tab-icon board"/>}
          tabCount={tempTabCount}
        />}
      </div>
    );
  } else if(fetchData.user_type === "artist") {
    let tempTabCount = 0;
    if ((internal || (artworksQueryData && artworksQueryData.data.data.length > 0))) tempTabCount ++;
    if ((internal || (collectionFetchData && collectionFetchData.data.length > 0))) tempTabCount ++;
    if ((internal || (thoughtsFetchData && ratingFetchData) && (thoughtsFetchData.data.length > 0 || ratingFetchData.data.length > 0))) tempTabCount ++;
    if ((internal || (artlistsFetchData && artlistsFetchData.data.length > 0))) tempTabCount ++;

    return (
      <div className="profile-navigation__container">
        {(internal || (artworksQueryData && artworksQueryData.data.data.length > 0)) && <ProfileNavigationTab
          to="artworks"
          tabName="Artworks"
          tabIcon={<ArtworkIcon className="profile-navigation__tab-icon artworks"/>}
          tabCount={tempTabCount}
        />}

        {(internal || (collectionFetchData && collectionFetchData.data.length > 0)) && <ProfileNavigationTab
          to="collection"
          tabName="Collection"
          tabIcon={<CollectionIcon className="profile-navigation__tab-icon collection"/>}
          tabCount={tempTabCount}
        />}

        {(internal || (thoughtsFetchData && ratingFetchData) && (thoughtsFetchData.data.length > 0 || ratingFetchData.data.length > 0)) && <ProfileNavigationTab
          to="community"
          tabName="Community"
          tabIcon={<CommunityIcon className="profile-navigation__tab-icon community"/>}
          tabCount={tempTabCount}
        />}

        {(internal || (artlistsFetchData && artlistsFetchData.data.length > 0)) && <ProfileNavigationTab
          to="artlists"
          tabName="Artlists"
          tabIcon={<ArtlistIcon className="profile-navigation__tab-icon artlists"/>}
          tabCount={tempTabCount}
        />}
      </div>
    );
  } else {
    let tempTabCount = 0;
    if ((internal || (collectionFetchData && collectionFetchData?.data.length > 0))) tempTabCount ++;
    if ((internal || (thoughtsFetchData && ratingFetchData)&&(thoughtsFetchData?.data.length > 0 || ratingFetchData?.data.length> 0)) || ratingFetchData?.data.length > 0) tempTabCount ++;
    if ((internal || (artlistsFetchData && artlistsFetchData?.data.length > 0))) tempTabCount ++;

    return (
      <div className="profile-navigation__container">
        {(internal || (collectionFetchData && collectionFetchData.data.length > 0)) && <ProfileNavigationTab
          to="collection"
          tabName="Collection"
          tabIcon={<CollectionIcon className="profile-navigation__tab-icon collection"/>}
          tabCount={tempTabCount}
        />}

        {(internal || (thoughtsFetchData && ratingFetchData)&&(thoughtsFetchData.data.length > 0 || ratingFetchData.data.length> 0)) && <ProfileNavigationTab
          to="community"
          tabName="Community"
          tabIcon={<CommunityIcon className="profile-navigation__tab-icon community"/>}
          tabCount={tempTabCount}
        />}

        {(internal || (artlistsFetchData && artlistsFetchData.data.length > 0)) && <ProfileNavigationTab
          to="artlists"
          tabName="Artlists"
          tabIcon={<ArtlistIcon className="profile-navigation__tab-icon artlists"/>}
          tabCount={tempTabCount}
        />}
      </div>
    );
  }
}
