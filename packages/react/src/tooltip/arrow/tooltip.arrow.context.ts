import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { TooltipArrowState } from "./tooltip.arrow.jsx";

/**
 * {@link TooltipArrow} が子パーツへ提供する状態です。
 */
export type TooltipArrowContext = Readonly<TooltipArrowState>;

/**
 * {@link TooltipArrow} が子パーツへ提供するコンテキストです。
 */
export const TooltipArrowContext: React.Context<TooltipArrowContext | null> =
  React.createContext<TooltipArrowContext | null>(null);

export type IUseTooltipArrowContext = IUseContext<TooltipArrowContext>;

/**
 * {@link TooltipArrowContext} を読み取るフックです。
 */
export const useTooltipArrowContext: IUseTooltipArrowContext = function useSuiTooltipArrowContext(
  optional,
): any {
  const ctx = React.use(TooltipArrowContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TooltipArrowContext",
      providerName: "TooltipArrow",
    });
  }

  return ctx;
};

export { TooltipArrowContext as ArrowContext, useTooltipArrowContext as useArrowContext };
