import { Navigate, Outlet } from "react-router-dom";

import useStateHandler from "@/hooks/useStateHandler";

export default function OnboardingNotCompletedRequired() {
  const { state } = useStateHandler();

  if(state.user_session?.user_flags.onboarding_completed === false) {
    return (
      <Outlet/>
    );
  } else {
    return (
      <Navigate to="/" replace/>
    );
  }
}