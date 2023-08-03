import { useEffect } from "react";

export default function useRenderCheck() {
  useEffect(() => {
    console.log("REACT HAS MADE A RENDER");
  });
    
  console.log("RENDER PHASE");
}