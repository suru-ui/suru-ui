import type { Accordion } from "@base-ui/react/accordion";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AccordionItemContext } from "../item/accordion.item.context.js";

/**
 * {@link AccordionHeading} が子パーツへ提供する状態です。
 */
export type AccordionHeadingContext = Readonly<
  Override<AccordionItemContext, Accordion.Header.State>
>;

/**
 * {@link AccordionHeading} が子パーツへ提供するコンテキストです。
 */
export const AccordionHeadingContext: React.Context<AccordionHeadingContext | null> =
  React.createContext<AccordionHeadingContext | null>(null);

export type IUseAccordionHeadingContext = IUseContext<AccordionHeadingContext>;

/**
 * {@link AccordionHeadingContext} を読み取るフックです。
 */
export const useAccordionHeadingContext: IUseAccordionHeadingContext = (optional): any => {
  const ctx = React.use(AccordionHeadingContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "AccordionHeadingContext",
      providerName: "AccordionHeading",
    });
  }

  return ctx;
};

export {
  AccordionHeadingContext as HeadingContext,
  useAccordionHeadingContext as useHeadingContext,
};
