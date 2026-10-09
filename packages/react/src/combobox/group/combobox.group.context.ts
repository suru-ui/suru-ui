import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxListContext } from "../list/combobox.list.context.js";

/**
 * {@link ComboboxGroup} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxGroupContext<TItem = any> = Readonly<
  Override<ComboboxListContext<TItem>, Combobox.Group.State>
>;

/**
 * {@link ComboboxGroup} が子パーツへ提供するコンテキストです。
 */
export const ComboboxGroupContext: React.Context<ComboboxGroupContext | null> =
  React.createContext<ComboboxGroupContext | null>(null);

export type IUseComboboxGroupContext = IUseContext<ComboboxGroupContext>;

/**
 * {@link ComboboxGroupContext} を読み取るフックです。
 */
export const useComboboxGroupContext: IUseComboboxGroupContext =
  function useSuiComboboxGroupContext(optional): any {
    const ctx = React.use(ComboboxGroupContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ComboboxGroupContext",
        providerName: "ComboboxGroup",
      });
    }

    return ctx;
  };

export { ComboboxGroupContext as GroupContext, useComboboxGroupContext as useGroupContext };
