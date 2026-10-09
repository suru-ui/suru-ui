import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PositionerContext } from "../positioner/combobox.positioner.context.js";

/**
 * {@link ComboboxBackdrop} が子パーツへ提供する状態です。
 */
export type ComboboxBackdropContext = Readonly<
  Override<PositionerContext, Combobox.Backdrop.State>
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
export const useComboboxBackdropContext: IUseComboboxBackdropContext =
  function useSuiComboboxBackdropContext(optional): any {
    const ctx = React.use(ComboboxBackdropContext);
    if (ctx === null && !optional) {
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
