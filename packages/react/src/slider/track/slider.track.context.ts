import type { Slider } from "@base-ui/react/slider";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SliderControlContext } from "../control/slider.control.context.js";

/**
 * {@link SliderTrack} が子パーツへ提供する状態です。
 */
export type SliderTrackContext = Readonly<Override<SliderControlContext, Slider.Track.State>>;

/**
 * {@link SliderTrack} が子パーツへ提供するコンテキストです。
 */
export const SliderTrackContext: React.Context<SliderTrackContext | null> =
  React.createContext<SliderTrackContext | null>(null);

export type IUseSliderTrackContext = IUseContext<SliderTrackContext>;

/**
 * {@link SliderTrackContext} を読み取るフックです。
 */
export const useSliderTrackContext: IUseSliderTrackContext = (optional): any => {
  const ctx = React.use(SliderTrackContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "SliderTrackContext",
      providerName: "SliderTrack",
    });
  }

  return ctx;
};

export { SliderTrackContext as TrackContext, useSliderTrackContext as useTrackContext };
