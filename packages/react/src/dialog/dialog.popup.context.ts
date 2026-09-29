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
 * ダイアログの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type DialogPopupContextSize = Size;

/**
 * ダイアログの主な外観です。
 *
 * - `"default"`: 規定のスタイル
 * - `"stacked"`: 積み重なっているスタイル
 */
export type DialogPopupContextVariant = "default" | "stacked";

/**
 * {@link DialogPopup} が子パーツへ提供する状態です。
 */
export type DialogPopupContext = {
  /**
   * ダイアログの角丸の大きさです。
   */
  readonly radius: DialogPopupContextRadius;

  /**
   * ダイアログの大きさです。
   */
  readonly size: DialogPopupContextSize;

  /**
   * ダイアログの主な外観です。
   */
  readonly variant: DialogPopupContextVariant;
};

/**
 * ダイアログの修飾を子パーツへ伝播するコンテキストです。
 */
export const DialogPopupContext: React.Context<DialogPopupContext | null> =
  React.createContext<DialogPopupContext | null>(null);

export interface IUseDialogPopupContext extends IUseContext<DialogPopupContext> {
  (optional?: false): DialogPopupContext;
  (optional?: boolean): DialogPopupContext | null;
}

export const useDialogPopupContext: IUseDialogPopupContext = function useSuiDialogPopupContext(
  optional?: boolean,
): any {
  const ctx = React.use(DialogPopupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "DialogPopupContext",
      providerName: "DialogPopup",
    });
  }

  return ctx;
};

export { DialogPopupContext as PopupContext, useDialogPopupContext as usePopupContext };

export namespace PopupContext {
  export type Radius = DialogPopupContextRadius;

  export type Size = DialogPopupContextSize;

  export type Variant = DialogPopupContextVariant;
}
