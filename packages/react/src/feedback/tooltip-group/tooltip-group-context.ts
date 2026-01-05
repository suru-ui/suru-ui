import type { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

/**
 * ツールチップのコンテキストで使用する値の型定義です。
 */
type ContextValue = Readonly<{
  /**
   * ツールチップの状態を管理するためのハンドルオブジェクトです。
   */
  handle: Tooltip.Handle<unknown>;
}>;

/**
 * ツールチップの内部状態を共有するための React コンテキストです。
 *
 * このコンテキストは、ツールチップのルートコンポーネントとその子孫コンポーネント間で状態や操作用ハンドルを受け渡すために使用されます。
 */
const Context = /*#__PURE__*/ React.createContext<ContextValue | null>(null);

export default Context;
