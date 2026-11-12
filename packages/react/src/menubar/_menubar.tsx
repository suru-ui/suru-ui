import isReactNode from "../_is-react-node.js";
import { hasItems, isObject } from "../_item.js";
import type { MenubarRootItemObject } from "./root/menubar.root.jsx";

/**
 * メニューバーの項目であるオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 *
 * @returns メニューバーの項目である場合に `true` を返します。
 */
export function isItemObject(item: unknown): item is MenubarRootItemObject {
  return (
    isObject(item) &&
    hasItems(item) &&
    "trigger" in item &&
    (typeof item.trigger === "function" || isReactNode(item.trigger))
  );
}
