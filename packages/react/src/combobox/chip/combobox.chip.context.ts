import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ChipsContext } from "../chips/combobox.chips.context.js";
import type { ComboboxChipVariant } from "./combobox.chip.jsx";

/**
 * {@link ComboboxChip} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxChipContext<TItem = any> = Readonly<
  Override<
    Override<ChipsContext<TItem>, Combobox.Chip.State>,
    {
      variant: ComboboxChipVariant;
    }
  >
>;

/**
 * {@link ComboboxChip} が子パーツへ提供するコンテキストです。
 */
export const ComboboxChipContext: React.Context<ComboboxChipContext | null> =
  React.createContext<ComboboxChipContext | null>(null);

export type IUseComboboxChipContext = IUseContext<ComboboxChipContext>;

/**
 * {@link ComboboxChipContext} を読み取るフックです。
 */
export const useComboboxChipContext: IUseComboboxChipContext = function useSuiComboboxChipContext(
  optional,
): any {
  const ctx = React.use(ComboboxChipContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ComboboxChipContext",
      providerName: "ComboboxChip",
    });
  }

  return ctx;
};

export { ComboboxChipContext as ChipContext, useComboboxChipContext as useChipContext };
