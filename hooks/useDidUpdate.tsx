import { useEffect, useRef } from "react";

export function useDidUpdate(fn: () => void, dependencies?: any[]) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      fn();
    } else {
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
