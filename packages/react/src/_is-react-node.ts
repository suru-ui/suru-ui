import * as React from "react";

export default function isReactNode(node: unknown): node is React.ReactNode {
  switch (typeof node) {
    case "bigint":
    case "number":
    case "string":
    case "boolean":
    case "undefined":
      return true;

    case "object":
      switch (true) {
        case node === null:
        case React.isValidElement(node):
        case node instanceof Promise:
        case isIterable(node):
          return true;
      }
  }

  return false;
}

function isIterable(node: any): node is Iterable<unknown> {
  return typeof node[Symbol.iterator] === "function";
}
