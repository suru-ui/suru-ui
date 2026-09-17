import type * as React from "react";

import type { TreeSelectAction } from "./tree.context.js";

/**
 * 修飾キーから項目の選択を変更するアクションを求めます。
 *
 * @param event 選択のきっかけになったイベントです。
 * @returns 選択の変更方法です。
 */
export function getSelectAction(event: React.SyntheticEvent): TreeSelectAction {
  const native = event.nativeEvent as MouseEvent | KeyboardEvent;
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
