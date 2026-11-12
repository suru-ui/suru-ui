import type { Meter } from "@base-ui/react/meter";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MeterContext } from "../root/meter.root.context.js";

/**
 * {@link MeterTrack} が子パーツへ提供する状態です。
 */
export type MeterTrackContext = Readonly<Override<MeterContext, Meter.Track.State>>;

/**
 * {@link MeterTrack} が子パーツへ提供するコンテキストです。
 */
export const MeterTrackContext: React.Context<MeterTrackContext | null> =
  React.createContext<MeterTrackContext | null>(null);

export type IUseMeterTrackContext = IUseContext<MeterTrackContext>;

/**
 * {@link MeterTrackContext} を読み取るフックです。
 */
export const useMeterTrackContext: IUseMeterTrackContext = (optional): any => {
  const ctx = React.use(MeterTrackContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "MeterTrackContext",
      providerName: "MeterTrack",
    });
  }

  return ctx;
};

export { MeterTrackContext as TrackContext, useMeterTrackContext as useTrackContext };
