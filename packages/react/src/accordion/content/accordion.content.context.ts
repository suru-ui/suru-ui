import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AccordionContentState } from "./accordion.content.jsx";

/**
 * {@link AccordionContent} が子パーツへ提供する状態です。
 */
export type AccordionContentContext = Readonly<AccordionContentState>;

/**
 * {@link AccordionContent} が子パーツへ提供するコンテキストです。
 */
export const AccordionContentContext: React.Context<AccordionContentContext | null> =
  React.createContext<AccordionContentContext | null>(null);

export type IUseAccordionContentContext = IUseContext<AccordionContentContext>;

/**
 * {@link AccordionContentContext} を読み取るフックです。
 */
export const useAccordionContentContext: IUseAccordionContentContext =
  function useSuiAccordionContentContext(optional): any {
    const ctx = React.use(AccordionContentContext);
    if (ctx === null && !optional) {
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
