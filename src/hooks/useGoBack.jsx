import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useGoBack(alternativeRoute="/") {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSafeToGoBack] = useState(location.state?.from); 
  /** This fixes an strange bug. Suppose we enter a view that has a tab navigation system. 
     * That view has a goback callback using this hook. The first time we enter, the location has the from attribute in state. 
     * But when we navigate to another tab (using replace: true) that state gets erased. 
     * And it's not scalable to always pass to the new location the old location state (would be a mess and extra complicity). 
     * That's why we will just init the goBackValue on mount and no matter the changes in location (with the same goBackComponent) it will remain the same 
    */

  function goBackHandler() {
    if(isSafeToGoBack) { 
      navigate(-1);
    } else { 
      navigate(alternativeRoute, { replace: true });
    }
  }

  return goBackHandler;
}