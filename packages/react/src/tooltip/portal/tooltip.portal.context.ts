import type { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { TooltipContext } from "../root/tooltip.root.context.js";

/**
 * {@link TooltipPortal} が子パーツへ提供する状態です。
 */
export type TooltipPortalContext = Readonly<Override<TooltipContext, Tooltip.Portal.State>>;

/**
 * {@link TooltipPortal} が子パーツへ提供するコンテキストです。
 */
export const TooltipPortalContext: React.Context<TooltipPortalContext | null> =
  React.createContext<TooltipPortalContext | null>(null);

export type IUseTooltipPortalContext = IUseContext<TooltipPortalContext>;

/**
 * {@link TooltipPortalContext} を読み取るフックです。
 */
export const useTooltipPortalContext: IUseTooltipPortalContext =
  function useSuiTooltipPortalContext(optional): any {
    const ctx = React.use(TooltipPortalContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "TooltipPortalContext",
        providerName: "TooltipPortal",
      });
    }

    return ctx;
  };

export { TooltipPortalContext as PortalContext, useTooltipPortalContext as usePortalContext };
