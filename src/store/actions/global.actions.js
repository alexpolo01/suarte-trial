const GlobalActions = {
  set: (attribute, value) => {
    return {
      type: '@global/set',
      payload: {
        attribute,
        value
      }
    };
  },

  remove: (attribute) => {
    return {
      type: '@global/remove',
      payload: {
        attribute
      }
    };
  },

  triggerAction: (action) => {
    return {
      type: '@global/triggerAction',
      payload: {
        action
      }
    };
  },
};

export default GlobalActions;