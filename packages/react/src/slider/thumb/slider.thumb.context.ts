import type { Slider } from "@base-ui/react/slider";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SliderTrackContext } from "../track/slider.track.context.js";

/**
 * {@link SliderThumb} が子パーツへ提供する状態です。
 */
export type SliderThumbContext = Readonly<Override<SliderTrackContext, Slider.Thumb.State>>;

/**
 * {@link SliderThumb} が子パーツへ提供するコンテキストです。
 */
export const SliderThumbContext: React.Context<SliderThumbContext | null> =
  React.createContext<SliderThumbContext | null>(null);

export type IUseSliderThumbContext = IUseContext<SliderThumbContext>;

/**
 * {@link SliderThumbContext} を読み取るフックです。
 */
export const useSliderThumbContext: IUseSliderThumbContext = (optional): any => {
  const ctx = React.use(SliderThumbContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "SliderThumbContext",
      providerName: "SliderThumb",
    });
  }

  return ctx;
};

export { SliderThumbContext as ThumbContext, useSliderThumbContext as useThumbContext };
