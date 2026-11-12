import type { Meter } from "@base-ui/react/meter";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MeterContext } from "../root/meter.root.context.js";

/**
 * {@link MeterValue} が子パーツへ提供する状態です。
 */
export type MeterValueContext = Readonly<Override<MeterContext, Meter.Value.State>>;

/**
 * {@link MeterValue} が子パーツへ提供するコンテキストです。
 */
export const MeterValueContext: React.Context<MeterValueContext | null> =
  React.createContext<MeterValueContext | null>(null);

export type IUseMeterValueContext = IUseContext<MeterValueContext>;

/**
 * {@link MeterValueContext} を読み取るフックです。
 */
export const useMeterValueContext: IUseMeterValueContext = (optional): any => {
  const ctx = React.use(MeterValueContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "MeterValueContext",
      providerName: "MeterValue",
    });
  }

  return ctx;
};

export { MeterValueContext as ValueContext, useMeterValueContext as useValueContext };
