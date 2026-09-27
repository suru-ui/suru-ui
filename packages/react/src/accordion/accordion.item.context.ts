import type { Accordion } from "@base-ui/react/accordion";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * {@link AccordionItem} が子パーツへ提供するコンテキストです。
 */
export type AccordionItemContext = Readonly<Accordion.Item.State>;

/**
 * {@link AccordionItem} が子パーツへ提供するコンテキストです。
 */
export const AccordionItemContext: React.Context<AccordionItemContext | null> =
  React.createContext<AccordionItemContext | null>(null);

export type IUseAccordionItemContext = IUseContext<AccordionItemContext>;

/**
 * {@link AccordionItemContext} を読み取るフックです。
 */
export const useAccordionItemContext: IUseAccordionItemContext =
  function useSuiAccordionItemContext(optional): any {
    const ctx = React.use(AccordionItemContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AccordionItemContext",
        providerName: "AccordionItem",
      });
    }

    return ctx;
  };

export { AccordionItemContext as Context, useAccordionItemContext as useContext };
