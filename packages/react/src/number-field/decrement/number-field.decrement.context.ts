import type { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { NumberFieldContext } from "../root/number-field.root.context.js";

/**
 * {@link NumberFieldDecrement} が子パーツへ提供する状態です。
 */
export type NumberFieldDecrementContext = Readonly<
  Override<NumberFieldContext, NumberField.Decrement.State>
>;

/**
 * {@link NumberFieldDecrement} が子パーツへ提供するコンテキストです。
 */
export const NumberFieldDecrementContext: React.Context<NumberFieldDecrementContext | null> =
  React.createContext<NumberFieldDecrementContext | null>(null);

export type IUseNumberFieldDecrementContext = IUseContext<NumberFieldDecrementContext>;

/**
 * {@link NumberFieldDecrementContext} を読み取るフックです。
 */
export const useNumberFieldDecrementContext: IUseNumberFieldDecrementContext =
  function useSuiNumberFieldDecrementContext(optional): any {
    const ctx = React.use(NumberFieldDecrementContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "NumberFieldDecrementContext",
        providerName: "NumberFieldDecrement",
      });
    }

    return ctx;
  };

export {
  NumberFieldDecrementContext as DecrementContext,
  useNumberFieldDecrementContext as useDecrementContext,
};
