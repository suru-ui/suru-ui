import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AccordionTriggerState } from "./accordion.trigger.jsx";

/**
 * {@link AccordionTrigger} が子パーツへ提供する状態です。
 */
export type AccordionTriggerContext = Readonly<AccordionTriggerState>;

/**
 * {@link AccordionTrigger} が子パーツへ提供するコンテキストです。
 */
export const AccordionTriggerContext: React.Context<AccordionTriggerContext | null> =
  React.createContext<AccordionTriggerContext | null>(null);

export type IUseAccordionTriggerContext = IUseContext<AccordionTriggerContext>;

/**
 * {@link AccordionTriggerContext} を読み取るフックです。
 */
export const useAccordionTriggerContext: IUseAccordionTriggerContext =
  function useSuiAccordionTriggerContext(optional?: boolean): any {
    const ctx = React.use(AccordionTriggerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AccordionTriggerContext",
        providerName: "AccordionTrigger",
      });
    }

    return ctx;
  };

export {
  AccordionTriggerContext as TriggerContext,
  useAccordionTriggerContext as useTriggerContext,
};
