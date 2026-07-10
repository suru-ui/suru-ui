import * as React from "react";

/**
 * オブジェクトから指定したキーの値が変化した場合のみ新しいサブセットオブジェクトを作成します。
 *
 * @example キーを指定してサブセットを取得
 * ```ts
 * const memoize = useMemoizeRecord();
 * const subset = memoizeRecord({ a: 1, b: 2, c: 3 }, ["a", "b"]);
 * //    ^? { readonly a: number; readonly b: number; }
 * ```
 */
export default function useMemoizeRecord(): {
  <TRecord, TKeys extends keyof TRecord>(
    record: TRecord,
    keys: readonly TKeys[],
  ): { readonly [K in TKeys]: TRecord[K] };
} {
  return React.useMemo(() => {
    let prevValues: readonly unknown[] | null = null;
    let prevRecord: Record<string, unknown> | null = null;

    return function memoizeRecord(record, keys): any {
      const values = keys.map((key) => record[key]);

      if (
        prevValues !== null &&
        values.length === prevValues.length &&
        values.every((value, index) => Object.is(value, prevValues![index]))
      ) {
        return prevRecord;
      }

      prevValues = values;
      const newRecord = {} as Record<(typeof keys)[number], unknown>;
      for (const key of keys) {
        newRecord[key] = record[key];
      }

      prevRecord = newRecord;

      return newRecord;
    };
  }, []);
}
