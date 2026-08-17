import type * as React from "react";

export default function isLikelyVisibleNode<TNode extends React.ReactNode>(
  node: TNode,
): node is Exclude<TNode, null | undefined | boolean> {
  return !(node == null || typeof node === "boolean");
}
