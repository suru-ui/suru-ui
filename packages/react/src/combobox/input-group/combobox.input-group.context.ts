import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxInputGroup} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxInputGroupContext<TItem = any> = Readonly<
  Override<ComboboxContext<TItem>, Combobox.InputGroup.State>
>;

/**
 * {@link ComboboxInputGroup} が子パーツへ提供するコンテキストです。
 */
export const ComboboxInputGroupContext: React.Context<ComboboxInputGroupContext | null> =
  React.createContext<ComboboxInputGroupContext | null>(null);

export type IUseComboboxInputGroupContext = IUseContext<ComboboxInputGroupContext>;

/**
 * {@link ComboboxInputGroupContext} を読み取るフックです。
 */
export const useComboboxInputGroupContext: IUseComboboxInputGroupContext = (optional): any => {
  const ctx = React.use(ComboboxInputGroupContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ComboboxInputGroupContext",
      providerName: "ComboboxInputGroup",
    });
  }

  return ctx;
};

export {
  ComboboxInputGroupContext as InputGroupContext,
  useComboboxInputGroupContext as useInputGroupContext,
};
