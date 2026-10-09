import type { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { TooltipContentContext } from "../content/tooltip.content.context.js";

/**
 * {@link TooltipViewport} が子パーツへ提供する状態です。
 */
export type TooltipViewportContext = Readonly<
  Override<TooltipContentContext, Tooltip.Viewport.State>
>;

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
