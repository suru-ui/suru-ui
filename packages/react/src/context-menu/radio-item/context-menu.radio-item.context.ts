import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuRadioItem} が子パーツへ提供する状態です。
 */
export type ContextMenuRadioItemContext = Readonly<
  Override<ContextMenuContext, Override<Button.Root.State, ContextMenu.RadioItem.State>>
>;

/**
 * {@link ContextMenuRadioItem} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuRadioItemContext: React.Context<ContextMenuRadioItemContext | null> =
  React.createContext<ContextMenuRadioItemContext | null>(null);

export type IUseContextMenuRadioItemContext = IUseContext<ContextMenuRadioItemContext>;

/**
 * {@link ContextMenuRadioItemContext} を読み取るフックです。
 */
export const useContextMenuRadioItemContext: IUseContextMenuRadioItemContext =
  function useSuiContextMenuRadioItemContext(optional): any {
    const ctx = React.use(ContextMenuRadioItemContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuRadioItemContext",
        providerName: "ContextMenuRadioItem",
      });
    }

    return ctx;
  };

export {
  ContextMenuRadioItemContext as RadioItemContext,
  useContextMenuRadioItemContext as useRadioItemContext,
};
