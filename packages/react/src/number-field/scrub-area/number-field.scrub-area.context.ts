import type { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { NumberFieldContext } from "../root/number-field.root.context.js";

/**
 * {@link NumberFieldScrubArea} が子パーツへ提供する状態です。
 */
export type NumberFieldScrubAreaContext = Readonly<
  Override<NumberFieldContext, NumberField.ScrubArea.State>
>;

/**
 * {@link NumberFieldScrubArea} が子パーツへ提供するコンテキストです。
 */
export const NumberFieldScrubAreaContext: React.Context<NumberFieldScrubAreaContext | null> =
  React.createContext<NumberFieldScrubAreaContext | null>(null);

export type IUseNumberFieldScrubAreaContext = IUseContext<NumberFieldScrubAreaContext>;

/**
 * {@link NumberFieldScrubAreaContext} を読み取るフックです。
 */
export const useNumberFieldScrubAreaContext: IUseNumberFieldScrubAreaContext = (optional): any => {
  const ctx = React.use(NumberFieldScrubAreaContext);

  if (ctx === null && optional !== true) {
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
