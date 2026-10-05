import type { Meter } from "@base-ui/react/meter";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MeterContext } from "../root/meter.root.context.js";

/**
 * {@link MeterLabel} が子パーツへ提供する状態です。
 */
export type MeterLabelContext = Readonly<Override<MeterContext, Meter.Label.State>>;

/**
 * {@link MeterLabel} が子パーツへ提供するコンテキストです。
 */
export const MeterLabelContext: React.Context<MeterLabelContext | null> =
  React.createContext<MeterLabelContext | null>(null);

export type IUseMeterLabelContext = IUseContext<MeterLabelContext>;

/**
 * {@link MeterLabelContext} を読み取るフックです。
 */
export const useMeterLabelContext: IUseMeterLabelContext = function useSuiMeterLabelContext(
  optional,
): any {
  const ctx = React.use(MeterLabelContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MeterLabelContext",
      providerName: "MeterLabel",
    });
  }

  return ctx;
};

export { MeterLabelContext as LabelContext, useMeterLabelContext as useLabelContext };
