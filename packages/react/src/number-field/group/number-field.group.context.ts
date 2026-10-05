import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { NumberFieldGroupState } from "./number-field.group.jsx";

/**
 * {@link NumberFieldGroup} が子パーツへ提供する状態です。
 */
export type NumberFieldGroupContext = Readonly<NumberFieldGroupState>;

/**
 * {@link NumberFieldGroup} が子パーツへ提供するコンテキストです。
 */
export const NumberFieldGroupContext: React.Context<NumberFieldGroupContext | null> =
  React.createContext<NumberFieldGroupContext | null>(null);

export type IUseNumberFieldGroupContext = IUseContext<NumberFieldGroupContext>;

/**
 * {@link NumberFieldGroupContext} を読み取るフックです。
 */
export const useNumberFieldGroupContext: IUseNumberFieldGroupContext =
  function useSuiNumberFieldGroupContext(optional): any {
    const ctx = React.use(NumberFieldGroupContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "NumberFieldGroupContext",
        providerName: "NumberFieldGroup",
      });
    }

    return ctx;
  };

export { NumberFieldGroupContext as GroupContext, useNumberFieldGroupContext as useGroupContext };
