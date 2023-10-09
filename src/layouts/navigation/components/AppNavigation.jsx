import { Link, NavLink, Outlet, useLocation,useNavigate } from 'react-router-dom';

import useProtectAction from '@/hooks/useProtectAction';
import useScreenSize from '@/hooks/useScreenSize';
import useStateHandler from '@/hooks/useStateHandler';
import UserProfileImage from '@/shared-components/cards/components/UserProfileImage';
// import NavbarHomeNavigation from './NavbarHomeNavigation';
import HomeIcon from '@/shared-components/icons/components/navigation/HomeIcon';
import SearchNavbarIcon from '@/shared-components/icons/components/navigation/SearchNavbarIcon';
import TrendingIcon from '@/shared-components/icons/components/navigation/TrendingIcon';
// import NotificationIcon from '@/shared-components/icons/components/navigation/NotificationIcon';
import SuarteName from '@/shared-components/icons/components/public/SuarteName';
import UserProfileIcon from '@/shared-components/icons/components/user-profile/UserProfileIcon';

import './styles/AppNavigation.css';

function AppNavigationProtectedOption() {
  const privateActionHandler = useProtectAction({ typeOfProtection: "USER_ACCOUNT_REQUIRED" });
  const { state } = useStateHandler();
  const navigate = useNavigate();
  const location = useLocation();

  if(state.user_session) {
    return (
      <UserProfileImage 
        className="app-navigation__nav-option-profile-image" 
        image={state.user_session.user_image?.image_id} 
        typeOfProfile={state.user_session.user_type} 
        onClick={()=>privateActionHandler(()=>navigate("/profile"))}
      />
    );
  }

  return (
    <>  
      <button 
        className={`app-navigation__nav-option profile ${location.pathname.includes("/profile") ? "active" : ""}`} 
        aria-label="Profile"
        onClick={()=>privateActionHandler(()=>navigate("/profile"))}
      >
        <UserProfileIcon/>
      </button>
    </>
  );
}

export default function AppNavigation() {
  const screenSize = useScreenSize();
  const location = useLocation();

  return (
    <>
      <div className="app-navigation__page">
        <nav className="app-navigation__container-outter">
          <div className="app-navigation__container">
            {screenSize.width > 650 && <Link className="app-navigation__suarte-name-link" to="/" aria-label="Home">
              <SuarteName/>
            </Link>}

            {/* {(screenSize.width > 650 && (location.pathname === "/" || location.pathname === "/following")) && <NavbarHomeNavigation active={location.pathname === "/" ? "discover" : "following"}/>} */}

            <div className="app-navigation__suarte-options">
              <NavLink 
                to="/" 
                className={({ isActive }) => `app-navigation__nav-option home ${isActive ? "active" : ""}`} 
                aria-label="Home" 
                end
              >
                <HomeIcon/>
              </NavLink>

              <NavLink 
                to="/search" 
                className={({ isActive }) => `app-navigation__nav-option search ${isActive ? "active" : ""}`} 
                aria-label="Search" 
                state={location.pathname === "/search" ? location.state : null} /** the state part is to prevent clearing the search state in case we click again on the search nav button */
              > 
                <SearchNavbarIcon/>
              </NavLink>

              <NavLink 
                to="/rankings" 
                className={({ isActive }) => `app-navigation__nav-option trending ${isActive ? "active" : ""}`} 
                aria-label="Rankings"
              >
                <TrendingIcon/>
              </NavLink>

              {/* <NavLink 
                to="/notifications" 
                className={({ isActive }) => `app-navigation__nav-option notification ${isActive ? "active" : ""}`} 
                aria-label="Notifications"
              >
                <NotificationIcon/>
              </NavLink> */}

              <AppNavigationProtectedOption/> {/** This way, we include useLocation in that component and we dont have to re-render the whole component, just the search icon */}
            </div>
          </div>
        </nav>

        <Outlet/>
      </div>
    </>
  );
}
