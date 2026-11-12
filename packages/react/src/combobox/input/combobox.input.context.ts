import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { InputGroupContext } from "../input-group/combobox.input-group.context.js";

/**
 * {@link ComboboxInput} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxInputContext<TItem = any> = Readonly<
  Override<InputGroupContext<TItem>, Combobox.Input.State>
>;

/**
 * {@link ComboboxInput} が子パーツへ提供するコンテキストです。
 */
export const ComboboxInputContext: React.Context<ComboboxInputContext | null> =
  React.createContext<ComboboxInputContext | null>(null);

export type IUseComboboxInputContext = IUseContext<ComboboxInputContext>;

/**
 * {@link ComboboxInputContext} を読み取るフックです。
 */
export const useComboboxInputContext: IUseComboboxInputContext = (optional): any => {
  const ctx = React.use(ComboboxInputContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ComboboxInputContext",
      providerName: "ComboboxInput",
    });
  }

  return ctx;
};

export { ComboboxInputContext as InputContext, useComboboxInputContext as useInputContext };
