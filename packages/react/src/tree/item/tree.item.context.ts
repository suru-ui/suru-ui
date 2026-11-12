import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { TreeContextState } from "../root/tree.root.context.js";
import type { TreeItemRadius } from "./tree.item.jsx";

/**
 * {@link TreeItem} が子パーツへ提供する状態です。
 */
export type TreeItemContext = Readonly<
  Override<
    TreeContextState,
    {
      /** 項目が無効かどうかです。 */
      readonly disabled: boolean;

      /** 項目が展開されているかどうかです。 */
      readonly expanded: boolean;

      /** 項目の角丸です。 */
      readonly radius: TreeItemRadius;

      /** 項目が選択されているかどうかです。 */
      readonly selected: boolean;
    }
  >
>;

/**
 * {@link TreeItem} が子パーツへ提供するコンテキストです。
 */
export const TreeItemContext: React.Context<TreeItemContext | null> =
  React.createContext<TreeItemContext | null>(null);

export type IUseTreeItemContext = IUseContext<TreeItemContext>;

/**
 * {@link TreeItemContext} を読み取るフックです。
 */
export const useTreeItemContext: IUseTreeItemContext = (optional): any => {
  const ctx = React.use(TreeItemContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "TreeItemContext",
      providerName: "TreeItem",
    });
  }

  return ctx;
};

export { TreeItemContext as ItemContext, useTreeItemContext as useItemContext };
