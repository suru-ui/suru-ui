import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DrawerHeaderContext } from "../header/drawer.header.context.js";

/**
 * {@link DrawerControls} が子パーツへ提供する状態です。
 */
export type DrawerControlsContext = Readonly<Override<DrawerHeaderContext, Record<never, never>>>;

/**
 * {@link DrawerControls} が子パーツへ提供するコンテキストです。
 */
export const DrawerControlsContext: React.Context<DrawerControlsContext | null> =
  React.createContext<DrawerControlsContext | null>(null);

export type IUseDrawerControlsContext = IUseContext<DrawerControlsContext>;

/**
 * {@link DrawerControlsContext} を読み取るフックです。
 */
export const useDrawerControlsContext: IUseDrawerControlsContext =
  function useSuiDrawerControlsContext(optional): any {
    const ctx = React.use(DrawerControlsContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "DrawerControlsContext",
        providerName: "DrawerControls",
      });
    }

    return ctx;
  };

export { DrawerControlsContext as ControlsContext, useDrawerControlsContext as useControlsContext };
