import { useState } from 'react';

import AppNavigationPage from '../../shared-components/wrappers/components/AppNavigationPage';

import AlertFrame from './components/alertframe';
import AlertHeader from './components/alertheader';
import AlertTab from './components/alerttab';
import { artLover, artist, gallery } from './constant';

import './index.css';

const data = [...artLover, ...artist, ...gallery];

export default function Notifications() {

  const [index, setIndex] = useState(0);

  return (
    <>
      <AppNavigationPage>
        <div className="notification__page">
          <AlertHeader />
          <AlertTab index={index} setIndex={setIndex}/>
          {
            data.map((item, idx) => (
              (!index || index == item.type + 1) && <AlertFrame key={idx} value={item} />
            ))
          }
        </div>
      </AppNavigationPage>
    </>
  );
}
