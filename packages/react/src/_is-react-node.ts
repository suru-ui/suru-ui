import * as React from "react";

export default function isReactNode(node: unknown): node is React.ReactNode {
  const n = node as React.ReactNode;
  switch (typeof n) {
    case "bigint":
    case "number":
    case "string":
    case "boolean":
    case "undefined":
      return true;

    case "object":
      switch (true) {
        case n === null:
        case isIterable(n):
        case React.isValidElement(n):
        case n instanceof Promise:
          return true;
      }
  }

  // ReactNode をすべて検証しているか、型レベルで確認するためのアサーションです。
  n satisfies never;

  return false;
}

function isIterable(node: any): node is Iterable<any> {
  return typeof node[Symbol.iterator] === "function";
}
