import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PortalContext } from "../portal/combobox.portal.context.js";

/**
 * {@link ComboboxBackdrop} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxBackdropContext<TItem = any> = Readonly<
  Override<PortalContext<TItem>, Combobox.Backdrop.State>
>;

/**
 * {@link ComboboxBackdrop} が子パーツへ提供するコンテキストです。
 */
export const ComboboxBackdropContext: React.Context<ComboboxBackdropContext | null> =
  React.createContext<ComboboxBackdropContext | null>(null);

export type IUseComboboxBackdropContext = IUseContext<ComboboxBackdropContext>;

/**
 * {@link ComboboxBackdropContext} を読み取るフックです。
 */
export const useComboboxBackdropContext: IUseComboboxBackdropContext = (optional): any => {
  const ctx = React.use(ComboboxBackdropContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ComboboxBackdropContext",
      providerName: "ComboboxBackdrop",
    });
  }

  return ctx;
};

export {
  ComboboxBackdropContext as BackdropContext,
  useComboboxBackdropContext as useBackdropContext,
};
