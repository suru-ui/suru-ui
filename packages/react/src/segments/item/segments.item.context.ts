import type { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SegmentsContext } from "../root/segments.root.context.js";

/**
 * {@link SegmentsItem} が子パーツへ提供する状態です。
 */
export type SegmentsItemContext = Readonly<Override<SegmentsContext, BaseTabs.Tab.State>>;

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
