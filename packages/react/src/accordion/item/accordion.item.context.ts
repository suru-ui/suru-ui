import type { Accordion } from "@base-ui/react/accordion";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AccordionContext } from "../root/accordion.root.context.js";

/**
 * {@link AccordionItem} が子パーツへ提供する状態です。
 */
export type AccordionItemContext = Readonly<Override<AccordionContext, Accordion.Item.State>>;

/**
 * {@link AccordionItem} が子パーツへ提供するコンテキストです。
 */
export const AccordionItemContext: React.Context<AccordionItemContext | null> =
  React.createContext<AccordionItemContext | null>(null);

export type IUseAccordionItemContext = IUseContext<AccordionItemContext>;

/**
 * {@link AccordionItemContext} を読み取るフックです。
 */
export const useAccordionItemContext: IUseAccordionItemContext = (optional): any => {
  const ctx = React.use(AccordionItemContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "AccordionItemContext",
      providerName: "AccordionItem",
    });
  }

  return ctx;
};

export { AccordionItemContext as ItemContext, useAccordionItemContext as useItemContext };
