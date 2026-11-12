import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { InputGroupContext } from "../input-group/combobox.input-group.context.js";

/**
 * {@link ComboboxChips} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxChipsContext<TItem = any> = Readonly<
  Override<InputGroupContext<TItem>, Combobox.Chips.State>
>;

/**
 * {@link ComboboxChips} が子パーツへ提供するコンテキストです。
 */
export const ComboboxChipsContext: React.Context<ComboboxChipsContext | null> =
  React.createContext<ComboboxChipsContext | null>(null);

export type IUseComboboxChipsContext = IUseContext<ComboboxChipsContext>;

/**
 * {@link ComboboxChipsContext} を読み取るフックです。
 */
export const useComboboxChipsContext: IUseComboboxChipsContext = (optional): any => {
  const ctx = React.use(ComboboxChipsContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ComboboxChipsContext",
      providerName: "ComboboxChips",
    });
  }

  return ctx;
};

export { ComboboxChipsContext as ChipsContext, useComboboxChipsContext as useChipsContext };
