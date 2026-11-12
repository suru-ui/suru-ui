import type { Slider } from "@base-ui/react/slider";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SliderContext } from "../root/slider.root.context.js";

/**
 * {@link SliderLabel} が子パーツへ提供する状態です。
 */
export type SliderLabelContext = Readonly<Override<SliderContext, Slider.Label.State>>;

/**
 * {@link SliderLabel} が子パーツへ提供するコンテキストです。
 */
export const SliderLabelContext: React.Context<SliderLabelContext | null> =
  React.createContext<SliderLabelContext | null>(null);

export type IUseSliderLabelContext = IUseContext<SliderLabelContext>;

/**
 * {@link SliderLabelContext} を読み取るフックです。
 */
export const useSliderLabelContext: IUseSliderLabelContext = (optional): any => {
  const ctx = React.use(SliderLabelContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "SliderLabelContext",
      providerName: "SliderLabel",
    });
  }

  return ctx;
};

export { SliderLabelContext as LabelContext, useSliderLabelContext as useLabelContext };
