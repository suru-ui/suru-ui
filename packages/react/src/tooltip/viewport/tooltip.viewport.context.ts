import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { TooltipViewportState } from "./tooltip.viewport.jsx";

/**
 * {@link TooltipViewport} が子パーツへ提供する状態です。
 */
export type TooltipViewportContext = Readonly<TooltipViewportState>;

/**
 * {@link TooltipViewport} が子パーツへ提供するコンテキストです。
 */
export const TooltipViewportContext: React.Context<TooltipViewportContext | null> =
  React.createContext<TooltipViewportContext | null>(null);

export type IUseTooltipViewportContext = IUseContext<TooltipViewportContext>;

/**
 * {@link TooltipViewportContext} を読み取るフックです。
 */
export const useTooltipViewportContext: IUseTooltipViewportContext =
  function useSuiTooltipViewportContext(optional): any {
    const ctx = React.use(TooltipViewportContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "TooltipViewportContext",
        providerName: "TooltipViewport",
      });
    }

    return ctx;
  };

export {
  TooltipViewportContext as ViewportContext,
  useTooltipViewportContext as useViewportContext,
};
