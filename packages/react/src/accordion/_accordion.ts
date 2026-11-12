import isReactNode from "../_is-react-node.js";
import { isObject } from "../_item.js";
import type { Override } from "../types.js";
import type { AccordionRootItemObject } from "./root/accordion.root.jsx";

/**
 * 項目オブジェクトの値を推論します。
 *
 * @template TItem 項目の型です。
 */
export type $InferItemObjectValue<TItem> =
  TItem extends Override<AccordionRootItemObject, { value?: infer TItemValue }> ? TItemValue : any;

/**
 * 項目が `title` と `content` を持つオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 *
 * @returns `title` と `content` を持つオブジェクトの場合に `true` を返します。
 */
export function isItemObject(item: unknown): item is AccordionRootItemObject {
  return (
    isObject(item) &&
    "title" in item &&
    "content" in item &&
    isReactNode(item.title) &&
    isReactNode(item.content)
  );
}
