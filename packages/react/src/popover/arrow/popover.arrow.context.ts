import type { Popover } from "@base-ui/react/popover";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PopoverContext } from "../root/popover.root.context.js";

/**
 * {@link PopoverArrow} が子パーツへ提供する状態です。
 */
export type PopoverArrowContext = Readonly<Override<PopoverContext, Popover.Arrow.State>>;

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
