import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SliderTrackState } from "./slider.track.jsx";

/**
 * {@link SliderTrack} が子パーツへ提供する状態です。
 */
export type SliderTrackContext = Readonly<SliderTrackState>;

/**
 * {@link SliderTrack} が子パーツへ提供するコンテキストです。
 */
export const SliderTrackContext: React.Context<SliderTrackContext | null> =
  React.createContext<SliderTrackContext | null>(null);

export type IUseSliderTrackContext = IUseContext<SliderTrackContext>;

/**
 * {@link SliderTrackContext} を読み取るフックです。
 */
export const useSliderTrackContext: IUseSliderTrackContext = function useSuiSliderTrackContext(
  optional,
): any {
  const ctx = React.use(SliderTrackContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SliderTrackContext",
      providerName: "SliderTrack",
    });
  }

  return ctx;
};

export { SliderTrackContext as TrackContext, useSliderTrackContext as useTrackContext };
