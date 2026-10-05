import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { NumberFieldIncrementState } from "./number-field.increment.jsx";

/**
 * {@link NumberFieldIncrement} が子パーツへ提供する状態です。
 */
export type NumberFieldIncrementContext = Readonly<NumberFieldIncrementState>;

/**
 * {@link NumberFieldIncrement} が子パーツへ提供するコンテキストです。
 */
export const NumberFieldIncrementContext: React.Context<NumberFieldIncrementContext | null> =
  React.createContext<NumberFieldIncrementContext | null>(null);

export type IUseNumberFieldIncrementContext = IUseContext<NumberFieldIncrementContext>;

/**
 * {@link NumberFieldIncrementContext} を読み取るフックです。
 */
export const useNumberFieldIncrementContext: IUseNumberFieldIncrementContext =
  function useSuiNumberFieldIncrementContext(optional): any {
    const ctx = React.use(NumberFieldIncrementContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "NumberFieldIncrementContext",
        providerName: "NumberFieldIncrement",
      });
    }

    return ctx;
  };

export {
  NumberFieldIncrementContext as IncrementContext,
  useNumberFieldIncrementContext as useIncrementContext,
};
