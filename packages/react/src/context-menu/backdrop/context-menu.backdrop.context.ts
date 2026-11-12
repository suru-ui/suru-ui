import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuBackdrop} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuBackdropContext<TItem = any> = Readonly<
  Override<ContextMenuContext<TItem>, ContextMenu.Backdrop.State>
>;

/**
 * {@link ContextMenuBackdrop} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuBackdropContext: React.Context<ContextMenuBackdropContext | null> =
  React.createContext<ContextMenuBackdropContext | null>(null);

export type IUseContextMenuBackdropContext = IUseContext<ContextMenuBackdropContext>;

/**
 * {@link ContextMenuBackdropContext} を読み取るフックです。
 */
export const useContextMenuBackdropContext: IUseContextMenuBackdropContext = (optional): any => {
  const ctx = React.use(ContextMenuBackdropContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ContextMenuBackdropContext",
      providerName: "ContextMenuBackdrop",
    });
  }

  return ctx;
};

export {
  ContextMenuBackdropContext as BackdropContext,
  useContextMenuBackdropContext as useBackdropContext,
};
