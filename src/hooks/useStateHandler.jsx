import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import config from '@/config';
import store from '@/store';
import actions from '@/store/actions';
import Utils from '@/utils';

/**
 * Internal hook that declares all the logic related to the cache management
 * @returns {Object} An object that contains public methods to handle the cache
 */
function _useGlobalStateHandler() {
  const dispatch = useDispatch();

  /**
    * Returns the whole global state (not recommended, better to use the useSelector one)
    * @returns {Object} The whole global state
    */
  function get() {
    return store.getState();
  }

  /**
    * Custom dispatcher for an action to update the global state
    * @param {Object} action - The action to dispatch
    */
  function dispatchAction(action) {
    dispatch(action);
  }

  /**
    * Determines if the global state contains a specific attribute
    * @param {string} attribute - The attribute to check for
    * @returns {boolean} Whether the attribute exists in the global state or not
    */
  function contains(attribute) {
    return Utils.objectContains(attribute, store.getState());
  }

  /**
    * Returns the value of a specific attribute in the global state
    * @param {string} attribute - The attribute to get the value of
    * @returns {any} The value of the attribute in the global state
    */
  function getValue(attribute) {
    return Utils.getAttributeValue(attribute, store.getState());
  }

  /**
    * Dispatches the set action with a specific attribute in the global state
    * @param {string} attribute - The attribute to set
    * @param {any} value - The value to set the attribute to
    * @param {Object} opts - An optional object that can contain properties. Not really useful for now but it might be in future updates
    */
  function set(attribute, value, opts) {
    dispatch(actions.set(attribute, value, opts));
  }

  /**
    * Dispatches the remove action with a specific attribute from the global state
    * @param {string} attribute - The attribute to remove
    */
  function remove(attribute) {
    dispatch(actions.remove(attribute));
  }

  return {
    get,
    dispatchAction,
    contains, 
    getValue,
    set,
    remove
  };
}

/**
 * Internal hook that declares all the logic related to the cache management
 * @returns {Object} An object that contains public methods to handle the cache
 */
function _useCacheHandler() {
  const dispatch = useDispatch();
  const CACHE_PATH = config.cache.cache_path;

  function _getExpirationValueForCacheKey(typeOfCache, expiresIn) {
    if(!typeOfCache || typeOfCache === "@cache/default" || typeOfCache === "@cache/persist") {
      return (Utils.getMSFromTimeUnit(expiresIn ? expiresIn : config.cache.cache_value_default_duration));
    } else if(typeOfCache === "@cache/dynamic") {
      return 0;
    } else {
      return null;
    }
  }

  function _hasCacheKeyExpired(cacheValue) {
    if(cacheValue.timestamp_end === "NO_EXPIRATION") return false;
    return cacheValue.timestamp_end <= Date.now();
  }

  function _hasAnyActionInvalidatedTheCacheKey(cacheValue) {
    if(!cacheValue.invalidateWhen) return false;

    const triggeredActions = Utils.getAttributeValue("triggeredActions", store.getState());

    for(let i=0; i<cacheValue.invalidateWhen.length; i++) {
      const action = cacheValue.invalidateWhen[i];

      if(triggeredActions[action] >= cacheValue.timestamp_start) {
        return true;
      }
    }

    return false;
  }

  /** 
    * Stores a value in the cache with the specified cache key
    * @param {string} cacheKey - The key to use for the cached value
    * @param {any} value - The value to store in the cache
    * @param {Object} opts - An optional object that allows the user to fully custom the store process in cache. You have many possibilities:
    *    @param {string} opts.type - Type of store that you want to use. We have the following: @cache/default (default one), @cache/persist, @cache/dynamic, @cache/no-expiration
    *    @param {Array} opts.expiresIn - Amount of time that you wish to persist the value in cache. The format is the following: [quantity, time unit] -> ["10", "seconds"]
    *    @param {Array} opts.invalidateWhen - An optional array containing the list of actions that invalidate the cacheKey when triggered (if the action triggered after the store)
    */
  function storeInCache(cacheKey, value, opts={}) {
    const { type, expiresIn, invalidateWhen } = opts;
    const valueExpiresIn = _getExpirationValueForCacheKey(type, expiresIn);
    const valueToStore = {
      id: uuidv4(),
      timestamp_start: Date.now(),
      timestamp_end: type === "@cache/no-expiration" ? "NO_EXPIRATION" : Date.now() + valueExpiresIn,
      invalidateWhen: invalidateWhen,
      data: value
    };

    dispatch(actions.set(CACHE_PATH+"."+cacheKey, valueToStore)); 

    if(!type || type === "@cache/default") { 
      setTimeout(() => {
        if(valueToStore.id === getCacheValue(cacheKey)?.id) {
          removeFromCache(cacheKey);
        }
      }, valueExpiresIn);
    }
  }

  /**
    * Returns the value of a specific cache key in the cache
    * @param {string} cacheKey - The key to use for the cached value
    * @returns {object | undefined} - Returns an object containing the cached data including an aditional flag to know if the value has been invalidated
    */
  function getCacheValue(cacheKey) {
    let cacheValue = Utils.getAttributeValue(CACHE_PATH+"."+cacheKey, store.getState());

    if(cacheValue) {
      cacheValue = {
        ...cacheValue, 
        isDataInvalid: _hasCacheKeyExpired(cacheValue) || _hasAnyActionInvalidatedTheCacheKey(cacheValue)
      };
    }

    return cacheValue;
  }

  /**
    * Removes a cache key from the cache
    * @param {string} cacheKey - The key to remove from the cache
    */
  function removeFromCache(cacheKey) {
    dispatch(actions.remove(CACHE_PATH+"."+cacheKey));
  }

  /**
    * Triggers an action that will be used in useCache hook for invalidating certain cacheKeys
    * @param {string} action - Action to trigger
    */
  function triggerAction(action) {
    dispatch(actions.triggerAction(action));
  }

  /**
    * Clears the entire cache
    */
  function clearCache() {
    dispatch(actions.remove(CACHE_PATH));
  }

  return {
    storeInCache,
    getCacheValue,
    removeFromCache,
    triggerAction,
    clearCache
  };
}
 
export default function useStateHandler() {
  const state = useSelector(state => state); /* By importing useSelector, this will tell React that your component needs to be marked as dirty whenever the state changes so that it can re-render. */
  const stateHandler = _useGlobalStateHandler();
  const cacheHandler = _useCacheHandler();

  return { stateHandler, cacheHandler, state };
}
