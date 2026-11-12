import type { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { NumberFieldContext } from "../root/number-field.root.context.js";

/**
 * {@link NumberFieldGroup} が子パーツへ提供する状態です。
 */
export type NumberFieldGroupContext = Readonly<
  Override<NumberFieldContext, NumberField.Group.State>
>;

/**
 * {@link NumberFieldGroup} が子パーツへ提供するコンテキストです。
 */
export const NumberFieldGroupContext: React.Context<NumberFieldGroupContext | null> =
  React.createContext<NumberFieldGroupContext | null>(null);

export type IUseNumberFieldGroupContext = IUseContext<NumberFieldGroupContext>;

/**
 * {@link NumberFieldGroupContext} を読み取るフックです。
 */
export const useNumberFieldGroupContext: IUseNumberFieldGroupContext = (optional): any => {
  const ctx = React.use(NumberFieldGroupContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "NumberFieldGroupContext",
      providerName: "NumberFieldGroup",
    });
  }

  return ctx;
};

export { NumberFieldGroupContext as GroupContext, useNumberFieldGroupContext as useGroupContext };
