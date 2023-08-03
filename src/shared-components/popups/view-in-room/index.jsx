import React, { Suspense } from 'react';

import config from '@/config';
import useCache from '@/hooks/useCache';

import PopupToBottomSheet from '../components/PopupToBottomSheet';

import Loader from './components/Loader';

import './index.css';

const Content = React.lazy(() => import('./components/Content'));

function ViewInRoomContent({ artworkId, close }) {
  const { fetchData } = useCache(`view_in_room_${artworkId}`, `${config.apis.api.url}/artwork/view-in-room?artworkId=${artworkId}`);

  return (
    <>
      <div className="view-in-room__container remove-scrollbar">
        <Suspense fallback={<Loader/>}>
          <Content artworkData={fetchData}/>
        </Suspense>

        <button onClick={close}>close</button>
      </div>
    </>
  );
}

export default function ViewInRoom({ open, close, artworkId }) {
  return (
    <>
      <PopupToBottomSheet 
        open={open} 
        close={close}
        className="view-in-room"
        popupOptions={{ blur: true }}
      >
        <ViewInRoomContent artworkId={artworkId} close={close}/>
      </PopupToBottomSheet>
    </>
  );
}
