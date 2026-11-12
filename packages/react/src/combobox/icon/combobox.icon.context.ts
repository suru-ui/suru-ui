import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AddonContext } from "../addon/combobox.addon.context.js";

/**
 * {@link ComboboxIcon} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxIconContext<TItem = any> = Readonly<
  Override<AddonContext<TItem>, Combobox.Icon.State>
>;

/**
 * {@link ComboboxIcon} が子パーツへ提供するコンテキストです。
 */
export const ComboboxIconContext: React.Context<ComboboxIconContext | null> =
  React.createContext<ComboboxIconContext | null>(null);

export type IUseComboboxIconContext = IUseContext<ComboboxIconContext>;

/**
 * {@link ComboboxIconContext} を読み取るフックです。
 */
export const useComboboxIconContext: IUseComboboxIconContext = (optional): any => {
  const ctx = React.use(ComboboxIconContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ComboboxIconContext",
      providerName: "ComboboxIcon",
    });
  }

  return ctx;
};

export { ComboboxIconContext as IconContext, useComboboxIconContext as useIconContext };
