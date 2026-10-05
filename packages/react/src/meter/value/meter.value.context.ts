import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MeterValueState } from "./meter.value.jsx";

/**
 * {@link MeterValue} が子パーツへ提供する状態です。
 */
export type MeterValueContext = Readonly<MeterValueState>;

/**
 * {@link MeterValue} が子パーツへ提供するコンテキストです。
 */
export const MeterValueContext: React.Context<MeterValueContext | null> =
  React.createContext<MeterValueContext | null>(null);

export type IUseMeterValueContext = IUseContext<MeterValueContext>;

/**
 * {@link MeterValueContext} を読み取るフックです。
 */
export const useMeterValueContext: IUseMeterValueContext = function useSuiMeterValueContext(
  optional,
): any {
  const ctx = React.use(MeterValueContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MeterValueContext",
      providerName: "MeterValue",
    });
  }

  return ctx;
};

export { MeterValueContext as ValueContext, useMeterValueContext as useValueContext };
