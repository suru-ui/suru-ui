import type { SelectRootItemGroup, SelectRootLabeledItem } from "./select.root.jsx";

/**
 * 値がラベル付き項目かどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns ラベル付き項目の場合に `true` を返します。
 */
export function isLabeledItem(item: unknown): item is SelectRootLabeledItem {
  return typeof item === "object" && item !== null && "value" in item && "label" in item;
}

/**
 * 値が項目グループかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns 項目グループの場合に `true` を返します。
 */
export function isItemGroup(item: unknown): item is SelectRootItemGroup {
  return (
    typeof item === "object" &&
    item !== null &&
    "items" in item &&
    (Array.isArray(item.items) || (typeof item.items === "object" && item.items !== null))
  );
}
