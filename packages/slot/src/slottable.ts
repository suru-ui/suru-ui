import * as React from "react";

export type SlottableProps = Readonly<{
  /**
   * 子要素
   */
  children: React.ReactNode;
}>;

/**
 * Slot コンポーネントが props を渡す対象としてマークする。
 *
 * @example
 * ```tsx
 * <Slot href="https://github.com/suru-ui/suru-ui">
 *   <span>LEFT</span>
 *   <Slottable>
 *     <a>
 *       <i>Suru</i> UI
 *     </a>
 *   </Slottable>
 *   <span>RIGHT</span>
 * </Slot>
 * ```
 */
export default function Slottable(props: SlottableProps): React.ReactNode {
  return props.children;
}
