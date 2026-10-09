import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuRadioItemIndicator} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuRadioItemIndicatorContext<TItem = any> = Readonly<
  Override<ContextMenuContext<TItem>, ContextMenu.RadioItemIndicator.State>
>;

/**
 * {@link ContextMenuRadioItemIndicator} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuRadioItemIndicatorContext: React.Context<ContextMenuRadioItemIndicatorContext | null> =
  React.createContext<ContextMenuRadioItemIndicatorContext | null>(null);

export type IUseContextMenuRadioItemIndicatorContext =
  IUseContext<ContextMenuRadioItemIndicatorContext>;

/**
 * {@link ContextMenuRadioItemIndicatorContext} を読み取るフックです。
 */
export const useContextMenuRadioItemIndicatorContext: IUseContextMenuRadioItemIndicatorContext =
  function useSuiContextMenuRadioItemIndicatorContext(optional): any {
    const ctx = React.use(ContextMenuRadioItemIndicatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuRadioItemIndicatorContext",
        providerName: "ContextMenuRadioItemIndicator",
      });
    }

    return ctx;
  };

export {
  ContextMenuRadioItemIndicatorContext as RadioItemIndicatorContext,
  useContextMenuRadioItemIndicatorContext as useRadioItemIndicatorContext,
};
