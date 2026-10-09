import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DrawerContentContext } from "../content/drawer.content.context.js";

/**
 * {@link DrawerFooter} が子パーツへ提供する状態です。
 */
export type DrawerFooterContext = Readonly<Override<DrawerContentContext, Record<never, never>>>;

/**
 * {@link DrawerFooter} が子パーツへ提供するコンテキストです。
 */
export const DrawerFooterContext: React.Context<DrawerFooterContext | null> =
  React.createContext<DrawerFooterContext | null>(null);

export type IUseDrawerFooterContext = IUseContext<DrawerFooterContext>;

/**
 * {@link DrawerFooterContext} を読み取るフックです。
 */
export const useDrawerFooterContext: IUseDrawerFooterContext = function useSuiDrawerFooterContext(
  optional,
): any {
  const ctx = React.use(DrawerFooterContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "DrawerFooterContext",
      providerName: "DrawerFooter",
    });
  }

  return ctx;
};

export { DrawerFooterContext as FooterContext, useDrawerFooterContext as useFooterContext };
