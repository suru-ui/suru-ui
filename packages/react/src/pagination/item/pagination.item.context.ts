import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PaginationContext } from "../root/pagination.root.context.js";

/**
 * {@link PaginationItem} が子パーツへ提供する状態です。
 */
export type PaginationItemContext = Readonly<
  Override<
    Override<PaginationContext, Button.Root.State>,
    {
      /** 現在のページかどうかです。 */
      readonly selected: boolean;
    }
  >
>;

/**
 * {@link PaginationItem} が子パーツへ提供するコンテキストです。
 */
export const PaginationItemContext: React.Context<PaginationItemContext | null> =
  React.createContext<PaginationItemContext | null>(null);

export type IUsePaginationItemContext = IUseContext<PaginationItemContext>;

/**
 * {@link PaginationItemContext} を読み取るフックです。
 */
export const usePaginationItemContext: IUsePaginationItemContext = (optional): any => {
  const ctx = React.use(PaginationItemContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "PaginationItemContext",
      providerName: "PaginationItem",
    });
  }

  return ctx;
};

export { PaginationItemContext as ItemContext, usePaginationItemContext as useItemContext };
