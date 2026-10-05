import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PopoverCloseState } from "./popover.close.jsx";

/**
 * {@link PopoverClose} が子パーツへ提供する状態です。
 */
export type PopoverCloseContext = Readonly<PopoverCloseState>;

/**
 * {@link PopoverClose} が子パーツへ提供するコンテキストです。
 */
export const PopoverCloseContext: React.Context<PopoverCloseContext | null> =
  React.createContext<PopoverCloseContext | null>(null);

export type IUsePopoverCloseContext = IUseContext<PopoverCloseContext>;

/**
 * {@link PopoverCloseContext} を読み取るフックです。
 */
export const usePopoverCloseContext: IUsePopoverCloseContext = function useSuiPopoverCloseContext(
  optional,
): any {
  const ctx = React.use(PopoverCloseContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "PopoverCloseContext",
      providerName: "PopoverClose",
    });
  }

  return ctx;
};

export { PopoverCloseContext as CloseContext, usePopoverCloseContext as useCloseContext };
