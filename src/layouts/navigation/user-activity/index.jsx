import { Outlet } from 'react-router-dom';

import GoBackButton from '@/shared-components/buttons/components/GoBackButton';

import ActivityMenu from './components/ActivityMenu';

import './index.css';

export default function UserActivity() {
  return (
    <>
      <div className="user-activity__container">
        <div className="user-activity__menu">
          <GoBackButton alternativeRoute='/profile'/>
          <ActivityMenu replace/>
        </div>
        <div className="user-activity__content">
          <Outlet/>
        </div>
      </div>
    </>
  );
}
