import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ChipContext } from "../chip/combobox.chip.context.js";

/**
 * {@link ComboboxChipRemove} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxChipRemoveContext<TItem = any> = Readonly<
  Override<ChipContext<TItem>, Combobox.ChipRemove.State>
>;

/**
 * {@link ComboboxChipRemove} が子パーツへ提供するコンテキストです。
 */
export const ComboboxChipRemoveContext: React.Context<ComboboxChipRemoveContext | null> =
  React.createContext<ComboboxChipRemoveContext | null>(null);

export type IUseComboboxChipRemoveContext = IUseContext<ComboboxChipRemoveContext>;

/**
 * {@link ComboboxChipRemoveContext} を読み取るフックです。
 */
export const useComboboxChipRemoveContext: IUseComboboxChipRemoveContext = (optional): any => {
  const ctx = React.use(ComboboxChipRemoveContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ComboboxChipRemoveContext",
      providerName: "ComboboxChipRemove",
    });
  }

  return ctx;
};

export {
  ComboboxChipRemoveContext as ChipRemoveContext,
  useComboboxChipRemoveContext as useChipRemoveContext,
};
