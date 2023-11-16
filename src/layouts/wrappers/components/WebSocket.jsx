import { useContext } from 'react';

import WebsocketContext from './WebSocketContext';

const useWebsocket = () => {
  const ctx = useContext(WebsocketContext);
  if (ctx === undefined) {
    throw new Error('useWebsocket can only be used inside WebsocketContext');
  }
  return ctx;
};

export default useWebsocket;