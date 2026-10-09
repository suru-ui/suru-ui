import type { Popover } from "@base-ui/react/popover";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContentContext } from "../content/popover.content.context.js";

/**
 * {@link PopoverClose} が子パーツへ提供する状態です。
 */
export type PopoverCloseContext = Readonly<Override<ContentContext, Popover.Close.State>>;

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
