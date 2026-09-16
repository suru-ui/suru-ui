import isReactNode from "../_is-react-node.js";
import type { MenubarRootItem } from "./menubar.root.jsx";

/**
 * 項目がラベルを持つオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns ラベルを持つオブジェクトの場合に `true` を返します。
 */
export function isItem(item: unknown): item is MenubarRootItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "items" in item &&
    Array.isArray(item.items) &&
    "trigger" in item &&
    (typeof item === "function" || isReactNode(item.trigger))
  );
}
