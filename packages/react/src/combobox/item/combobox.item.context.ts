import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { IUseContext, Override } from "../../types.js";
import type { GroupContext } from "../group/combobox.group.context.js";
import type { ListContext } from "../list/combobox.list.context.js";

type ItemContextValue<TItem> = {
  /**
   * 項目の値です。
   */
  readonly value: TItem;
};

type ItemContext<TParentContext, TItem> = Readonly<
  Override<
    TParentContext,
    Override<ItemContextValue<TItem>, Override<Button.Root.State, Combobox.Item.State>>
  >
>;

/**
 * {@link ComboboxItem} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxItemContext<TItem = any> =
  // | ItemContext<ListContext, TItem>
  // | ItemContext<GroupContext, TItem>
  ItemContext<ListContext & GroupContext, TItem>;

/**
 * 項目の値を子要素へ伝播するコンテキストです。
 */
export const ComboboxItemContext: React.Context<ComboboxItemContext | null> =
  React.createContext<ComboboxItemContext | null>(null);

function useSuiComboboxItemContext(optional?: false): ComboboxItemContext;
function useSuiComboboxItemContext(optional?: boolean): ComboboxItemContext | null;
function useSuiComboboxItemContext(optional?: boolean): ComboboxItemContext | null {
  const ctx = React.use(ComboboxItemContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ComboboxItemContext",
      providerName: "ComboboxItem",
    });
  }

  return ctx;
}

export type IUseComboboxItemContext = IUseContext<ComboboxItemContext>;

/**
 * {@link ComboboxItemContext} を読み取るフックです。
 */
export const useComboboxItemContext: IUseComboboxItemContext = useSuiComboboxItemContext;

export { ComboboxItemContext as ItemContext, useComboboxItemContext as useItemContext };
