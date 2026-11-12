import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuRadioGroup} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuRadioGroupContext<TItem = any> = Readonly<
  Override<ContextMenuContext<TItem>, ContextMenu.RadioGroup.State>
>;

/**
 * {@link ContextMenuRadioGroup} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuRadioGroupContext: React.Context<ContextMenuRadioGroupContext | null> =
  React.createContext<ContextMenuRadioGroupContext | null>(null);

export type IUseContextMenuRadioGroupContext = IUseContext<ContextMenuRadioGroupContext>;

/**
 * {@link ContextMenuRadioGroupContext} を読み取るフックです。
 */
export const useContextMenuRadioGroupContext: IUseContextMenuRadioGroupContext = (
  optional,
): any => {
  const ctx = React.use(ContextMenuRadioGroupContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ContextMenuRadioGroupContext",
      providerName: "ContextMenuRadioGroup",
    });
  }

  return ctx;
};

export {
  ContextMenuRadioGroupContext as RadioGroupContext,
  useContextMenuRadioGroupContext as useRadioGroupContext,
};
