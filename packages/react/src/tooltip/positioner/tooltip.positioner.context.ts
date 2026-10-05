import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { TooltipPositionerState } from "./tooltip.positioner.jsx";

/**
 * {@link TooltipPositioner} が子パーツへ提供する状態です。
 */
export type TooltipPositionerContext = Readonly<TooltipPositionerState>;

/**
 * {@link TooltipPositioner} が子パーツへ提供するコンテキストです。
 */
export const TooltipPositionerContext: React.Context<TooltipPositionerContext | null> =
  React.createContext<TooltipPositionerContext | null>(null);

export type IUseTooltipPositionerContext = IUseContext<TooltipPositionerContext>;

/**
 * {@link TooltipPositionerContext} を読み取るフックです。
 */
export const useTooltipPositionerContext: IUseTooltipPositionerContext =
  function useSuiTooltipPositionerContext(optional): any {
    const ctx = React.use(TooltipPositionerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "TooltipPositionerContext",
        providerName: "TooltipPositioner",
      });
    }

    return ctx;
  };

export {
  TooltipPositionerContext as PositionerContext,
  useTooltipPositionerContext as usePositionerContext,
};
