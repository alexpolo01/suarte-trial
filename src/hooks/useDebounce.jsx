import { useRef } from "react";

export default function useDebounce(debounceDelay=200) {
  const debounce_timeout = useRef(null);
  function debounce(callback) {
    if(debounce_timeout.current) clearTimeout(debounce_timeout.current);
    debounce_timeout.current = setTimeout(callback, debounceDelay);
  }
  return debounce;
}