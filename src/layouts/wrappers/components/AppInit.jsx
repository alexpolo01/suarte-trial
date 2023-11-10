import { onIdTokenChanged } from "firebase/auth";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import Notifier from "react-desktop-notification";
import { Outlet, ScrollRestoration } from "react-router-dom";

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

import { useWebsocket } from "./SocketProvider";

export default function AppInit() {
  const { stateHandler, cacheHandler, state } = useStateHandler();
  const [params] = useGetSearchParams({ validParams: ["invite"] });
  const socket = useWebsocket();

  const newLogin = data => {
    if (data.username !== undefined) {
      console.log("newLogin", data);
      gotNewNotification({
        type: "NewLogin",
        title: "Ally Signin",
        content: "Ally " + data.username + " Joined!",
      });
    }
  };

  const newNotification = data => {
    console.log("notificationData", data);
    let message = "";
    if (data.type) {
      message +=
        prefix[data.status] +
        data.subject +
        midfix[data.status] +
        data.object +
        suffix[data.status] +
        data.result;
    } else {
      message +=
        data.subject +
        actions[data.status] +
        data.object +
        data.result +
        data.period;
    }
    stateHandler.set("notifications", [ ...state.notifications, data]);
    gotNewNotification({
      type: "Notification",
      title: "",
      content: message,
    });
  };
  
  const gotNewNotification = data => {
    Notifier.focus(data.title, data.content, "localhost:3001", "");
  };

  useEffect(()=>{
    onIdTokenChanged(auth, async (user) => {
      if(user) {
        const decodedToken = jwtDecode(user.accessToken);
                
        if(decodedToken._id) { /** We check if the token is from our custom token login */
          const { response, data } = await UserService.getUserSession();

          if(response.ok) {
            stateHandler.set("user_session", data);
            if(socket) {
              socket.emit("setUserInfo", {
                username: data.user_username,
                usermail: data.user_email,
              });

              socket.on("newLogin", newLogin);
              socket.on("notificationData", newNotification);

            }
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

  }, [socket]);

  useEffect(()=>{
    if(state.user_session) {
      document.body.setAttribute("data-theme", state.user_session.user_preferences.theme);
      document.body.setAttribute("data-mode", state.user_session.user_preferences.mode);
    } else {
      document.body.setAttribute("data-theme", "starry_moon");
      document.body.setAttribute("data-mode", "dark");
    }
  }, [state.user_session]);

  useEffect(()=>{
    Utils.preloadImages([
      "07e0bb36-e259-4df0-e382-4c78834aa700/w=300", 
      "13a34fe1-4954-46e9-4a6a-f79af8985d00/public", 
      "73d03466-3a94-4da0-5a38-163895a91200/w=1000,blur=20", 
      "1dc634fd-ff91-4e23-0227-9e2e4437f700/w=500,blur=20", 
      "287f3610-3513-446d-5779-91763bdbe000/w=2000"
    ]);
  }, []);

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