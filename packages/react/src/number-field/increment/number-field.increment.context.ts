import type { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { NumberFieldContext } from "../root/number-field.root.context.js";

/**
 * {@link NumberFieldIncrement} が子パーツへ提供する状態です。
 */
export type NumberFieldIncrementContext = Readonly<
  Override<NumberFieldContext, NumberField.Increment.State>
>;

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
