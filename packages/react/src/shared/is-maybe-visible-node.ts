import type * as React from "react";

/**
 * React のノードが描画される可能性のある値であるかどうかを判定する型ガード関数です。
 *
 * @template TNode 入力される React ノードの型です。
 * @param node チェックする React ノードです。
 * @returns 描画される可能性のある値であれば true を返します。
 */
export default function isMaybeVisibleNode<TNode extends React.ReactNode>(
  node: TNode,
): node is Exclude<TNode, boolean | null | undefined> {
  return node != null && typeof node !== "boolean";
}
