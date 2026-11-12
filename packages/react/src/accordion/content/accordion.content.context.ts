import type { Accordion } from "@base-ui/react/accordion";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AccordionItemContext } from "../item/accordion.item.context.js";

/**
 * {@link AccordionContent} が子パーツへ提供する状態です。
 */
export type AccordionContentContext = Readonly<
  Override<AccordionItemContext, Accordion.Panel.State>
>;

/**
 * {@link AccordionContent} が子パーツへ提供するコンテキストです。
 */
export const AccordionContentContext: React.Context<AccordionContentContext | null> =
  React.createContext<AccordionContentContext | null>(null);

export type IUseAccordionContentContext = IUseContext<AccordionContentContext>;

/**
 * {@link AccordionContentContext} を読み取るフックです。
 */
export const useAccordionContentContext: IUseAccordionContentContext = (optional): any => {
  const ctx = React.use(AccordionContentContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "AccordionContentContext",
      providerName: "AccordionContent",
    });
  }

  return ctx;
};

export {
  AccordionContentContext as ContentContext,
  useAccordionContentContext as useContentContext,
};
