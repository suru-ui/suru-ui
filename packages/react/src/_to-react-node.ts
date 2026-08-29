import isLikelyVisibleNode, { type LikelyVisibleNode } from "./_is-likely-visible-node.js";

function toReactNode(node: unknown): LikelyVisibleNode | null;

function toReactNode<TDefaultNode extends React.ReactNode>(
  node: unknown,
  defaultNode: TDefaultNode,
): LikelyVisibleNode | TDefaultNode;

function toReactNode(node: unknown, defaultNode = null): LikelyVisibleNode | null {
  return isLikelyVisibleNode(node) ? node : defaultNode;
}

export default toReactNode;
