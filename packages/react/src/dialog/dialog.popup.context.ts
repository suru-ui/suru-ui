import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * ダイアログの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type DialogPopupContextRadius = "none" | Size;

/**
 * {@link DialogPopup} が子パーツへ提供する状態です。
 */
export type DialogPopupContext = {
  /**
   * ダイアログの角丸の大きさです。
   */
  readonly radius: DialogPopupContextRadius;
};

/**
 * ダイアログの角丸を子パーツへ伝播するコンテキストです。
 */
export const DialogPopupContext: React.Context<DialogPopupContext | null> =
  React.createContext<DialogPopupContext | null>(null);

function useSuiDialogPopupContext(optional?: false): DialogPopupContext;
function useSuiDialogPopupContext(optional?: boolean): DialogPopupContext | null;
function useSuiDialogPopupContext(optional?: boolean): DialogPopupContext | null {
  const ctx = React.use(DialogPopupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "DialogPopupContext",
      providerName: "DialogPopup",
    });
  }

  return ctx;
}

/**
 * {@link DialogPopupContext} を読み取るフックです。
 */
export const useDialogPopupContext: IUseContext<DialogPopupContext> = useSuiDialogPopupContext;

export { DialogPopupContext as PopupContext, useDialogPopupContext as usePopupContext };

export namespace PopupContext {
  export type Radius = DialogPopupContextRadius;
}
