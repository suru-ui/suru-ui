import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MeterTrackState } from "./meter.track.jsx";

/**
 * {@link MeterTrack} が子パーツへ提供する状態です。
 */
export type MeterTrackContext = Readonly<MeterTrackState>;

/**
 * {@link MeterTrack} が子パーツへ提供するコンテキストです。
 */
export const MeterTrackContext: React.Context<MeterTrackContext | null> =
  React.createContext<MeterTrackContext | null>(null);

export type IUseMeterTrackContext = IUseContext<MeterTrackContext>;

/**
 * {@link MeterTrackContext} を読み取るフックです。
 */
export const useMeterTrackContext: IUseMeterTrackContext = function useSuiMeterTrackContext(
  optional,
): any {
  const ctx = React.use(MeterTrackContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MeterTrackContext",
      providerName: "MeterTrack",
    });
  }

  return ctx;
};

export { MeterTrackContext as TrackContext, useMeterTrackContext as useTrackContext };
