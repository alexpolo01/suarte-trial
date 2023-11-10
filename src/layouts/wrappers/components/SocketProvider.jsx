import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

import config from "@/config";

export const WebsocketContext = createContext(null);

const WebsocketProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    try {
      const socketConnection = io(config.apis.api.url);
      socketConnection.on('connect', () => {
        setConnection(socketConnection);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <WebsocketContext.Provider value={connection}>
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => {
  const ctx = useContext(WebsocketContext);
  if (ctx === undefined) {
    throw new Error('useWebsocket can only be used inside WebsocketContext');
  }
  return ctx;
};

export default WebsocketProvider;