import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Generic hook that allows to programatically handle search params. By default, every param will be stored and retrieved as an string. 
 * If you want more complex values (arrays or objects) you will have to specify the keys in @options complexParams attribute.
 * 
 * This hook also provides a security check. It won't store invalid values. Invalid values are the following:
 * 
 * - Non-truthy values
 * - Empty arrays
 * - Empty objects
 * - Query not in @option validParams (optional, by default you can store whatever key you want)
 * 
 * This hook also provides another security layer in getting the params of the url. We are aware that search params are visible to the users and they could definitely change them manually.
 * If they change a complex param turning it into another type of value or invalid value, it won't return the value, which is perfect.
 */
export default function useGetSearchParams(options) {
  const [_searchParams, _setParams] = useSearchParams();
  const params = useMemo(() => _getSearchParams(), [_searchParams]);

  function _getSearchParams() {
    let paramsObject = {};
    for (const entry of _searchParams.entries()) {
      const [paramKey, paramValue] = entry;

      if(paramValue && (!options?.validParams || options.validParams.includes(paramKey))) {
        if(options?.complexParams?.includes(paramKey)) {
          try {
            const parsedParam = JSON.parse(paramValue);
            if(typeof parsedParam === "object") paramsObject[paramKey] = parsedParam; /** If type is not an object, something went wrong. Maybe the user modified the query manually in the url */
          } catch {
            // err
          }
        } else {
          paramsObject[paramKey] = paramValue;
        }
      }
    }
    return Object.keys(paramsObject).length===0 ? null : paramsObject;
  }

  function _isValueInvalid(value) {
    return (!value || (Array.isArray(value) && value.length === 0) || (typeof value === "object" && Object.keys(value).length === 0));
  }

  function setParams(query, navOptions) {
    const keys = Object.keys(query);
    let paramsToBeSet = {};

    for(let i=0; i < keys.length; i++) {
      const paramKey = keys[i];

      if(!_isValueInvalid(query[paramKey]) && (!options?.validParams || options.validParams.includes(paramKey))) { 
        if(options?.complexParams?.includes(paramKey)) {
          if(typeof query[paramKey] === "object") paramsToBeSet[paramKey] = JSON.stringify(query[paramKey]); /** Arrays are also considered as objects */
        } else {
          paramsToBeSet[paramKey] = query[paramKey];
        }
      }
    }
        
    _setParams(paramsToBeSet, navOptions);
  }

  return [params, setParams];
}
