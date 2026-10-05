import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PopoverArrowState } from "./popover.arrow.jsx";

/**
 * {@link PopoverArrow} が子パーツへ提供する状態です。
 */
export type PopoverArrowContext = Readonly<PopoverArrowState>;

/**
 * {@link PopoverArrow} が子パーツへ提供するコンテキストです。
 */
export const PopoverArrowContext: React.Context<PopoverArrowContext | null> =
  React.createContext<PopoverArrowContext | null>(null);

export type IUsePopoverArrowContext = IUseContext<PopoverArrowContext>;

/**
 * {@link PopoverArrowContext} を読み取るフックです。
 */
export const usePopoverArrowContext: IUsePopoverArrowContext = function useSuiPopoverArrowContext(
  optional,
): any {
  const ctx = React.use(PopoverArrowContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "PopoverArrowContext",
      providerName: "PopoverArrow",
    });
  }

  return ctx;
};

export { PopoverArrowContext as ArrowContext, usePopoverArrowContext as useArrowContext };
