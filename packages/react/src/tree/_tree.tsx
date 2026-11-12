import type * as React from "react";

import isReactNode from "../_is-react-node.js";
import { isObject } from "../_item.js";
import type { TreeSelectAction } from "./root/tree.root.context.js";
import type { TreeRootItemObject } from "./root/tree.root.jsx";

/**
 * 項目が `id` と `label` を持つオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 *
 * @returns ツリーの項目オブジェクトの場合に `true` を返します。
 */
export function isItemObject(item: unknown): item is TreeRootItemObject {
  return isObject(item) && "id" in item && "label" in item && isReactNode(item.label);
}

/**
 * 修飾キーから項目の選択を変更するアクションを求めます。
 *
 * @param event 選択のきっかけになったイベントです。
 *
 * @returns 選択の変更方法です。
 */
export function getSelectAction(event: React.SyntheticEvent): TreeSelectAction {
  const native = event.nativeEvent;

  if (!(native instanceof MouseEvent) && !(native instanceof KeyboardEvent)) {
    return "only";
  }

  const additive = native.ctrlKey || native.metaKey;
  const ranged = native.shiftKey;

  if (ranged && additive) {
    return "add-range";
  }

  if (ranged) {
    return "range";
  }

  if (additive) {
    return "toggle";
  }

  return "only";
}
