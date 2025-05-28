import * as React from "react";
import useIsomorphicLayoutEffect from "./use-isomorphic-effect";

export default function useIsMounted(): { readonly current: boolean } {
  const isMounted = React.useRef(true);

  React.useEffect(() => {
    isMounted.current = true;
  }, []);

  useIsomorphicLayoutEffect(() => () => {
    // useInsertionEffect のデストラクタは useEffect の前に実行されます。
    isMounted.current = false;
  }, []);

  return isMounted;
}
