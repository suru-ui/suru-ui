import * as React from "react";

/**
 * ReactNodeを文字列に変換します。
 *
 * 要素の子孫テキストを再帰的に連結します。
 * 表示に寄与しない値と同期的に解決できない値は空文字にします。
 *
 * @param node 変換する値です。
 * @returns 連結したテキストです。ReactNode ではない値は空文字です。
 */
export default function reactNodeToString(node: unknown): string {
  const n = node as React.ReactNode;
  switch (typeof n) {
    case "string":
      return n;

    case "number":
    case "bigint":
      return n.toString(10);

    case "boolean":
    case "undefined":
      return "";

    case "object":
      switch (true) {
        case n === null:
          return "";

        case React.isValidElement<{ children?: unknown }>(n):
          return reactNodeToString(n.props.children);

        case n instanceof Promise:
          return "";

        case isIterable(n): {
          let s = "";
          for (const child of n) {
            s += reactNodeToString(child);
          }

          return s;
        }

        default:
          return "";
      }
  }

  // TODO(tai-kun): isReactNode が true を返したらエラーを投げます。
}

function isIterable(node: any): node is Iterable<unknown> {
  return typeof node[Symbol.iterator] === "function";
}
