let stateConfig = {
  initial_state: {
    cookiesAccepted: JSON.parse(localStorage.getItem("cookiesAccepted")) || false,
    user_session: JSON.parse(localStorage.getItem("user_session")) || null,
    cache_metas: {},
    triggeredActions: {},
    guest_settings: {
      claim_cooldown: parseInt(localStorage.getItem("claim_cooldown")) || null
    }
  },
  
  cache: {
    cache_path: 'cache_metas',
    cache_value_default_duration: ['1', 'minutes']
  }
};

export default stateConfig;