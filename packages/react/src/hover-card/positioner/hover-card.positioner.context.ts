import type { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PortalContext } from "../portal/hover-card.portal.context.js";

/**
 * {@link HoverCardPositioner} が子パーツへ提供する状態です。
 */
export type HoverCardPositionerContext = Readonly<
  Override<PortalContext, PreviewCard.Positioner.State>
>;

/**
 * {@link HoverCardPositioner} が子パーツへ提供するコンテキストです。
 */
export const HoverCardPositionerContext: React.Context<HoverCardPositionerContext | null> =
  React.createContext<HoverCardPositionerContext | null>(null);

export type IUseHoverCardPositionerContext = IUseContext<HoverCardPositionerContext>;

/**
 * {@link HoverCardPositionerContext} を読み取るフックです。
 */
export const useHoverCardPositionerContext: IUseHoverCardPositionerContext = (optional): any => {
  const ctx = React.use(HoverCardPositionerContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "HoverCardPositionerContext",
      providerName: "HoverCardPositioner",
    });
  }

  return ctx;
};

export {
  HoverCardPositionerContext as PositionerContext,
  useHoverCardPositionerContext as usePositionerContext,
};
