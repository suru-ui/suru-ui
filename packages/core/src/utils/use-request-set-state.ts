import * as React from "react";
import useIsMounted from "./use-is-mounted";

export default function useRequestSetState<T>(setState: React.Dispatch<T>): React.Dispatch<T> {
  const isMounted = useIsMounted();
  const isRenderBusy = React.useRef(true);
  isRenderBusy.current = true;
  const requestedValue = React.useMemo<{ current?: T }>(() => ({}), []);
  delete requestedValue.current;
  const requestSetState = React.useCallback<React.Dispatch<T>>(
    newValue => {
      if (!isMounted.current) {
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

  return requestSetState;
}
