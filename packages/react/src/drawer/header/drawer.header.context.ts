import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DrawerContentContext } from "../content/drawer.content.context.js";

/**
 * {@link DrawerHeader} が子パーツへ提供する状態です。
 */
export type DrawerHeaderContext = Readonly<Override<DrawerContentContext, Record<never, never>>>;

/**
 * {@link DrawerHeader} が子パーツへ提供するコンテキストです。
 */
export const DrawerHeaderContext: React.Context<DrawerHeaderContext | null> =
  React.createContext<DrawerHeaderContext | null>(null);

export type IUseDrawerHeaderContext = IUseContext<DrawerHeaderContext>;

/**
 * {@link DrawerHeaderContext} を読み取るフックです。
 */
export const useDrawerHeaderContext: IUseDrawerHeaderContext = function useSuiDrawerHeaderContext(
  optional,
): any {
  const ctx = React.use(DrawerHeaderContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "DrawerHeaderContext",
      providerName: "DrawerHeader",
    });
  }

  return ctx;
};

export { DrawerHeaderContext as HeaderContext, useDrawerHeaderContext as useHeaderContext };
