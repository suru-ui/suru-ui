import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SegmentsItemState } from "./segments.item.jsx";

/**
 * {@link SegmentsItem} が子パーツへ提供する状態です。
 */
export type SegmentsItemContext = Readonly<SegmentsItemState>;

/**
 * {@link SegmentsItem} が子パーツへ提供するコンテキストです。
 */
export const SegmentsItemContext: React.Context<SegmentsItemContext | null> =
  React.createContext<SegmentsItemContext | null>(null);

export type IUseSegmentsItemContext = IUseContext<SegmentsItemContext>;

/**
 * {@link SegmentsItemContext} を読み取るフックです。
 */
export const useSegmentsItemContext: IUseSegmentsItemContext = function useSuiSegmentsItemContext(
  optional,
): any {
  const ctx = React.use(SegmentsItemContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SegmentsItemContext",
      providerName: "SegmentsItem",
    });
  }

  return ctx;
};

export { SegmentsItemContext as ItemContext, useSegmentsItemContext as useItemContext };
