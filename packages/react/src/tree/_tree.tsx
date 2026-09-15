import type * as React from "react";

import type { TreeSelectAction } from "./tree.context.js";

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
