import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuCheckboxItemIndicator} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuCheckboxItemIndicatorContext<TItem = any> = Readonly<
  Override<ContextMenuContext<TItem>, ContextMenu.CheckboxItemIndicator.State>
>;

/**
 * {@link ContextMenuCheckboxItemIndicator} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuCheckboxItemIndicatorContext: React.Context<ContextMenuCheckboxItemIndicatorContext | null> =
  React.createContext<ContextMenuCheckboxItemIndicatorContext | null>(null);

export type IUseContextMenuCheckboxItemIndicatorContext =
  IUseContext<ContextMenuCheckboxItemIndicatorContext>;

/**
 * {@link ContextMenuCheckboxItemIndicatorContext} を読み取るフックです。
 */
export const useContextMenuCheckboxItemIndicatorContext: IUseContextMenuCheckboxItemIndicatorContext =
  function useSuiContextMenuCheckboxItemIndicatorContext(optional): any {
    const ctx = React.use(ContextMenuCheckboxItemIndicatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuCheckboxItemIndicatorContext",
        providerName: "ContextMenuCheckboxItemIndicator",
      });
    }

    return ctx;
  };

export {
  ContextMenuCheckboxItemIndicatorContext as CheckboxItemIndicatorContext,
  useContextMenuCheckboxItemIndicatorContext as useCheckboxItemIndicatorContext,
};
