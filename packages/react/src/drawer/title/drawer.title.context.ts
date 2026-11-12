import type { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DrawerHeaderContext } from "../header/drawer.header.context.js";

/**
 * {@link DrawerTitle} が子パーツへ提供する状態です。
 */
export type DrawerTitleContext = Readonly<Override<DrawerHeaderContext, Drawer.Title.State>>;

/**
 * {@link DrawerTitle} が子パーツへ提供するコンテキストです。
 */
export const DrawerTitleContext: React.Context<DrawerTitleContext | null> =
  React.createContext<DrawerTitleContext | null>(null);

export type IUseDrawerTitleContext = IUseContext<DrawerTitleContext>;

/**
 * {@link DrawerTitleContext} を読み取るフックです。
 */
export const useDrawerTitleContext: IUseDrawerTitleContext = (optional): any => {
  const ctx = React.use(DrawerTitleContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "DrawerTitleContext",
      providerName: "DrawerTitle",
    });
  }

  return ctx;
};

export { DrawerTitleContext as TitleContext, useDrawerTitleContext as useTitleContext };
