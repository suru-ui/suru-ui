import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuSeparator} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuSeparatorContext<TItem = any> = Readonly<
  Override<ContextMenuContext<TItem>, ContextMenu.Separator.State>
>;

/**
 * {@link ContextMenuSeparator} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuSeparatorContext: React.Context<ContextMenuSeparatorContext | null> =
  React.createContext<ContextMenuSeparatorContext | null>(null);

export type IUseContextMenuSeparatorContext = IUseContext<ContextMenuSeparatorContext>;

/**
 * {@link ContextMenuSeparatorContext} を読み取るフックです。
 */
export const useContextMenuSeparatorContext: IUseContextMenuSeparatorContext = (optional): any => {
  const ctx = React.use(ContextMenuSeparatorContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ContextMenuSeparatorContext",
      providerName: "ContextMenuSeparator",
    });
  }

  return ctx;
};

export {
  ContextMenuSeparatorContext as SeparatorContext,
  useContextMenuSeparatorContext as useSeparatorContext,
};
