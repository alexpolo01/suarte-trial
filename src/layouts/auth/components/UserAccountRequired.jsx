import { Navigate, Outlet } from "react-router-dom";

import useStateHandler from "@/hooks/useStateHandler";

export default function UserAccountRequired() {
  const { state } = useStateHandler();

  if(state.user_session) {
    return (
      <Outlet/>
    );
  } else {
    return (
      <Navigate to="/" replace/>
    );
  }
}
