import isReactNode from "../_is-react-node.js";
import { hasLabel, isObject } from "../_item.js";
import type { BreadcrumbRootItemObject } from "./root/breadcrumb.root.jsx";

/**
 * 項目が `label` を持つオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns `label` を持つオブジェクトの場合に `true` を返します。
 */
export function isItemObject(item: unknown): item is BreadcrumbRootItemObject {
  return isObject(item) && hasLabel(item) && isReactNode(item.label);
}
