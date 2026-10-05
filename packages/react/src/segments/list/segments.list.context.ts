import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SegmentsListState } from "./segments.list.jsx";

/**
 * {@link SegmentsList} が子パーツへ提供する状態です。
 */
export type SegmentsListContext = Readonly<SegmentsListState>;

/**
 * {@link SegmentsList} が子パーツへ提供するコンテキストです。
 */
export const SegmentsListContext: React.Context<SegmentsListContext | null> =
  React.createContext<SegmentsListContext | null>(null);

export type IUseSegmentsListContext = IUseContext<SegmentsListContext>;

/**
 * {@link SegmentsListContext} を読み取るフックです。
 */
export const useSegmentsListContext: IUseSegmentsListContext = function useSuiSegmentsListContext(
  optional,
): any {
  const ctx = React.use(SegmentsListContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SegmentsListContext",
      providerName: "SegmentsList",
    });
  }

  return ctx;
};

export { SegmentsListContext as ListContext, useSegmentsListContext as useListContext };
