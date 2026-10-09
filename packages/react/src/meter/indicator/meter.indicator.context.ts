import type { Meter } from "@base-ui/react/meter";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MeterTrackContext } from "../track/meter.track.context.js";

/**
 * {@link MeterIndicator} が子パーツへ提供する状態です。
 */
export type MeterIndicatorContext = Readonly<Override<MeterTrackContext, Meter.Indicator.State>>;

/**
 * {@link MeterIndicator} が子パーツへ提供するコンテキストです。
 */
export const MeterIndicatorContext: React.Context<MeterIndicatorContext | null> =
  React.createContext<MeterIndicatorContext | null>(null);

export type IUseMeterIndicatorContext = IUseContext<MeterIndicatorContext>;

/**
 * {@link MeterIndicatorContext} を読み取るフックです。
 */
export const useMeterIndicatorContext: IUseMeterIndicatorContext =
  function useSuiMeterIndicatorContext(optional): any {
    const ctx = React.use(MeterIndicatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "MeterIndicatorContext",
        providerName: "MeterIndicator",
      });
    }

    return ctx;
  };

export {
  MeterIndicatorContext as IndicatorContext,
  useMeterIndicatorContext as useIndicatorContext,
};
