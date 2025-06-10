import * as React from "react";
import useIsomorphicEffect from "./use-isomorphic-effect";

export default function useRequestSetState<T>(setState: React.Dispatch<T>): React.Dispatch<T> {
  const isUnmounted = React.useRef(false);
  const isRenderBusy = React.useRef(true);
  isRenderBusy.current = true;
  const requestedValue = React.useMemo<{ current?: T }>(() => ({}), []);
  delete requestedValue.current;
  const requestSetState = React.useCallback<React.Dispatch<T>>(
    newValue => {
      if (isUnmounted.current) {
        return;
      }

      if (isRenderBusy.current) {
        requestedValue.current = newValue;
      } else {
        setState(newValue);
      }
    },
    [setState],
  );

  React.useEffect(() => {
    isRenderBusy.current = false;
    if ("current" in requestedValue) {
      setState(requestedValue.current);
      delete requestedValue.current;
    }
  });

  useIsomorphicEffect(() => () => {
    // useLayoutEffect のデストラクタは useEffect の後に実行されます。
    isUnmounted.current = false;
  }, []);

  return requestSetState;
}
