//@ts-nocheck

import { useEffect, useRef } from "react";

export function useDebouncedEffect(callback: Function, delay: number, deps = []) {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...deps]);
}

export default useDebouncedEffect;
