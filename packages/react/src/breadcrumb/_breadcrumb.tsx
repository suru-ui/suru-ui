import isReactNode from "../_is-react-node.js";
import { hasLabel, isObject } from "../_item.js";
import type { BreadcrumbContext } from "./breadcrumb.context.js";
import type { BreadcrumbRootItemObject } from "./breadcrumb.root.jsx";

/**
 * 提供がないときに使う既定のコンテキストです。
 *
 * 値は {@link BreadcrumbRoot} の既定値と揃えています。
 */
export const defaultBreadcrumbContext: BreadcrumbContext = {
  size: "md",
  color: "grey",
  items: [],
};

/**
 * 項目が `label` を持つオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns `label` を持つオブジェクトの場合に `true` を返します。
 */
export function isItemObject(item: unknown): item is BreadcrumbRootItemObject {
  return isObject(item) && hasLabel(item) && isReactNode(item.label);
}
