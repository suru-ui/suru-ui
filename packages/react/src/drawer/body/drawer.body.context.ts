import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DrawerContentContext } from "../content/drawer.content.context.js";

/**
 * {@link DrawerBody} が子パーツへ提供する状態です。
 */
export type DrawerBodyContext = Readonly<Override<DrawerContentContext, Record<never, never>>>;

/**
 * {@link DrawerBody} が子パーツへ提供するコンテキストです。
 */
export const DrawerBodyContext: React.Context<DrawerBodyContext | null> =
  React.createContext<DrawerBodyContext | null>(null);

export type IUseDrawerBodyContext = IUseContext<DrawerBodyContext>;

/**
 * {@link DrawerBodyContext} を読み取るフックです。
 */
export const useDrawerBodyContext: IUseDrawerBodyContext = function useSuiDrawerBodyContext(
  optional,
): any {
  const ctx = React.use(DrawerBodyContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "DrawerBodyContext",
      providerName: "DrawerBody",
    });
  }

  return ctx;
};

export { DrawerBodyContext as BodyContext, useDrawerBodyContext as useBodyContext };
