import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AccordionHeadingState } from "./accordion.heading.jsx";

/**
 * {@link AccordionHeading} が子パーツへ提供する状態です。
 */
export type AccordionHeadingContext = Readonly<AccordionHeadingState>;

/**
 * {@link AccordionHeading} が子パーツへ提供するコンテキストです。
 */
export const AccordionHeadingContext: React.Context<AccordionHeadingContext | null> =
  React.createContext<AccordionHeadingContext | null>(null);

export type IUseAccordionHeadingContext = IUseContext<AccordionHeadingContext>;

/**
 * {@link AccordionHeadingContext} を読み取るフックです。
 */
export const useAccordionHeadingContext: IUseAccordionHeadingContext =
  function useSuiAccordionHeadingContext(optional): any {
    const ctx = React.use(AccordionHeadingContext);
    if (ctx === null && !optional) {
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
