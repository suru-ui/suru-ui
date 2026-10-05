import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SliderLabelState } from "./slider.label.jsx";

/**
 * {@link SliderLabel} が子パーツへ提供する状態です。
 */
export type SliderLabelContext = Readonly<SliderLabelState>;

/**
 * {@link SliderLabel} が子パーツへ提供するコンテキストです。
 */
export const SliderLabelContext: React.Context<SliderLabelContext | null> =
  React.createContext<SliderLabelContext | null>(null);

export type IUseSliderLabelContext = IUseContext<SliderLabelContext>;

/**
 * {@link SliderLabelContext} を読み取るフックです。
 */
export const useSliderLabelContext: IUseSliderLabelContext = function useSuiSliderLabelContext(
  optional,
): any {
  const ctx = React.use(SliderLabelContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SliderLabelContext",
      providerName: "SliderLabel",
    });
  }

  return ctx;
};

export { SliderLabelContext as LabelContext, useSliderLabelContext as useLabelContext };
