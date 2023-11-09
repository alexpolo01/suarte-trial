import { Helmet } from 'react-helmet';
import { Navigate,Outlet, useParams } from 'react-router-dom';

import config from '@/config';
import ProfileDataContext from '@/context/ProfileDataContext';
import useCache from '@/hooks/useCache';
import useStateHandler from '@/hooks/useStateHandler';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
import PullToRefresh from '@/shared-components/common/components/PullToRefresh';
import CustomSpinner from '@/shared-components/loaders/components/CustomSpinner';
import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';

import DisplayDescription from './components/DisplayDescription';
import DisplayLocation from './components/DisplayLocation';
import DisplayNameUsername from './components/DisplayNameUsername';
import ProfileButton from './components/ProfileButton';
import ProfileNavigation from './components/ProfileNavigation';
import UserNotFound from './components/UserNotFound';
import ProfileStats from './profile-stats';
import ProfileTopButtons from './profile-top-buttons';

import './index.css';

function UserProfileRenderView({ profileUsername, internal }) {
  const { cacheHandler } = useStateHandler();
  const { fetchData, setFetchData, refetch } = useCache(`${profileUsername}_profile_info`, `${config.apis.api.url}/user/username/${profileUsername}`, {
    type: "@cache/dynamic",
    injectToken: true
  });

  if(!fetchData) {
    return (
      <div className="user-profile__profile-loading-page">
        <CustomSpinner className="user-profile__profile-loading-page-spinner" thin/>
      </div>
    );
  } else if(fetchData.error_type === "NOT_FOUND") {
    return (
      <UserNotFound/>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>{(fetchData.user_name || 'Art traveller') + ` - Suarte`}</title>
          <meta name="description" content={`Visit the Profile of ${fetchData.user_name}: ${fetchData.user_profile_info.user_description}`} />
        </Helmet>
        <ProfileDataContext.Provider value={{ profileData: fetchData, setProfileData: setFetchData, internal }}>
          <AppNavigationPage>
            <PullToRefresh 
              className="user-profile-pull-to-refresh-background" 
              screenThreshold={160} 
              type="DRAGGABLE"
              onRefresh={()=>{
                cacheHandler.triggerAction(`${fetchData._id}_REFRESH`); 
                return refetch();
              }} 
            >
              <div className="user-profile__wrap-outter">
                <div className="user-profile__wrap">
                  <div className="user-profile__main-content">
                    <UserProfileImage 
                      image={fetchData.user_image?.image_id} 
                      typeOfProfile={fetchData.user_type} 
                      className="user-profile__user-image"
                      style={{ viewTransitionName: `user_${fetchData._id}_animation` }}
                    />
                                        
                    <DisplayNameUsername fetchData={fetchData}/>

                    <DisplayDescription fetchData={fetchData}/>
                                        
                    <DisplayLocation userLocation={fetchData.user_profile_info.user_location}/>

                    <ProfileStats fetchData={fetchData}/>

                    <ProfileButton 
                      fetchData={fetchData} 
                      setFetchData={setFetchData} 
                      internal={internal} 
                    />
                                        
                    <ProfileTopButtons fetchData={fetchData} internal={internal}/>
                  </div>
    
                  <ProfileNavigation fetchData={fetchData}/>
    
                  <div className="user-profile__outlet-container">
                    <Outlet/> 
                  </div>
                </div>
              </div>
            </PullToRefresh>
          </AppNavigationPage>
        </ProfileDataContext.Provider>
      </>
    );
  }
}

export default function UserProfile({ internal=false }) {
  const { state } = useStateHandler();
  const { username } = useParams();
  const profileUsername = internal ? state.user_session.user_username : username;

  /** Prevents a user from seeing an external view of his own profile */
  if(!internal && state.user_session?.user_username === username) { 
    return (
      <Navigate to="/profile" replace/>
    );
  } else {
    /** Makes the component refresh on username change*/
    return (
      <UserProfileRenderView 
        key={profileUsername} 
        profileUsername={profileUsername} 
        internal={internal}
      />
    );
  }
}
