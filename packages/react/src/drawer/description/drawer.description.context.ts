import type { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DrawerHeaderContext } from "../header/drawer.header.context.js";

/**
 * {@link DrawerDescription} が子パーツへ提供する状態です。
 */
export type DrawerDescriptionContext = Readonly<
  Override<DrawerHeaderContext, Drawer.Description.State>
>;

/**
 * {@link DrawerDescription} が子パーツへ提供するコンテキストです。
 */
export const DrawerDescriptionContext: React.Context<DrawerDescriptionContext | null> =
  React.createContext<DrawerDescriptionContext | null>(null);

export type IUseDrawerDescriptionContext = IUseContext<DrawerDescriptionContext>;

/**
 * {@link DrawerDescriptionContext} を読み取るフックです。
 */
export const useDrawerDescriptionContext: IUseDrawerDescriptionContext = (optional): any => {
  const ctx = React.use(DrawerDescriptionContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "DrawerDescriptionContext",
      providerName: "DrawerDescription",
    });
  }

  return ctx;
};

export {
  DrawerDescriptionContext as DescriptionContext,
  useDrawerDescriptionContext as useDescriptionContext,
};
