import { useRef } from "react";

export default function useThrottling(throttlingTime=200) {
  const wait = useRef(false);
  function throttle(callback) {
    if(!wait.current) {
      wait.current = true;
      setTimeout(()=>wait.current=false, throttlingTime);
      callback();
    }
  }
  return throttle;
}