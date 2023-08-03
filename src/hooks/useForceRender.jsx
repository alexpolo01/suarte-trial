import { useState } from "react";

export default function useForceRender() {
  const [, setRenderFlag] = useState({});
  function forceRender() {
    setRenderFlag({});
  }
  return forceRender;
}
