import * as React from "react";

export interface SlottableProps {
  /**
   * 子要素
   */
  children: React.ReactNode;
}

/**
 * Slot コンポーネントが props を渡す対象としてマークする。
 */
export default function Slottable(props: SlottableProps): React.ReactNode {
  return props.children;
}
