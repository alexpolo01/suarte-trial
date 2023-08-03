import { useContext } from 'react';
import { Navigate,useLocation } from 'react-router-dom';

import ProfileDataContext from '@/context/ProfileDataContext';

export default function ProfileRedirect() {
  const { profileData } = useContext(ProfileDataContext);
  const location = useLocation();

  if(profileData.user_type === "gallery" || profileData.user_type === "artist") {
    return (
      <Navigate 
        to="artworks" 
        state={{ from: location.state?.from }} 
        replace
      />
    );
  } else {
    return (
      <Navigate 
        to="collection" 
        state={{ from: location.state?.from }} 
        replace
      />
    );
  }
}
