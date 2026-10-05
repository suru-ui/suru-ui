import type { Slider } from "@base-ui/react/slider";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SliderContext } from "../root/slider.root.context.js";

/**
 * {@link SliderValue} が子パーツへ提供する状態です。
 */
export type SliderValueContext = Readonly<Override<SliderContext, Slider.Value.State>>;

/**
 * {@link SliderValue} が子パーツへ提供するコンテキストです。
 */
export const SliderValueContext: React.Context<SliderValueContext | null> =
  React.createContext<SliderValueContext | null>(null);

export type IUseSliderValueContext = IUseContext<SliderValueContext>;

/**
 * {@link SliderValueContext} を読み取るフックです。
 */
export const useSliderValueContext: IUseSliderValueContext = function useSuiSliderValueContext(
  optional,
): any {
  const ctx = React.use(SliderValueContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SliderValueContext",
      providerName: "SliderValue",
    });
  }

  return ctx;
};

export { SliderValueContext as ValueContext, useSliderValueContext as useValueContext };
