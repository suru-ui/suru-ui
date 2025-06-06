import * as React from "react";

export default function useCreateMemo(): {
  <T>(factory: () => T, deps: readonly unknown[]): T;
} {
  const cache = React.useRef<{ memo: any; deps: readonly unknown[] } | null>(null);

  return React.useCallback(
    function createMemo<T>(factory: () => T, deps: readonly unknown[]): T {
      if (cache.current === null || !isArrayEqual(cache.current.deps, deps)) {
        cache.current = {
          memo: factory(),
          deps,
        };
      }

      return cache.current.memo;
    },
    [],
  );
}

function isArrayEqual(a: readonly unknown[], b: readonly unknown[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((item, i) => Object.is(item, b[i]));
}
