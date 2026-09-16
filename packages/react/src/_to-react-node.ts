import type * as React from "react";

import isLikelyVisibleNode, { type LikelyVisibleNode } from "./_is-likely-visible-node.js";

function toReactNode(node: unknown): LikelyVisibleNode | undefined;

function toReactNode<TDefaultNode extends React.ReactNode>(
  node: unknown,
  defaultNode: TDefaultNode,
): LikelyVisibleNode | TDefaultNode;

function toReactNode(node: unknown, defaultNode?: unknown): unknown {
  return isLikelyVisibleNode(node) ? node : defaultNode;
}

export default toReactNode;
