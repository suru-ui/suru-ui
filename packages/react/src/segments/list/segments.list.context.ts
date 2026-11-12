import type { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SegmentsContext } from "../root/segments.root.context.js";

/**
 * {@link SegmentsList} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type SegmentsListContext<TItem = any> = Readonly<
  Override<SegmentsContext<TItem>, BaseTabs.List.State>
>;

/**
 * {@link SegmentsList} が子パーツへ提供するコンテキストです。
 */
export const SegmentsListContext: React.Context<SegmentsListContext | null> =
  React.createContext<SegmentsListContext | null>(null);

export type IUseSegmentsListContext = IUseContext<SegmentsListContext>;

/**
 * {@link SegmentsListContext} を読み取るフックです。
 */
export const useSegmentsListContext: IUseSegmentsListContext = (optional): any => {
  const ctx = React.use(SegmentsListContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "SegmentsListContext",
      providerName: "SegmentsList",
    });
  }

  return ctx;
};

export { SegmentsListContext as ListContext, useSegmentsListContext as useListContext };
