import type { Collapsible } from "@base-ui/react/collapsible";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { CollapsibleContext } from "../root/collapsible.root.context.js";

/**
 * {@link CollapsibleTrigger} が子パーツへ提供する状態です。
 */
export type CollapsibleTriggerContext = Readonly<
  Override<CollapsibleContext, Collapsible.Trigger.State>
>;

/**
 * {@link CollapsibleTrigger} が子パーツへ提供するコンテキストです。
 */
export const CollapsibleTriggerContext: React.Context<CollapsibleTriggerContext | null> =
  React.createContext<CollapsibleTriggerContext | null>(null);

export type IUseCollapsibleTriggerContext = IUseContext<CollapsibleTriggerContext>;

/**
 * {@link CollapsibleTriggerContext} を読み取るフックです。
 */
export const useCollapsibleTriggerContext: IUseCollapsibleTriggerContext = (optional): any => {
  const ctx = React.use(CollapsibleTriggerContext);

  if (ctx === null && optional !== true) {
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
