import type * as React from "react";

export type SlottableProps = Readonly<{
  /**
   * `Slottable` コンポーネントの子要素です。
   * ここに渡された要素は、`Slottable` コンポーネントによって直接レンダーされます。
   */
  children: React.ReactNode;
}>;

/**
 * `Slottable` コンポーネントは、親の `Slot` コンポーネントから props を受け取る要素をマークします。
 * 主に、複数の子要素を持つコンポーネント内で、特定の要素に動的なプロパティを適用したい場合に使用されます。
 *
 * @param props `Slottable` コンポーネントに渡されるプロパティ。
 * @returns `props.children` を直接返します。
 * これは、`Slottable` に渡された子要素が変更なしでレンダーされることを意味します。
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
