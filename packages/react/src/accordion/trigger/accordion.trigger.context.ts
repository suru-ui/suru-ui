import type { Accordion } from "@base-ui/react/accordion";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AccordionItemContext } from "../item/accordion.item.context.js";

/**
 * {@link AccordionTrigger} が子パーツへ提供する状態です。
 */
export type AccordionTriggerContext = Readonly<
  Override<
    Override<AccordionItemContext, Accordion.Trigger.State>,
    {
      /**
       * `true` の場合、Suru UI のスタイルがついていません。
       */
      unstyled: boolean;
    }
  >
>;

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
