import type { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * {@link DrawerPopup} が子パーツへ提供する状態です。
 */
export type DrawerPopupContext = Drawer.Popup.State;

/**
 * ドロワーの修飾を子パーツへ伝播するコンテキストです。
 */
export const DrawerPopupContext: React.Context<DrawerPopupContext | null> =
  React.createContext<DrawerPopupContext | null>(null);

export type IUseDrawerPopupContext = IUseContext<DrawerPopupContext>;

export const useDrawerPopupContext: IUseDrawerPopupContext = function useSuiDrawerPopupContext(
  optional?: boolean,
): any {
  const ctx = React.use(DrawerPopupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "DrawerPopupContext",
      providerName: "DrawerPopup",
    });
  }

  return ctx;
};

export { DrawerPopupContext as PopupContext, useDrawerPopupContext as usePopupContext };
