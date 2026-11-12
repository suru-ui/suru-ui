import type { Popover } from "@base-ui/react/popover";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PopupContext } from "../popup/popover.popup.context.js";

/**
 * {@link PopoverTitle} が子パーツへ提供する状態です。
 */
export type PopoverTitleContext = Readonly<Override<PopupContext, Popover.Title.State>>;

/**
 * {@link PopoverTitle} が子パーツへ提供するコンテキストです。
 */
export const PopoverTitleContext: React.Context<PopoverTitleContext | null> =
  React.createContext<PopoverTitleContext | null>(null);

export type IUsePopoverTitleContext = IUseContext<PopoverTitleContext>;

/**
 * {@link PopoverTitleContext} を読み取るフックです。
 */
export const usePopoverTitleContext: IUsePopoverTitleContext = (optional): any => {
  const ctx = React.use(PopoverTitleContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "PopoverTitleContext",
      providerName: "PopoverTitle",
    });
  }

  return ctx;
};

export { PopoverTitleContext as TitleContext, usePopoverTitleContext as useTitleContext };
