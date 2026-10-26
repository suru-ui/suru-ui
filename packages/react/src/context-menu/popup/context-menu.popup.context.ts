import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PositionerContext } from "../positioner/context-menu.positioner.context.js";

/**
 * {@link ContextMenuPopup} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuPopupContext<TItem = any> = Readonly<
  Override<PositionerContext<TItem>, ContextMenu.Popup.State>
>;

/**
 * {@link ContextMenuPopup} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuPopupContext: React.Context<ContextMenuPopupContext | null> =
  React.createContext<ContextMenuPopupContext | null>(null);

export type IUseContextMenuPopupContext = IUseContext<ContextMenuPopupContext>;

/**
 * {@link ContextMenuPopupContext} を読み取るフックです。
 */
export const useContextMenuPopupContext: IUseContextMenuPopupContext =
  function useSuiContextMenuPopupContext(optional): any {
    const ctx = React.use(ContextMenuPopupContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuPopupContext",
        providerName: "ContextMenuPopup",
      });
    }

    return ctx;
  };

export { ContextMenuPopupContext as PopupContext, useContextMenuPopupContext as usePopupContext };
