import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuLinkItem} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuLinkItemContext<TItem = any> = Readonly<
  Override<ContextMenuContext<TItem>, Override<Button.Root.State, ContextMenu.LinkItem.State>>
>;

/**
 * {@link ContextMenuLinkItem} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuLinkItemContext: React.Context<ContextMenuLinkItemContext | null> =
  React.createContext<ContextMenuLinkItemContext | null>(null);

export type IUseContextMenuLinkItemContext = IUseContext<ContextMenuLinkItemContext>;

/**
 * {@link ContextMenuLinkItemContext} を読み取るフックです。
 */
export const useContextMenuLinkItemContext: IUseContextMenuLinkItemContext =
  function useSuiContextMenuLinkItemContext(optional): any {
    const ctx = React.use(ContextMenuLinkItemContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuLinkItemContext",
        providerName: "ContextMenuLinkItem",
      });
    }

    return ctx;
  };

export {
  ContextMenuLinkItemContext as LinkItemContext,
  useContextMenuLinkItemContext as useLinkItemContext,
};
