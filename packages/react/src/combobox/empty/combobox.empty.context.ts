import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PopupContext } from "../popup/combobox.popup.context.js";

/**
 * {@link ComboboxEmpty} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxEmptyContext<TItem = any> = Readonly<
  Override<PopupContext<TItem>, Combobox.Empty.State>
>;

/**
 * {@link ComboboxEmpty} が子パーツへ提供するコンテキストです。
 */
export const ComboboxEmptyContext: React.Context<ComboboxEmptyContext | null> =
  React.createContext<ComboboxEmptyContext | null>(null);

export type IUseComboboxEmptyContext = IUseContext<ComboboxEmptyContext>;

/**
 * {@link ComboboxEmptyContext} を読み取るフックです。
 */
export const useComboboxEmptyContext: IUseComboboxEmptyContext =
  function useSuiComboboxEmptyContext(optional): any {
    const ctx = React.use(ComboboxEmptyContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ComboboxEmptyContext",
        providerName: "ComboboxEmpty",
      });
    }

    return ctx;
  };

export { ComboboxEmptyContext as EmptyContext, useComboboxEmptyContext as useEmptyContext };
