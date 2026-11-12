import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuSubmenuTrigger} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuSubmenuTriggerContext<TItem = any> = Readonly<
  Override<ContextMenuContext<TItem>, Override<Button.Root.State, ContextMenu.SubmenuTrigger.State>>
>;

/**
 * {@link ContextMenuSubmenuTrigger} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuSubmenuTriggerContext: React.Context<ContextMenuSubmenuTriggerContext | null> =
  React.createContext<ContextMenuSubmenuTriggerContext | null>(null);

export type IUseContextMenuSubmenuTriggerContext = IUseContext<ContextMenuSubmenuTriggerContext>;

/**
 * {@link ContextMenuSubmenuTriggerContext} を読み取るフックです。
 */
export const useContextMenuSubmenuTriggerContext: IUseContextMenuSubmenuTriggerContext = (
  optional,
): any => {
  const ctx = React.use(ContextMenuSubmenuTriggerContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ContextMenuSubmenuTriggerContext",
      providerName: "ContextMenuSubmenuTrigger",
    });
  }

  return ctx;
};

export {
  ContextMenuSubmenuTriggerContext as SubmenuTriggerContext,
  useContextMenuSubmenuTriggerContext as useSubmenuTriggerContext,
};
