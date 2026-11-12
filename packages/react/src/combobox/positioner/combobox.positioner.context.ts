import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PortalContext } from "../portal/combobox.portal.context.js";

/**
 * {@link ComboboxPositioner} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxPositionerContext<TItem = any> = Readonly<
  Override<PortalContext<TItem>, Combobox.Positioner.State>
>;

/**
 * {@link ComboboxPositioner} が子パーツへ提供するコンテキストです。
 */
export const ComboboxPositionerContext: React.Context<ComboboxPositionerContext | null> =
  React.createContext<ComboboxPositionerContext | null>(null);

export type IUseComboboxPositionerContext = IUseContext<ComboboxPositionerContext>;

/**
 * {@link ComboboxPositionerContext} を読み取るフックです。
 */
export const useComboboxPositionerContext: IUseComboboxPositionerContext = (optional): any => {
  const ctx = React.use(ComboboxPositionerContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ComboboxPositionerContext",
      providerName: "ComboboxPositioner",
    });
  }

  return ctx;
};

export {
  ComboboxPositionerContext as PositionerContext,
  useComboboxPositionerContext as usePositionerContext,
};
