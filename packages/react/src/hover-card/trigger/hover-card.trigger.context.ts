import type { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { HoverCardContext } from "../root/hover-card.root.context.js";

/**
 * {@link HoverCardTrigger} が子パーツへ提供する状態です。
 */
export type HoverCardTriggerContext = Readonly<
  Override<HoverCardContext, PreviewCard.Trigger.State>
>;

/**
 * {@link HoverCardTrigger} が子パーツへ提供するコンテキストです。
 */
export const HoverCardTriggerContext: React.Context<HoverCardTriggerContext | null> =
  React.createContext<HoverCardTriggerContext | null>(null);

export type IUseHoverCardTriggerContext = IUseContext<HoverCardTriggerContext>;

/**
 * {@link HoverCardTriggerContext} を読み取るフックです。
 */
export const useHoverCardTriggerContext: IUseHoverCardTriggerContext =
  function useSuiHoverCardTriggerContext(optional): any {
    const ctx = React.use(HoverCardTriggerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "HoverCardTriggerContext",
        providerName: "HoverCardTrigger",
      });
    }

    return ctx;
  };

export {
  HoverCardTriggerContext as TriggerContext,
  useHoverCardTriggerContext as useTriggerContext,
};
