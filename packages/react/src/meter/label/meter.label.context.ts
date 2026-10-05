import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MeterLabelState } from "./meter.label.jsx";

/**
 * {@link MeterLabel} が子パーツへ提供する状態です。
 */
export type MeterLabelContext = Readonly<MeterLabelState>;

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
