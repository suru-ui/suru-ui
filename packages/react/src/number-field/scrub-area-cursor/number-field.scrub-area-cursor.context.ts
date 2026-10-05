import type { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { NumberFieldContext } from "../root/number-field.root.context.js";

/**
 * {@link NumberFieldScrubAreaCursor} が子パーツへ提供する状態です。
 */
export type NumberFieldScrubAreaCursorContext = Readonly<
  Override<NumberFieldContext, NumberField.ScrubAreaCursor.State>
>;

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
