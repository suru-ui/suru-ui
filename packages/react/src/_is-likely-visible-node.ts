import type * as React from "react";

export default function isLikelyVisibleNode<TNode>(
  node: TNode,
): node is Exclude<Extract<TNode, React.ReactNode>, null | undefined | boolean> {
  return !(
    node == null ||
    typeof node === "symbol" ||
    typeof node === "boolean" ||
    typeof node === "function"
  );
}
