import { useEffect, useMemo, useRef,useState } from "react";
import { useNavigate } from "react-router-dom";

import fetchWrapper from "@/services/fetchWrapper.service";

import useDebounce from "./useDebounce";
import useStateHandler from "./useStateHandler";

/**
 * Custom hook that handles GET requests that require queries (filters, sorting, external inputs...). Fully customizable (as it receives an already formed query object, the client has full customization and control on how to store that query before passing it to useQuery). 
 * useQuery will only prepare the query for the backend. useQuery doesn't worry about searchParams in the url or something along those lines. You could use that for your client query object (the one that you pass to useQuery). But it's up to you. You have full control to customize your query store. 
 * The only requirement is that it needs to be a plain object, where each key is a param to be send to the backend.
 * @param {string} queryId - Value that identifies an instance of this hook.
 * @param {string} url - The API endpoint to fetch data from
 * @param {Object} query - Plane object containing the query. It's a simple key-value object, where each key is the parameter to include in the url
 * @param {Object} options - An optional object containing options to customize the behavior of the hook.
 * @returns {Object} An object that contains the loading state, the requested data and a function to manually add and cache more data (specifically created for infinite scroll operations)
 * 
 * @note Right now, we handle this requests with get operations. In case URIs get too long, it might be a good idea to change into a POST operation although it's not the ideal use of that. 
 * Maybe a possible improvement could be to select if you want GET / POST OPERATION. QueryString should never be removed because that's what we use to identify a certain cache value. 
 * 
 * @note Although this hooks gives complete independence from how you handle the query object in the ui, i understand that sometimes it's a bit tedious to have
 * a very complex logic to handle both the query and the client query (in frontend) states. That's why i also included the customKeyGetter and customQueryValidation options so that you can 
 * reuse as much as possible and only make a few changes instead of handling a lot of changes in the code. This way, you have use the same state for the query and frontend UI handling without
 * having to synchronize everything.
 */
export default function useQuery(queryId, url, query, options={}) {
  const { cacheHandler, state } = useStateHandler();
  const debounce = useDebounce(options.delay ? options.delay : 200);
  const navigate = useNavigate();

  const queryString = useMemo(() => _getQueryString(), [query]);
  const [queryData, _setQueryData] = useState(cacheHandler.getCacheValue(`${queryId}.${queryString}`)?.data);
  const [loading, setLoading] = useState((Boolean(queryData) && cacheHandler.getCacheValue(`${queryId}.${queryString}`)?.isDataInvalid === false) ? false : true);
  const lastQueryString = useRef(queryString);
  const lastQuery = useRef(query);
  const dependencyArray = options.invalidateWhen ? [query, ...options.invalidateWhen.map(action => state.triggeredActions[action])] : [query]; 

  function _isValueValidToIncludeInQueryString(value) {
    if(Boolean(value) || value === false) {
      if(Array.isArray(value)) {
        return value.length !== 0;
      } else if(typeof value === "object") {
        return Object.keys(value).length !== 0;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  function _getQueryString() {
    let parts = [];

    for(const key in query) {
      const value = (Boolean(options.customKeyGetter) && Boolean(options.customKeyGetter[key])) ? options.customKeyGetter[key](query[key]) : query[key];

      if(_isValueValidToIncludeInQueryString(value)) {
        if(typeof value === "object") { /** Arrays are also considered an object */
          parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`);
        } else {
          parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
      }
    }

    return '?' + parts.join('&');
  }

  function _updateUserInterfaceIfNecessary(data) {
    const dataToStore = { data: data, queryObject: query, queryString: queryString };

    cacheHandler.storeInCache(`${queryId}.${queryString}`, dataToStore, options);

    /** We only update the ui if the current query string matches the one of the data or if the actual query is ignored by the hook (that can only happen is customQuery validation is defined. If not, every query is valid to be sent to the backend) */
    if((lastQueryString.current === queryString) || (Boolean(options.customQueryValidation) && !options.customQueryValidation(lastQuery.current))) {
      _setQueryData(dataToStore);
      setLoading(false); 
    }
  }

  async function _fetchData() {
    const { response, data } = await fetchWrapper.get(`${url}${queryString}`, { injectToken: options.injectToken });

    if(response.ok) {
      _updateUserInterfaceIfNecessary(data);
    } else if([401, 403].includes(response.status)) {
      navigate("/", { replace: true });
    }
  }

  function setQueryData(newData) {
    _updateUserInterfaceIfNecessary(newData);
  }

  async function loadMoreData() {
    const { response, data } = await fetchWrapper.get(`${url}${queryString}&offset=${queryData.data.data.length}`, { injectToken: options.injectToken });

    if(response.ok) {
      _updateUserInterfaceIfNecessary({ ...data, data: [...queryData.data.data, ...data.data] });
    } else if([401, 403].includes(response.status)) {
      navigate("/", { replace: true });
    }
  }

  useEffect(() => {
    lastQueryString.current = queryString;
    lastQuery.current = query;

    const cacheValue = cacheHandler.getCacheValue(`${queryId}.${queryString}`);

    if(!cacheValue || cacheValue.isDataInvalid) {
      if(!options.customQueryValidation || options.customQueryValidation(query)) {
        setLoading(true); /** We set the loading state outside the debounce so that the user gets an instant feedback in the UI of what's happening. If we want the debounced effect for loading too, just put it inside */
        debounce(_fetchData);
      }
    } else {
      _setQueryData(cacheValue.data);
      setLoading(false);
    }
  }, dependencyArray);

  return { loading, queryData, setQueryData, loadMoreData };
}