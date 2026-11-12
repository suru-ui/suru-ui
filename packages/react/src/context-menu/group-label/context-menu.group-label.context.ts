import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { GroupContext } from "../group/context-menu.group.context.js";

/**
 * {@link ContextMenuGroupLabel} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuGroupLabelContext<TItem = any> = Readonly<
  Override<GroupContext<TItem>, ContextMenu.GroupLabel.State>
>;

/**
 * {@link ContextMenuGroupLabel} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuGroupLabelContext: React.Context<ContextMenuGroupLabelContext | null> =
  React.createContext<ContextMenuGroupLabelContext | null>(null);

export type IUseContextMenuGroupLabelContext = IUseContext<ContextMenuGroupLabelContext>;

/**
 * {@link ContextMenuGroupLabelContext} を読み取るフックです。
 */
export const useContextMenuGroupLabelContext: IUseContextMenuGroupLabelContext = (
  optional,
): any => {
  const ctx = React.use(ContextMenuGroupLabelContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ContextMenuGroupLabelContext",
      providerName: "ContextMenuGroupLabel",
    });
  }

  return ctx;
};

export {
  ContextMenuGroupLabelContext as GroupLabelContext,
  useContextMenuGroupLabelContext as useGroupLabelContext,
};
