import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { CollapsibleTriggerState } from "./collapsible.trigger.jsx";

/**
 * {@link CollapsibleTrigger} が子パーツへ提供する状態です。
 */
export type CollapsibleTriggerContext = Readonly<CollapsibleTriggerState>;

/**
 * {@link CollapsibleTrigger} が子パーツへ提供するコンテキストです。
 */
export const CollapsibleTriggerContext: React.Context<CollapsibleTriggerContext | null> =
  React.createContext<CollapsibleTriggerContext | null>(null);

export type IUseCollapsibleTriggerContext = IUseContext<CollapsibleTriggerContext>;

/**
 * {@link CollapsibleTriggerContext} を読み取るフックです。
 */
export const useCollapsibleTriggerContext: IUseCollapsibleTriggerContext =
  function useSuiCollapsibleTriggerContext(optional): any {
    const ctx = React.use(CollapsibleTriggerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "CollapsibleTriggerContext",
        providerName: "CollapsibleTrigger",
      });
    }

    return ctx;
  };

export {
  CollapsibleTriggerContext as TriggerContext,
  useCollapsibleTriggerContext as useTriggerContext,
};
