import type { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { HoverCardContext } from "../root/hover-card.root.context.js";

/**
 * {@link HoverCardViewport} が子パーツへ提供する状態です。
 */
export type HoverCardViewportContext = Readonly<
  Override<HoverCardContext, PreviewCard.Viewport.State>
>;

/**
 * {@link HoverCardViewport} が子パーツへ提供するコンテキストです。
 */
export const HoverCardViewportContext: React.Context<HoverCardViewportContext | null> =
  React.createContext<HoverCardViewportContext | null>(null);

export type IUseHoverCardViewportContext = IUseContext<HoverCardViewportContext>;

/**
 * {@link HoverCardViewportContext} を読み取るフックです。
 */
export const useHoverCardViewportContext: IUseHoverCardViewportContext = (optional): any => {
  const ctx = React.use(HoverCardViewportContext);

  if (ctx === null && optional !== true) {
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
