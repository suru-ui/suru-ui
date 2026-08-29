import * as React from "react";

export type LikelyVisibleNode = Exclude<React.ReactNode, null | undefined | boolean>;

export default function isLikelyVisibleNode(node: unknown): node is LikelyVisibleNode {
  switch (typeof node) {
    case "string":
    case "number":
    case "bigint":
      return true;

    case "object":
      return (
        node !== null && (isIterable(node) || React.isValidElement(node) || node instanceof Promise)
      );

    default:
      return false;
  }
}

function isIterable(node: any): node is Iterable<any> {
  try {
    return typeof node[Symbol.iterator] === "function";
  } catch {
    return false;
  }
}
