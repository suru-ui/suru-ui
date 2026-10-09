import type { Slider } from "@base-ui/react/slider";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SliderTrackContext } from "../track/slider.track.context.js";

/**
 * {@link SliderIndicator} が子パーツへ提供する状態です。
 */
export type SliderIndicatorContext = Readonly<Override<SliderTrackContext, Slider.Indicator.State>>;

/**
 * {@link SliderIndicator} が子パーツへ提供するコンテキストです。
 */
export const SliderIndicatorContext: React.Context<SliderIndicatorContext | null> =
  React.createContext<SliderIndicatorContext | null>(null);

export type IUseSliderIndicatorContext = IUseContext<SliderIndicatorContext>;

/**
 * {@link SliderIndicatorContext} を読み取るフックです。
 */
export const useSliderIndicatorContext: IUseSliderIndicatorContext =
  function useSuiSliderIndicatorContext(optional): any {
    const ctx = React.use(SliderIndicatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "SliderIndicatorContext",
        providerName: "SliderIndicator",
      });
    }

    return ctx;
  };

export {
  SliderIndicatorContext as IndicatorContext,
  useSliderIndicatorContext as useIndicatorContext,
};
