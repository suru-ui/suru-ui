import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxIcon} が子パーツへ提供する状態です。
 */
export type ComboboxIconContext = Readonly<Override<ComboboxContext, Combobox.Icon.State>>;

/**
 * {@link ComboboxIcon} が子パーツへ提供するコンテキストです。
 */
export const ComboboxIconContext: React.Context<ComboboxIconContext | null> =
  React.createContext<ComboboxIconContext | null>(null);

export type IUseComboboxIconContext = IUseContext<ComboboxIconContext>;

/**
 * {@link ComboboxIconContext} を読み取るフックです。
 */
export const useComboboxIconContext: IUseComboboxIconContext = function useSuiComboboxIconContext(
  optional,
): any {
  const ctx = React.use(ComboboxIconContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ComboboxIconContext",
      providerName: "ComboboxIcon",
    });
  }

  return ctx;
};

export { ComboboxIconContext as IconContext, useComboboxIconContext as useIconContext };
