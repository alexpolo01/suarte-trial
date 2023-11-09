import { useContext } from 'react';
import { Navigate,useLocation } from 'react-router-dom';

import config from '@/config';
import ProfileDataContext from '@/context/ProfileDataContext';
// import useQuery from '@/hooks/useQuery';
import useCache from '@/hooks/useCache';

export default function ProfileRedirect() {
  const { profileData } = useContext(ProfileDataContext);
  const fetchUrl = `${config.apis.api.url}/user/userProfile/${profileData._id}`;

  const { fetchData: userProfileInfo } = useCache(`${profileData._id}_userProfileInfo`, fetchUrl);

  const location = useLocation();

  if(profileData.user_type === "gallery" || profileData.user_type === "artist") {
    let redirectUrl = "artworks";
    if (profileData.user_type === "gallery") {
      if (userProfileInfo && userProfileInfo.data.artworks) redirectUrl = "artworks";
      else if (userProfileInfo && userProfileInfo.data.posts) redirectUrl = "board";
      else if (userProfileInfo && userProfileInfo.data.artlists) redirectUrl = "artlists";
      else if (userProfileInfo && userProfileInfo.data.artists) redirectUrl = "artists";
    } else if (profileData.user_type === "artist") {
      if (userProfileInfo && userProfileInfo.data.artworks) redirectUrl = "artworks";
      else if (userProfileInfo && userProfileInfo.data.collections) redirectUrl = "collection";
      else if (userProfileInfo && (userProfileInfo.data.thoughts || userProfileInfo.data.data.ratings)) redirectUrl = "community";
      else if (userProfileInfo && userProfileInfo.data.artlists) redirectUrl = "artlists";
    }
    return (
      <Navigate 
        to={redirectUrl}
        state={{ from: location.state?.from }} 
        replace
      />
    );
  } else {
    let redirectUrl = "collection";
    if (userProfileInfo && userProfileInfo.data.collections) redirectUrl = "collection";
    else if (userProfileInfo && (userProfileInfo.data.thoughts || userProfileInfo.data.ratings)) redirectUrl = "community";
    else if (userProfileInfo && userProfileInfo.data.artlists) redirectUrl = "artlists";
    return (
      <Navigate 
        to={redirectUrl}
        state={{ from: location.state?.from }} 
        replace
      />
    );
  }
}
