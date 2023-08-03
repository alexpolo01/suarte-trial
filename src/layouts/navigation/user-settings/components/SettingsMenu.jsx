import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import useStateHandler from '@/hooks/useStateHandler';
import AuthService from '@/services/auth.service';
import CookiesIcon from '@/shared-components/icons/components/settings/CookiesIcon';
import CreditCardIcon from '@/shared-components/icons/components/settings/CreditCardIcon';
import EditProfileIcon from '@/shared-components/icons/components/settings/EditProfileIcon';
import HouseIcon from '@/shared-components/icons/components/settings/HouseIcon';
import ModeThemeSelectorIcon from '@/shared-components/icons/components/settings/ModeThemeSelectorIcon';
import PrivacyPolicyIcon from '@/shared-components/icons/components/settings/PrivacyPolicyIcon';
import SettingsGalleryIcon from '@/shared-components/icons/components/settings/SettingsGalleryIcon';
import TermsIcon from '@/shared-components/icons/components/settings/TermsIcon';
// import ProfileNotificationsIcon from '@/shared-components/icons/components/user-profile/ProfileNotificationsIcon';
import CollectionIcon from '@/shared-components/icons/components/user-profile/CollectionIcon';
import UserIcon from '@/shared-components/icons/components/user-profile/UserIcon';
import ConfirmationDialog from '@/shared-components/popups/components/ConfirmationDialog';
import Text from '@/shared-components/text/components/Text';

import './styles/SettingsMenu.css';

function SettingsMenuNavLink({ to, Icon, iconClassName, text, replace }) {
  return (
    <>
      <NavLink 
        className={({ isActive }) =>`settings-menu__menu-link${isActive ? " active" : ""}`} 
        to={to} 
        state={{ from: true }} 
        replace={replace}
      >
        <div className="settings-menu__menu-link-icon-container">
          <Icon className={`settings-menu__menu-link-icon ${iconClassName}`}/>
        </div>

        <Text className="settings-menu__menu-link-text" medium>
          {text}
        </Text>
      </NavLink>
    </>
  );
}

export default function SettingsMenu({ replace=false }) {
  const { state } = useStateHandler();
  const [logoutDialog, setLogoutDialog] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="settings-menu__container">
        <Text className="settings-menu__menu-heading" large>
                    Account
        </Text>

        <div className="settings-menu__section element-non-selectable">
          <SettingsMenuNavLink 
            to="/profile/settings/edit-profile" 
            iconClassName="edit" 
            text="Edit profile" 
            Icon={EditProfileIcon}
            replace={replace}
          />

          <SettingsMenuNavLink 
            to="/profile/settings/login" 
            iconClassName="user" 
            text="Log in" 
            Icon={UserIcon}
            replace={replace}
          />

          {
            state.user_session.user_type === "gallery" ? 
              <>
                <SettingsMenuNavLink 
                  to="/profile/settings/gallery-information" 
                  iconClassName="gallery" 
                  text="Gallery's information" 
                  Icon={SettingsGalleryIcon}
                  replace={replace}
                /> 

                <SettingsMenuNavLink 
                  to="/profile/settings/bank-account" 
                  iconClassName="credit" 
                  text="Bank account"
                  Icon={CreditCardIcon}
                  replace={replace}
                />
              </>
              :
              <>

                <SettingsMenuNavLink 
                  to="/profile/settings/my-collection"
                  iconClassName="collection" 
                  text="My collection"
                  Icon={CollectionIcon}
                  replace={replace}
                />
                                
                <SettingsMenuNavLink 
                  to="/profile/settings/address" 
                  iconClassName="house" 
                  text="Address" 
                  Icon={HouseIcon}
                  replace={replace}
                />
              </> 
          }
        </div>

        <Text className="settings-menu__menu-heading" large>
                    Preferences
        </Text>

        <div className="settings-menu__section element-non-selectable">
          <SettingsMenuNavLink 
            to="/profile/settings/mode-theme" 
            iconClassName="mode-theme" 
            text="Mode and theme" 
            Icon={ModeThemeSelectorIcon}
            replace={replace}
          />

          {/* <SettingsMenuNavLink 
                        to="/profile/settings/notifications" 
                        iconClassName="notifications" 
                        text="Notifications" 
                        Icon={ProfileNotificationsIcon}
                        replace={replace}
                    /> */}
        </div>

        <Text className="settings-menu__menu-heading" large>
                    About
        </Text>

        <div className="settings-menu__section element-non-selectable">
          <SettingsMenuNavLink 
            to="/profile/settings/privacy" 
            iconClassName="privacy" 
            text="Privacy policies" 
            Icon={PrivacyPolicyIcon}
            replace={replace}
          />

          <SettingsMenuNavLink
            to="/profile/settings/terms" 
            iconClassName="terms" 
            text="Terms of use" 
            Icon={TermsIcon}
            replace={replace}
          />

          <SettingsMenuNavLink 
            to="/profile/settings/cookies" 
            iconClassName="cookies" 
            text="Cookies" 
            Icon={CookiesIcon}
            replace={replace}
          />
        </div>

        {state.user_session.user_type === "gallery" && (
          <Text className="settings-menu__text-button element-non-selectable" large onClick={()=>{
            navigate("/profile/settings/closed-mode", { state: { from: true }, replace: replace });
          }}>
                        Closed mode
          </Text>
        )}

        <Text className="settings-menu__text-button element-non-selectable" large onClick={()=>setLogoutDialog(true)}>
                    Log out
        </Text>
      </div>

      <ConfirmationDialog 
        className="logout-dialog-popup" 
        title="Log out"
        open={logoutDialog} 
        onClose={()=>setLogoutDialog(false)} 
        onConfirm={AuthService.logout} 
        closeButtonText="Cancel" 
        confirmButtonText="Log out" 
        dialogText="Are you sure you want to log out?"
        opacity
      />
    </>
  );
}
