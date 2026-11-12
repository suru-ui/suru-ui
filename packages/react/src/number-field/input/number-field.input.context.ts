import type { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { NumberFieldGroupContext } from "../group/number-field.group.context.js";

/**
 * {@link NumberFieldInput} が子パーツへ提供する状態です。
 */
export type NumberFieldInputContext = Readonly<
  Override<NumberFieldGroupContext, NumberField.Input.State>
>;

/**
 * {@link NumberFieldInput} が子パーツへ提供するコンテキストです。
 */
export const NumberFieldInputContext: React.Context<NumberFieldInputContext | null> =
  React.createContext<NumberFieldInputContext | null>(null);

export type IUseNumberFieldInputContext = IUseContext<NumberFieldInputContext>;

/**
 * {@link NumberFieldInputContext} を読み取るフックです。
 */
export const useNumberFieldInputContext: IUseNumberFieldInputContext = (optional): any => {
  const ctx = React.use(NumberFieldInputContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "NumberFieldInputContext",
      providerName: "NumberFieldInput",
    });
  }

  return ctx;
};

export { NumberFieldInputContext as InputContext, useNumberFieldInputContext as useInputContext };
