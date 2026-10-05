import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SliderThumbState } from "./slider.thumb.jsx";

/**
 * {@link SliderThumb} が子パーツへ提供する状態です。
 */
export type SliderThumbContext = Readonly<SliderThumbState>;

/**
 * {@link SliderThumb} が子パーツへ提供するコンテキストです。
 */
export const SliderThumbContext: React.Context<SliderThumbContext | null> =
  React.createContext<SliderThumbContext | null>(null);

export type IUseSliderThumbContext = IUseContext<SliderThumbContext>;

/**
 * {@link SliderThumbContext} を読み取るフックです。
 */
export const useSliderThumbContext: IUseSliderThumbContext = function useSuiSliderThumbContext(
  optional,
): any {
  const ctx = React.use(SliderThumbContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SliderThumbContext",
      providerName: "SliderThumb",
    });
  }

  return ctx;
};

export { SliderThumbContext as ThumbContext, useSliderThumbContext as useThumbContext };
