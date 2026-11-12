import type { Slider } from "@base-ui/react/slider";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SliderContext } from "../root/slider.root.context.js";

/**
 * {@link SliderControl} が子パーツへ提供する状態です。
 */
export type SliderControlContext = Readonly<Override<SliderContext, Slider.Control.State>>;

/**
 * {@link SliderControl} が子パーツへ提供するコンテキストです。
 */
export const SliderControlContext: React.Context<SliderControlContext | null> =
  React.createContext<SliderControlContext | null>(null);

export type IUseSliderControlContext = IUseContext<SliderControlContext>;

/**
 * {@link SliderControlContext} を読み取るフックです。
 */
export const useSliderControlContext: IUseSliderControlContext = (optional): any => {
  const ctx = React.use(SliderControlContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "SliderControlContext",
      providerName: "SliderControl",
    });
  }

  return ctx;
};

export { SliderControlContext as ControlContext, useSliderControlContext as useControlContext };
