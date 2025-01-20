import * as React from "react";

/**
 * 複数の ref を結合する。
 *
 * @template T ref の型
 * @param refs ref の配列
 * @returns 結合された ref
 */
export default function composeRefs<T>(...refs: React.Ref<T>[]): (ins: T | null) => () => void {
  const list = refs.filter(ref => !!ref);

  if (list.length === 0) {
    return () => () => {};
  }

  return function composedRef(ins) {
    const lifo: (() => void)[] = [];

    for (const ref of list) {
      if (typeof ref === "function") {
        const cleanup = ref(ins);

        if (typeof cleanup === "function") {
          lifo.unshift(cleanup);
        }
      } else {
        ref.current = ins;
      }
    }

    return function cleanupComposedRef() {
      for (const cleanup of lifo) {
        cleanup();
      }
    };
  };
}
