import * as React from "react";

/**
 * ReactNode を文字列に変換します。
 *
 * 要素の子孫テキストを再帰的に連結します。
 * 表示に寄与しない値と同期的に解決できない値は空文字にします。
 *
 * @param node 変換する値です。
 *
 * @returns 連結したテキストです。ReactNode ではない値は空文字です。
 */
export default function reactNodeToString(node: unknown): string {
  switch (typeof node) {
    case "string":
      return node;

    case "number":
    case "bigint":
      return node.toString(10);

    case "boolean":
    case "undefined":
      return "";

    case "object":
      switch (true) {
        case node === null:
          return "";

        case React.isValidElement<{ children?: unknown }>(node):
          return reactNodeToString(node.props.children);

        case node instanceof Promise:
          return "";

        case isIterable(node): {
          let s = "";

          for (const child of node) {
            s += reactNodeToString(child);
          }

          return s;
        }

        default:
          return "";
      }
  }

  return "";
}

function isIterable(node: any): node is Iterable<unknown> {
  return typeof node[Symbol.iterator] === "function";
}
