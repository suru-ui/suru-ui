import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PaginationItemState } from "./pagination.item.jsx";

/**
 * {@link PaginationItem} が子パーツへ提供する状態です。
 */
export type PaginationItemContext = Readonly<PaginationItemState>;

/**
 * {@link PaginationItem} が子パーツへ提供するコンテキストです。
 */
export const PaginationItemContext: React.Context<PaginationItemContext | null> =
  React.createContext<PaginationItemContext | null>(null);

export type IUsePaginationItemContext = IUseContext<PaginationItemContext>;

/**
 * {@link PaginationItemContext} を読み取るフックです。
 */
export const usePaginationItemContext: IUsePaginationItemContext =
  function useSuiPaginationItemContext(optional): any {
    const ctx = React.use(PaginationItemContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "PaginationItemContext",
        providerName: "PaginationItem",
      });
    }

    return ctx;
  };

export { PaginationItemContext as ItemContext, usePaginationItemContext as useItemContext };
