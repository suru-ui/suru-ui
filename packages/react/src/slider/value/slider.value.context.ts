import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SliderValueState } from "./slider.value.jsx";

/**
 * {@link SliderValue} が子パーツへ提供する状態です。
 */
export type SliderValueContext = Readonly<SliderValueState>;

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
