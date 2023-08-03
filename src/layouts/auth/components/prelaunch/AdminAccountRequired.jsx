import { Navigate, Outlet } from "react-router-dom";

import useStateHandler from "@/hooks/useStateHandler";

export default function AdminAccountRequired() {
  const { state } = useStateHandler();

  if(state.user_session?.user_type === "admin") {
    return (
      <Outlet/>
    );
  } else {
    return (
      <Navigate to="/early-access/login" replace/>
    );
  }
}
