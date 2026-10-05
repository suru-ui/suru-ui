import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { HoverCardViewportState } from "./hover-card.viewport.jsx";

/**
 * {@link HoverCardViewport} が子パーツへ提供する状態です。
 */
export type HoverCardViewportContext = Readonly<HoverCardViewportState>;

/**
 * {@link HoverCardViewport} が子パーツへ提供するコンテキストです。
 */
export const HoverCardViewportContext: React.Context<HoverCardViewportContext | null> =
  React.createContext<HoverCardViewportContext | null>(null);

export type IUseHoverCardViewportContext = IUseContext<HoverCardViewportContext>;

/**
 * {@link HoverCardViewportContext} を読み取るフックです。
 */
export const useHoverCardViewportContext: IUseHoverCardViewportContext =
  function useSuiHoverCardViewportContext(optional): any {
    const ctx = React.use(HoverCardViewportContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "HoverCardViewportContext",
        providerName: "HoverCardViewport",
      });
    }

    return ctx;
  };

export {
  HoverCardViewportContext as ViewportContext,
  useHoverCardViewportContext as useViewportContext,
};
