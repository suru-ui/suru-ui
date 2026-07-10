import type * as React from "react";

export default function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]): {
  /**
   * 結合された ref の実体です。
   *
   * @param ins ref が参照する DOM 要素またはコンポーネントの現在のインスタンスです。
   * @returns 全てのクリーンアップ関数を実行するための関数です。
   */
  (ins: T | null): {
    /**
     * 結合された ref に関連する全てのクリーンアップ関数を実行します。
     *
     * React によってコンポーネントがアンマウントされる際に呼び出されることを意図しています。
     */
    (): void;
  };
} {
  const list = refs.filter((ref) => !!ref);
  if (list.length === 0) {
    return () => () => {};
  }

  return function composedRef(ins) {
    const lifo: (() => void)[] = [];
    for (const ref of list) {
      if (typeof ref === "function") {
        const cleanup = ref(ins);
        if (typeof cleanup === "function") {
          lifo.unshift(cleanup); // LIFO の順序で追加します。
        }
      } else {
        ref.current = ins;
      }
    }

    return function cleanupComposedRef() {
      const errs: unknown[] = [];
      // LIFO の順序でクリーンアップ関数を実行します。
      for (const cleanup of lifo) {
        try {
          cleanup();
        } catch (err) {
          errs.push(err);
        }
      }

      switch (errs.length) {
        case 0:
          break;
        case 1:
          throw errs[0];
        default:
          throw new AggregateError(errs);
      }
    };
  };
}
