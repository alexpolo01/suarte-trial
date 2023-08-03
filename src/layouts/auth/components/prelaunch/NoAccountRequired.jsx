import { Navigate, Outlet } from "react-router-dom";

import useStateHandler from "@/hooks/useStateHandler";

export default function NoAccountRequired() {
  const { state } = useStateHandler();

  if(!state.user_session) {
    return (
      <Outlet/>
    );
  } else if(state.user_session.user_type ==="admin") {
    return (
      <Navigate to="/admin" replace/>
    );
  } else if(state.user_session.user_type === "gallery") {
    return (
      <Navigate to="/verify-gallery/uploaded-artworks" replace/>
    );
  }
}