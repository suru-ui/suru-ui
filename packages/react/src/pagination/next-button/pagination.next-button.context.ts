import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PaginationContext } from "../root/pagination.root.context.js";

/**
 * {@link PaginationNextButton} が子パーツへ提供する状態です。
 */
export type PaginationNextButtonContext = Readonly<Override<PaginationContext, Button.Root.State>>;

/**
 * {@link PaginationNextButton} が子パーツへ提供するコンテキストです。
 */
export const PaginationNextButtonContext: React.Context<PaginationNextButtonContext | null> =
  React.createContext<PaginationNextButtonContext | null>(null);

export type IUsePaginationNextButtonContext = IUseContext<PaginationNextButtonContext>;

/**
 * {@link PaginationNextButtonContext} を読み取るフックです。
 */
export const usePaginationNextButtonContext: IUsePaginationNextButtonContext = (optional): any => {
  const ctx = React.use(PaginationNextButtonContext);

  if (ctx === null && optional !== true) {
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
