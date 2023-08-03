import { Navigate,Outlet } from "react-router-dom";

import useStateHandler from "@/hooks/useStateHandler";

export default function TypeOfAccountRequired({ allowedTypes }) {
  const { state } = useStateHandler();

  if(allowedTypes.includes(state.user_session.user_type)) {
    return (
      <Outlet/>
    );
  } else {
    return (
      <Navigate to="/" replace/>
    );
  }
}
