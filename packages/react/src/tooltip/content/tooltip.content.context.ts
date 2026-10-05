import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { TooltipContentState } from "./tooltip.content.jsx";

/**
 * {@link TooltipContent} が子パーツへ提供する状態です。
 */
export type TooltipContentContext = Readonly<TooltipContentState>;

/**
 * {@link TooltipContent} が子パーツへ提供するコンテキストです。
 */
export const TooltipContentContext: React.Context<TooltipContentContext | null> =
  React.createContext<TooltipContentContext | null>(null);

export type IUseTooltipContentContext = IUseContext<TooltipContentContext>;

/**
 * {@link TooltipContentContext} を読み取るフックです。
 */
export const useTooltipContentContext: IUseTooltipContentContext =
  function useSuiTooltipContentContext(optional): any {
    const ctx = React.use(TooltipContentContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "TooltipContentContext",
        providerName: "TooltipContent",
      });
    }

    return ctx;
  };

export { TooltipContentContext as ContentContext, useTooltipContentContext as useContentContext };
