import * as React from "react";
import composeRefs from "./compose-refs";

export default function useComposeRefs<T>(...refs: React.Ref<T>[]): (ins: T | null) => () => void {
  return React.useMemo(() => composeRefs(...refs), refs);
}
