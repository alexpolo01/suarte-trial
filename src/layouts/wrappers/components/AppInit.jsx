import { onIdTokenChanged } from "firebase/auth";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Notifier from "react-desktop-notification";
import { Outlet, ScrollRestoration } from "react-router-dom";
import io from 'socket.io-client';

import useGetSearchParams from "@/hooks/useGetSearchParams";
import useStateHandler from "@/hooks/useStateHandler";
import { actions } from "@/pages/notifications/components/interaction/constant";
import { midfix, prefix, suffix } from "@/pages/notifications/components/suarte/constant";
import { auth } from "@/services/firebase.service";
import UserService from "@/services/user.service";
import AuthPopup from "@/shared-components/popups/auth-popup";
import CookiesPopup from "@/shared-components/popups/components/CookiesPopup";
import TemporalPopup from "@/shared-components/popups/components/TemporalPopup";
import Utils from "@/utils";

export default function AppInit() {
  const { stateHandler, cacheHandler, state } = useStateHandler();
  const [params] = useGetSearchParams({ validParams: ["invite"] });
  const [socket, setSocket] = useState(null);
  const [newData, setNewData] = useState(null);
  const [socketState, setSocketState] = useState(false);

  const newLogin = data => {
    if (data.username !== undefined) {
      console.log("newLogin", data);
    }
  };

  const newNotification = data => {
    let message = "";
    if (data.type) {
      message =
        ( prefix[data.status] ) +
        ( data.subject ?? "" ) +
        ( midfix[data.status] ) +
        ( data.object ?? "" ) +
        ( suffix[data.status] ) +
        ( data.result ?? "" ) ;
    } else {
      message =
        ( data.subject ?? "" ) +
        ( actions[data.status] ) +
        ( data.object ?? "" ) +
        ( data.result ?? "" ) +
        ( data.period ?? "" ) ;
    }
    console.log(message, data);
    gotNewNotification({
      type: "Notification",
      title: "Notification",
      content: message,
      icon: data.sbj_image
    });
    setNewData(data);
  };
  
  const gotNewNotification = data => {
    Notifier.focus(data.title, data.content, "localhost:3001", data.icon);
  };

  useEffect(() => {
    if(newData != null) {
      console.log(newData);
      stateHandler.set("notifications", [...state.notifications, newData]);
      setNewData(null);
    }
  }, [newData]);

  useEffect(()=>{
    onIdTokenChanged(auth, async (user) => {
      if(user) {
        const decodedToken = jwtDecode(user.accessToken);
                
        if(decodedToken._id) { /** We check if the token is from our custom token login */
          const { response, data } = await UserService.getUserSession();

          if(response.ok) {
            stateHandler.set("user_session", data);
          }  
        }
      } else {
        stateHandler.set("user_session", null);
        cacheHandler.clearCache();
      }
    });

    if(params?.invite) {
      stateHandler.set("invite", params.invite);
    }
    stateHandler.set("notifications", []);
    
    Utils.preloadImages([
      "07e0bb36-e259-4df0-e382-4c78834aa700/w=300", 
      "13a34fe1-4954-46e9-4a6a-f79af8985d00/public", 
      "73d03466-3a94-4da0-5a38-163895a91200/w=1000,blur=20", 
      "1dc634fd-ff91-4e23-0227-9e2e4437f700/w=500,blur=20", 
      "287f3610-3513-446d-5779-91763bdbe000/w=2000"
    ]);

    const socketConnection = io("localhost:8000");
    setSocket(socketConnection);
    socketConnection.on('connect', () => { setSocketState(true); });
    socketConnection.on('disconnect', () => { setSocketState(false); });
    socketConnection.on("newLogin", newLogin);
    socketConnection.on("notificationData", newNotification);
  }, []);

  useEffect(() => {
    if(state.user_session) {
      if(socketState) {
        socket.emit("setUserInfo", {
          username: state.user_session.user_username,
          usermail: state.user_session.user_email,
        });
      }
    }
  }, [socketState]);

  useEffect(()=>{
    if(state.user_session) {
      document.body.setAttribute("data-theme", state.user_session.user_preferences.theme);
      document.body.setAttribute("data-mode", state.user_session.user_preferences.mode);
      
      if(socketState) {
        socket.emit("setUserInfo", {
          username: state.user_session.user_username,
          usermail: state.user_session.user_email,
        });
      }
    } else {
      document.body.setAttribute("data-theme", "starry_moon");
      document.body.setAttribute("data-mode", "dark");

      if(socketState) {
        socket.emit("setUserInfo", {
          username: "",
          usermail: "",
        });
      }
    }
  }, [state.user_session]);

  return (
    <>
      <Outlet/>
      <CookiesPopup/>
      <AuthPopup/>
      <TemporalPopup/>
      <ScrollRestoration/>
    </>
  );
}