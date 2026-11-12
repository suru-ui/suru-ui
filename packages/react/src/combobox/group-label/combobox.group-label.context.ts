import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { GroupContext } from "../group/combobox.group.context.js";

/**
 * {@link ComboboxGroupLabel} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxGroupLabelContext<TItem = any> = Readonly<
  Override<GroupContext<TItem>, Combobox.GroupLabel.State>
>;

/**
 * {@link ComboboxGroupLabel} が子パーツへ提供するコンテキストです。
 */
export const ComboboxGroupLabelContext: React.Context<ComboboxGroupLabelContext | null> =
  React.createContext<ComboboxGroupLabelContext | null>(null);

export type IUseComboboxGroupLabelContext = IUseContext<ComboboxGroupLabelContext>;

/**
 * {@link ComboboxGroupLabelContext} を読み取るフックです。
 */
export const useComboboxGroupLabelContext: IUseComboboxGroupLabelContext = (optional): any => {
  const ctx = React.use(ComboboxGroupLabelContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ComboboxGroupLabelContext",
      providerName: "ComboboxGroupLabel",
    });
  }

  return ctx;
};

export {
  ComboboxGroupLabelContext as GroupLabelContext,
  useComboboxGroupLabelContext as useGroupLabelContext,
};
