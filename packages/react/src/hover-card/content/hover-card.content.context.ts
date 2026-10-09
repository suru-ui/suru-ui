import type { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PositionerContext } from "../positioner/hover-card.positioner.context.js";

/**
 * {@link HoverCardContent} が子パーツへ提供する状態です。
 */
export type HoverCardContentContext = Readonly<
  Override<PositionerContext, PreviewCard.Popup.State>
>;

/**
 * {@link HoverCardContent} が子パーツへ提供するコンテキストです。
 */
export const HoverCardContentContext: React.Context<HoverCardContentContext | null> =
  React.createContext<HoverCardContentContext | null>(null);

export type IUseHoverCardContentContext = IUseContext<HoverCardContentContext>;

/**
 * {@link HoverCardContentContext} を読み取るフックです。
 */
export const useHoverCardContentContext: IUseHoverCardContentContext =
  function useSuiHoverCardContentContext(optional): any {
    const ctx = React.use(HoverCardContentContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "HoverCardContentContext",
        providerName: "HoverCardContent",
      });
    }

    return ctx;
  };

export {
  HoverCardContentContext as ContentContext,
  useHoverCardContentContext as useContentContext,
};
