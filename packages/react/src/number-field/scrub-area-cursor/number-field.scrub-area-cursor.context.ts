import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { NumberFieldScrubAreaCursorState } from "./number-field.scrub-area-cursor.jsx";

/**
 * {@link NumberFieldScrubAreaCursor} が子パーツへ提供する状態です。
 */
export type NumberFieldScrubAreaCursorContext = Readonly<NumberFieldScrubAreaCursorState>;

/**
 * {@link NumberFieldScrubAreaCursor} が子パーツへ提供するコンテキストです。
 */
export const NumberFieldScrubAreaCursorContext: React.Context<NumberFieldScrubAreaCursorContext | null> =
  React.createContext<NumberFieldScrubAreaCursorContext | null>(null);

export type IUseNumberFieldScrubAreaCursorContext = IUseContext<NumberFieldScrubAreaCursorContext>;

/**
 * {@link NumberFieldScrubAreaCursorContext} を読み取るフックです。
 */
export const useNumberFieldScrubAreaCursorContext: IUseNumberFieldScrubAreaCursorContext =
  function useSuiNumberFieldScrubAreaCursorContext(optional): any {
    const ctx = React.use(NumberFieldScrubAreaCursorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "NumberFieldScrubAreaCursorContext",
        providerName: "NumberFieldScrubAreaCursor",
      });
    }

    return ctx;
  };

export {
  NumberFieldScrubAreaCursorContext as ScrubAreaCursorContext,
  useNumberFieldScrubAreaCursorContext as useScrubAreaCursorContext,
};
