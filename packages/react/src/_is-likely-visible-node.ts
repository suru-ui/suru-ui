import * as React from "react";

export type LikelyVisibleNode = Exclude<React.ReactNode, null | undefined | boolean>;

export default function isLikelyVisibleNode(node: unknown): node is LikelyVisibleNode {
  const typ = typeof node;

  if (typ === "string" || typ === "number" || typ === "bigint") {
    return true;
  }

  if (typ === "object" && node !== null) {
    if (React.isValidElement(node)) {
      return true;
    }

    if (isIterable(node)) {
      return React.Children.count(node) > 0;
    }

    if (node instanceof Promise) {
      return true;
    }
  }

  return false;
}

function isIterable(node: any): node is Iterable<any> {
  return typeof node[Symbol.iterator] === "function";
}
