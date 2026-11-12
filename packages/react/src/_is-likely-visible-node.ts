import * as React from "react";

import isReactNode from "./_is-react-node.js";

export type LikelyVisibleNode = Exclude<React.ReactNode, null | undefined | boolean>;

export default function isLikelyVisibleNode(node: unknown): node is LikelyVisibleNode {
  if (!isReactNode(node)) {
    return false;
  }

  if (node == null || typeof node === "boolean") {
    return false;
  }

  return true;
}
