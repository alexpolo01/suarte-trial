import { useState } from 'react';

import useStateHandler from '@/hooks/useStateHandler';

import AppNavigationPage from '../../shared-components/wrappers/components/AppNavigationPage';

import AlertFrame from './components/alertframe';
import AlertHeader from './components/alertheader';
import AlertTab from './components/alerttab';

import './index.css';

export default function Notifications() {

  const [index, setIndex] = useState(0);
  const { state } = useStateHandler();

  return (
    <>
      <AppNavigationPage>
        <div className="notification__page">
          <AlertHeader />
          <AlertTab index={index} setIndex={setIndex}/>
          {
            state.notifications && state.notifications.map((item, idx) => (
              (!index || index == item.type + 1) && <AlertFrame key={idx} value={item} />
            ))
          }
        </div>
      </AppNavigationPage>
    </>
  );
}
