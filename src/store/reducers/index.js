import config from "@/config";
import Utils from "@/utils";

export default function MainReducer(state = config.initial_state, action) {
  switch(action.type) {
  case '@global/set':  {
    return {
      ...Utils.addAttributeToObject(action.payload.attribute, action.payload.value, state)
    };
  }

  case '@global/remove':  {
    return {
      ...Utils.removeAttributeFromObject(action.payload.attribute, state)
    };
  }

  case '@global/triggerAction':  {
    return {
      ...state,
      triggeredActions: {
        ...state.triggeredActions,
        [action.payload.action]: Date.now()
      }
    };
  }

  default: {
    return state;
  }
  } 
}
