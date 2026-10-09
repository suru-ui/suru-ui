import type { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContentContext } from "../content/hover-card.content.context.js";

/**
 * {@link HoverCardArrow} が子パーツへ提供する状態です。
 */
export type HoverCardArrowContext = Readonly<Override<ContentContext, PreviewCard.Arrow.State>>;

/**
 * {@link HoverCardArrow} が子パーツへ提供するコンテキストです。
 */
export const HoverCardArrowContext: React.Context<HoverCardArrowContext | null> =
  React.createContext<HoverCardArrowContext | null>(null);

export type IUseHoverCardArrowContext = IUseContext<HoverCardArrowContext>;

/**
 * {@link HoverCardArrowContext} を読み取るフックです。
 */
export const useHoverCardArrowContext: IUseHoverCardArrowContext =
  function useSuiHoverCardArrowContext(optional): any {
    const ctx = React.use(HoverCardArrowContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "HoverCardArrowContext",
        providerName: "HoverCardArrow",
      });
    }

    return ctx;
  };

export { HoverCardArrowContext as ArrowContext, useHoverCardArrowContext as useArrowContext };
