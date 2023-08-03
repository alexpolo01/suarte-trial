import { Navigate, Outlet } from "react-router-dom";

import useStateHandler from "@/hooks/useStateHandler";

/**
 * When a user is denied access to a certain page, it will be redirected to "/". This component will handle the logic to redirect the user to 
 * the view that it should. With this way of doing things now, we can always have the redirect logic here :) centralized in one spot.
 */
export default function AppAccessControl() {
  const { state } = useStateHandler();

  if(!state.user_session || state.user_session.user_flags.onboarding_completed === true) {
    return (
      <Outlet/>
    );
  } else if(state.user_session.user_type === "admin") {
    return (
      <Navigate to="/admin" replace/>
    );
  } else if(state.user_session.user_flags.onboarding_completed === false) {
    if(state.user_session.user_type === "gallery") {
      return (
        <Navigate to="/verify-gallery/uploaded-artworks" replace/>
      );
    } else {
      return (
        <Navigate to={`/onboarding/${state.user_session.user_type}`} replace/>
      );
    }
  } else {
    return <></>;
  }
}