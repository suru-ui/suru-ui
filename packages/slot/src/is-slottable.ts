import * as React from "react";
import Slottable, { type SlottableProps } from "./slottable";

export type SlottableElement = React.ReactElement<SlottableProps, typeof Slottable>;

/**
 * `Slottable` かどうかを判定する。
 *
 * @param node 子要素
 * @returns `Slottable` なら `true`、そうでなければ `false`
 */
export default function isSlottable(node: React.ReactNode): node is SlottableElement {
  return React.isValidElement(node) && node.type === Slottable;
}
