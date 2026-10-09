import type { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DrawerPopupContext } from "../popup/drawer.popup.context.js";

/**
 * {@link DrawerContent} が子パーツへ提供する状態です。
 */
export type DrawerContentContext = Readonly<Override<DrawerPopupContext, Drawer.Content.State>>;

/**
 * {@link DrawerContent} が子パーツへ提供するコンテキストです。
 */
export const DrawerContentContext: React.Context<DrawerContentContext | null> =
  React.createContext<DrawerContentContext | null>(null);

export type IUseDrawerContentContext = IUseContext<DrawerContentContext>;

/**
 * {@link DrawerContentContext} を読み取るフックです。
 */
export const useDrawerContentContext: IUseDrawerContentContext =
  function useSuiDrawerContentContext(optional): any {
    const ctx = React.use(DrawerContentContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "DrawerContentContext",
        providerName: "DrawerContent",
      });
    }

    return ctx;
  };

export { DrawerContentContext as ContentContext, useDrawerContentContext as useContentContext };
