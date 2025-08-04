import * as React from "react";
import MemoMap, { type KeyValueStore } from "./memo-map";

/**
 * React コンポーネント内で持続的な `MemoMap` インスタンスを提供するためのカスタムフックです。
 * `MemoMap` は、キーと値のペアを効率的に管理し、メモ化されたデータを保持するのに役立ちます。
 *
 * @returns 新しく初期化された、または既存の `MemoMap` インスタンスを返します。
 * このインスタンスは、コンポーネントのライフサイクルを通してメモ化されます。
 */
export default function useMemoMap(): MemoMap {
  const kv = React.useMemo<KeyValueStore>(() => new Map(), []);
  return new MemoMap(kv);
}
