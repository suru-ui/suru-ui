import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PopoverTitleState } from "./popover.title.jsx";

/**
 * {@link PopoverTitle} が子パーツへ提供する状態です。
 */
export type PopoverTitleContext = Readonly<PopoverTitleState>;

/**
 * {@link PopoverTitle} が子パーツへ提供するコンテキストです。
 */
export const PopoverTitleContext: React.Context<PopoverTitleContext | null> =
  React.createContext<PopoverTitleContext | null>(null);

export type IUsePopoverTitleContext = IUseContext<PopoverTitleContext>;

/**
 * {@link PopoverTitleContext} を読み取るフックです。
 */
export const usePopoverTitleContext: IUsePopoverTitleContext = function useSuiPopoverTitleContext(
  optional,
): any {
  const ctx = React.use(PopoverTitleContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "PopoverTitleContext",
      providerName: "PopoverTitle",
    });
  }

  return ctx;
};

export { PopoverTitleContext as TitleContext, usePopoverTitleContext as useTitleContext };
