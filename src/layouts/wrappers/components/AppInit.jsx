import { onIdTokenChanged } from "firebase/auth";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import useGetSearchParams from "@/hooks/useGetSearchParams";
import useStateHandler from "@/hooks/useStateHandler";
import { auth } from "@/services/firebase.service";
import UserService from "@/services/user.service";
import AuthPopup from "@/shared-components/popups/auth-popup";
import CookiesPopup from "@/shared-components/popups/components/CookiesPopup";
import TemporalPopup from "@/shared-components/popups/components/TemporalPopup";
import Utils from "@/utils";

export default function AppInit() {
  const { stateHandler, cacheHandler, state } = useStateHandler();
  const [params] = useGetSearchParams({ validParams: ["invite"] });

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
  }, []);

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