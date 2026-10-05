import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PaginationEllipsisState } from "./pagination.ellipsis.jsx";

/**
 * {@link PaginationEllipsis} が子パーツへ提供する状態です。
 */
export type PaginationEllipsisContext = Readonly<PaginationEllipsisState>;

/**
 * {@link PaginationEllipsis} が子パーツへ提供するコンテキストです。
 */
export const PaginationEllipsisContext: React.Context<PaginationEllipsisContext | null> =
  React.createContext<PaginationEllipsisContext | null>(null);

export type IUsePaginationEllipsisContext = IUseContext<PaginationEllipsisContext>;

/**
 * {@link PaginationEllipsisContext} を読み取るフックです。
 */
export const usePaginationEllipsisContext: IUsePaginationEllipsisContext =
  function useSuiPaginationEllipsisContext(optional): any {
    const ctx = React.use(PaginationEllipsisContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "PaginationEllipsisContext",
        providerName: "PaginationEllipsis",
      });
    }

    return ctx;
  };

export {
  PaginationEllipsisContext as EllipsisContext,
  usePaginationEllipsisContext as useEllipsisContext,
};
