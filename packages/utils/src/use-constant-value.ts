import * as React from "react";

/**
 * コンポーネント内の定数値を保持するフック。
 *
 * @template T 値の型
 * @param value 値
 * @returns 定数値
 */
export default function useConstantValue<T>(value: T): T {
  return React.useRef(value).current;
}
