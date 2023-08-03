import { Navigate, Outlet } from "react-router-dom";

import useStateHandler from "@/hooks/useStateHandler";

export default function GalleryAccountRequired() {
  const { state } = useStateHandler();

  if(state.user_session?.user_type === "gallery") {
    return (
      <Outlet/>
    );
  } else {
    return (
      <Navigate to="/early-access/login" replace/>
    );
  }
}
