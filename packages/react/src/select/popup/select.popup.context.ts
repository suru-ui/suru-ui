import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectPositionerContext } from "../positioner/select.positioner.context.js";

/**
 * {@link SelectPopup} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectPopupContext<TValue = any> = Readonly<
  Override<SelectPositionerContext<TValue>, BaseSelect.Popup.State>
>;

/**
 * {@link SelectPopup} が子パーツへ提供するコンテキストです。
 */
export const SelectPopupContext: React.Context<SelectPopupContext | null> =
  React.createContext<SelectPopupContext | null>(null);

export type IUseSelectPopupContext = IUseContext<SelectPopupContext>;

/**
 * {@link SelectPopupContext} を読み取るフックです。
 */
export const useSelectPopupContext: IUseSelectPopupContext = function useSuiSelectPopupContext(
  optional,
): any {
  const ctx = React.use(SelectPopupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectPopupContext",
      providerName: "SelectPopup",
    });
  }

  return ctx;
};

export { SelectPopupContext as PopupContext, useSelectPopupContext as usePopupContext };
