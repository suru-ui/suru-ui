import isReactNode from "../_is-react-node.js";
import type { MenubarRootItemObject } from "./menubar.root.jsx";

/**
 * メニューバーの項目であるオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns メニューバーの項目である場合に `true` を返します。
 */
export function isItemObject(item: unknown): item is MenubarRootItemObject {
  return (
    typeof item === "object" &&
    item !== null &&
    "items" in item &&
    Array.isArray(item.items) &&
    "trigger" in item &&
    (typeof item === "function" || isReactNode(item.trigger))
  );
}
