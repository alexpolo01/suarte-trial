import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import fetchWrapper from "@/services/fetchWrapper.service";

import useStateHandler from './useStateHandler';

/**
 * Custom hook used for everything related to getting the data for your components in an efficient way. It uses my own cache system for efficient fetching.
 * @param {string} cacheKey - The key used to store the cached data
 * @param {string} url - The API endpoint to fetch data from
 * @param {Object} options - An optional object containing options to customize the behavior of the hook.
 * @returns {Object} An object that contains the loading state, the requested data and a function to manually trigger a request
 */
export default function useCache(cacheKey, url, options={}) {
  const { cacheHandler, state } = useStateHandler();
  const [fetchData, _setFetchData] = useState(cacheHandler.getCacheValue(cacheKey)?.data); /** Cached values are stored in render phase to increase speed */
  const [loading, setLoading] = useState((Boolean(fetchData) && cacheHandler.getCacheValue(cacheKey)?.isDataInvalid === false) ? false : true);
  const dependencyArray = options.invalidateWhen ? options.invalidateWhen.map(action => state.triggeredActions[action]) : []; /** This will configure the useEffect to execute again only when one action that invalidates the data triggers */
  const navigate = useNavigate();

  function _getQueryString() {
    let parts = [];

    for(const key in options.includeSearchQueries) {
      const value = options.includeSearchQueries[key];

      if(value) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }

    return '?' + parts.join('&');
  }

  async function _fetchNewData() {
    setLoading(true);

    const { response, data } = await fetchWrapper.get(`${url}${_getQueryString()}`, { injectToken: options.injectToken });

    if(response.ok) {
      setLoading(false);
      setFetchData(data);
    } else if([401, 403].includes(response.status)) {
      navigate("/", { replace: true });
    }
  }

  function refetch() { 
    return _fetchNewData();
  }

  async function loadMoreData() {
    const { response, data } = await fetchWrapper.get(`${url}${_getQueryString()}&offset=${fetchData.data.length}`, { injectToken: options.injectToken });

    if(response.ok) {
      setFetchData({ ...data, data: [...fetchData.data, ...data.data] });
    } else if([401, 403].includes(response.status)) {
      navigate("/", { replace: true });
    }
  }

  function setFetchData(data) {
    let dataToStore = data;

    _setFetchData(prevValue => {
      if(typeof data === "function") {
        dataToStore = data(prevValue);
      }

      return dataToStore;
    });

    if(typeof dataToStore !== "function") {
      cacheHandler.storeInCache(cacheKey, dataToStore, options); 
    }
  }

  useEffect(() => {
    const cacheValue = cacheHandler.getCacheValue(cacheKey);

    if(!cacheValue || cacheValue.isDataInvalid) {
      _fetchNewData();
    }
  }, dependencyArray);

  return { loading, fetchData, setFetchData, loadMoreData, refetch };
}
