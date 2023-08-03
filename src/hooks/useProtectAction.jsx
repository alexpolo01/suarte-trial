import useStateHandler from "./useStateHandler";

/**
 * This hook is to protect certain action the user can do in different views. There might be a view where multiple types of users can enter (guests, normal users, premium users...)
 * but that view may contain certain buttons that trigger certain action that not every user can trigger. That's why this hooks exists, to protect those actions. In case an action
 * can't be executed due to permission, it will trigger the action_denied state param.
 * 
 * The @typeOfProtection available are the following:
 * 
 * USER_ACCOUNT: It triggers the action only if the user has an account (is not a guest). 
 */
export default function useProtectAction(protectOptions) {
  const { state, stateHandler } = useStateHandler();

  function privateActionHandler(action) {
    switch(protectOptions.typeOfProtection) {
    case "USER_ACCOUNT_REQUIRED": {
      if(state.user_session) { 
        action();
      } else {
        stateHandler.set("action_denied", "USER_ACCOUNT_REQUIRED");
      }
                
      break;
    }

    default: break;
    }
  }

  return privateActionHandler;
}