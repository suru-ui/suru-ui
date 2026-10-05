import type { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SegmentsContext } from "../root/segments.root.context.js";

/**
 * {@link SegmentsIndicator} が子パーツへ提供する状態です。
 */
export type SegmentsIndicatorContext = Readonly<
  Override<SegmentsContext, BaseTabs.Indicator.State>
>;

/**
 * {@link SegmentsIndicator} が子パーツへ提供するコンテキストです。
 */
export const SegmentsIndicatorContext: React.Context<SegmentsIndicatorContext | null> =
  React.createContext<SegmentsIndicatorContext | null>(null);

export type IUseSegmentsIndicatorContext = IUseContext<SegmentsIndicatorContext>;

/**
 * {@link SegmentsIndicatorContext} を読み取るフックです。
 */
export const useSegmentsIndicatorContext: IUseSegmentsIndicatorContext =
  function useSuiSegmentsIndicatorContext(optional): any {
    const ctx = React.use(SegmentsIndicatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "SegmentsIndicatorContext",
        providerName: "SegmentsIndicator",
      });
    }

    return ctx;
  };

export {
  SegmentsIndicatorContext as IndicatorContext,
  useSegmentsIndicatorContext as useIndicatorContext,
};
