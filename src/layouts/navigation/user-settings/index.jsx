import { Outlet, useLocation } from 'react-router-dom';

import GoBackButton from '@/shared-components/buttons/components/GoBackButton';

import SettingsMenu from './components/SettingsMenu';

import './index.css';

export default function UserSettings() {
  const location = useLocation();

  return (
    <>
      <div className="user-settings__container">
        <div className="user-settings__menu">
          <GoBackButton alternativeRoute='/profile'/>
          <SettingsMenu replace/>
        </div>
        <div className={`user-settings__content ${location.pathname === "/profile/settings/my-collection" ? "expanded" : ""}`}>
          <Outlet/>
        </div>
      </div>
    </>
  );
}
