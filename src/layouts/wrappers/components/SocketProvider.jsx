import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import config from "@/config";

import WebsocketContext from './WebSocketContext';

const WebsocketProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    try {
      const socketConnection = io(config.apis.api.url);
      // const socketConnection = io("localhost:8000");
      socketConnection.on('connect', () => {
        setConnection(socketConnection);
      });
      socketConnection.on('disconnect', () => {
        setConnection(null);
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

export default WebsocketProvider;