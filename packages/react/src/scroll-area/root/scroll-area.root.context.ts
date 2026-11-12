import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ScrollAreaRootState } from "./scroll-area.root.jsx";

/**
 * {@link ScrollAreaRoot} が子パーツへ提供する状態です。
 */
export type ScrollAreaRootContext = Readonly<ScrollAreaRootState>;

/**
 * {@link ScrollAreaRoot} が子パーツへ提供するコンテキストです。
 */
export const ScrollAreaRootContext: React.Context<ScrollAreaRootContext | null> =
  React.createContext<ScrollAreaRootContext | null>(null);

export type IUseScrollAreaRootContext = IUseContext<ScrollAreaRootContext>;

/**
 * {@link ScrollAreaRootContext} を読み取るフックです。
 */
export const useScrollAreaRootContext: IUseScrollAreaRootContext = (optional): any => {
  const ctx = React.use(ScrollAreaRootContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ScrollAreaRootContext",
      providerName: "ScrollAreaRoot",
    });
  }

  return ctx;
};

export { ScrollAreaRootContext as RootContext, useScrollAreaRootContext as useRootContext };
