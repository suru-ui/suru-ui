import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { TreeItemState } from "./tree.item.jsx";

/**
 * {@link TreeItem} が子パーツへ提供する状態です。
 */
export type TreeItemContext = Readonly<TreeItemState>;

/**
 * {@link TreeItem} が子パーツへ提供するコンテキストです。
 */
export const TreeItemContext: React.Context<TreeItemContext | null> =
  React.createContext<TreeItemContext | null>(null);

export type IUseTreeItemContext = IUseContext<TreeItemContext>;

/**
 * {@link TreeItemContext} を読み取るフックです。
 */
export const useTreeItemContext: IUseTreeItemContext = function useSuiTreeItemContext(
  optional,
): any {
  const ctx = React.use(TreeItemContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TreeItemContext",
      providerName: "TreeItem",
    });
  }

  return ctx;
};

export { TreeItemContext as ItemContext, useTreeItemContext as useItemContext };
