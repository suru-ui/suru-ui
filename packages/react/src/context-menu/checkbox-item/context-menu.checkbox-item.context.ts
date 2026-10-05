import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuCheckboxItem} が子パーツへ提供する状態です。
 */
export type ContextMenuCheckboxItemContext = Readonly<
  Override<ContextMenuContext, Override<Button.Root.State, ContextMenu.CheckboxItem.State>>
>;

/**
 * {@link ContextMenuCheckboxItem} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuCheckboxItemContext: React.Context<ContextMenuCheckboxItemContext | null> =
  React.createContext<ContextMenuCheckboxItemContext | null>(null);

export type IUseContextMenuCheckboxItemContext = IUseContext<ContextMenuCheckboxItemContext>;

/**
 * {@link ContextMenuCheckboxItemContext} を読み取るフックです。
 */
export const useContextMenuCheckboxItemContext: IUseContextMenuCheckboxItemContext =
  function useSuiContextMenuCheckboxItemContext(optional): any {
    const ctx = React.use(ContextMenuCheckboxItemContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuCheckboxItemContext",
        providerName: "ContextMenuCheckboxItem",
      });
    }

    return ctx;
  };

export {
  ContextMenuCheckboxItemContext as CheckboxItemContext,
  useContextMenuCheckboxItemContext as useCheckboxItemContext,
};
