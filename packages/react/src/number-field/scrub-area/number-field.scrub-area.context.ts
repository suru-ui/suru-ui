import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { NumberFieldScrubAreaState } from "./number-field.scrub-area.jsx";

/**
 * {@link NumberFieldScrubArea} が子パーツへ提供する状態です。
 */
export type NumberFieldScrubAreaContext = Readonly<NumberFieldScrubAreaState>;

/**
 * {@link NumberFieldScrubArea} が子パーツへ提供するコンテキストです。
 */
export const NumberFieldScrubAreaContext: React.Context<NumberFieldScrubAreaContext | null> =
  React.createContext<NumberFieldScrubAreaContext | null>(null);

export type IUseNumberFieldScrubAreaContext = IUseContext<NumberFieldScrubAreaContext>;

/**
 * {@link NumberFieldScrubAreaContext} を読み取るフックです。
 */
export const useNumberFieldScrubAreaContext: IUseNumberFieldScrubAreaContext =
  function useSuiNumberFieldScrubAreaContext(optional): any {
    const ctx = React.use(NumberFieldScrubAreaContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "NumberFieldScrubAreaContext",
        providerName: "NumberFieldScrubArea",
      });
    }

    return ctx;
  };

export {
  NumberFieldScrubAreaContext as ScrubAreaContext,
  useNumberFieldScrubAreaContext as useScrubAreaContext,
};
