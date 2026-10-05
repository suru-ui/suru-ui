import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SliderControlState } from "./slider.control.jsx";

/**
 * {@link SliderControl} が子パーツへ提供する状態です。
 */
export type SliderControlContext = Readonly<SliderControlState>;

/**
 * {@link SliderControl} が子パーツへ提供するコンテキストです。
 */
export const SliderControlContext: React.Context<SliderControlContext | null> =
  React.createContext<SliderControlContext | null>(null);

export type IUseSliderControlContext = IUseContext<SliderControlContext>;

/**
 * {@link SliderControlContext} を読み取るフックです。
 */
export const useSliderControlContext: IUseSliderControlContext =
  function useSuiSliderControlContext(optional): any {
    const ctx = React.use(SliderControlContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "SliderControlContext",
        providerName: "SliderControl",
      });
    }

    return ctx;
  };

export { SliderControlContext as ControlContext, useSliderControlContext as useControlContext };
