import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PaginationNextButtonState } from "./pagination.next-button.jsx";

/**
 * {@link PaginationNextButton} が子パーツへ提供する状態です。
 */
export type PaginationNextButtonContext = Readonly<PaginationNextButtonState>;

/**
 * {@link PaginationNextButton} が子パーツへ提供するコンテキストです。
 */
export const PaginationNextButtonContext: React.Context<PaginationNextButtonContext | null> =
  React.createContext<PaginationNextButtonContext | null>(null);

export type IUsePaginationNextButtonContext = IUseContext<PaginationNextButtonContext>;

/**
 * {@link PaginationNextButtonContext} を読み取るフックです。
 */
export const usePaginationNextButtonContext: IUsePaginationNextButtonContext =
  function useSuiPaginationNextButtonContext(optional): any {
    const ctx = React.use(PaginationNextButtonContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "PaginationNextButtonContext",
        providerName: "PaginationNextButton",
      });
    }

    return ctx;
  };

export {
  PaginationNextButtonContext as NextButtonContext,
  usePaginationNextButtonContext as useNextButtonContext,
};
