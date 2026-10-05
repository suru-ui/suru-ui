import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectContext } from "../root/select.root.context.js";

/**
 * {@link SelectItem} が子パーツへ提供する状態です。
 */
export type SelectItemContext = Readonly<
  Override<SelectContext, Override<Button.Root.State, BaseSelect.Item.State>>
>;

/**
 * {@link SelectItem} が子パーツへ提供するコンテキストです。
 */
export const SelectItemContext: React.Context<SelectItemContext | null> =
  React.createContext<SelectItemContext | null>(null);

export type IUseSelectItemContext = IUseContext<SelectItemContext>;

/**
 * {@link SelectItemContext} を読み取るフックです。
 */
export const useSelectItemContext: IUseSelectItemContext = function useSuiSelectItemContext(
  optional,
): any {
  const ctx = React.use(SelectItemContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectItemContext",
      providerName: "SelectItem",
    });
  }

  return ctx;
};

export { SelectItemContext as ItemContext, useSelectItemContext as useItemContext };
