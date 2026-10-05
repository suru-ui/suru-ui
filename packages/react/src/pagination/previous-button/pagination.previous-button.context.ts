import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PaginationPreviousButtonState } from "./pagination.previous-button.jsx";

/**
 * {@link PaginationPreviousButton} が子パーツへ提供する状態です。
 */
export type PaginationPreviousButtonContext = Readonly<PaginationPreviousButtonState>;

/**
 * {@link PaginationPreviousButton} が子パーツへ提供するコンテキストです。
 */
export const PaginationPreviousButtonContext: React.Context<PaginationPreviousButtonContext | null> =
  React.createContext<PaginationPreviousButtonContext | null>(null);

export type IUsePaginationPreviousButtonContext = IUseContext<PaginationPreviousButtonContext>;

/**
 * {@link PaginationPreviousButtonContext} を読み取るフックです。
 */
export const usePaginationPreviousButtonContext: IUsePaginationPreviousButtonContext =
  function useSuiPaginationPreviousButtonContext(optional): any {
    const ctx = React.use(PaginationPreviousButtonContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "PaginationPreviousButtonContext",
        providerName: "PaginationPreviousButton",
      });
    }

    return ctx;
  };

export {
  PaginationPreviousButtonContext as PreviousButtonContext,
  usePaginationPreviousButtonContext as usePreviousButtonContext,
};
