import type { AlertDialog } from "@base-ui/react/alert-dialog";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";

/**
 * アラートダイアログの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertDialogPopupContextRadius = "none" | Size;

/**
 * アラートダイアログの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertDialogPopupContextSize = Size;

/**
 * アラートダイアログの主な外観です。
 *
 * - `"default"`: 規定のスタイル
 * - `"stacked"`: 積み重なっているスタイル
 */
export type AlertDialogPopupContextVariant = "default" | "stacked";

/**
 * {@link AlertDialogPopup} が子パーツへ提供する状態です。
 */
export type AlertDialogPopupContext = Override<
  Override<AlertDialog.Popup.State, Card.Root.State>,
  {
    /**
     * アラートダイアログの主な外観です。
     */
    readonly variant: AlertDialogPopupContextVariant;
  }
>;

/**
 * アラートダイアログの修飾を子パーツへ伝播するコンテキストです。
 */
export const AlertDialogPopupContext: React.Context<AlertDialogPopupContext | null> =
  React.createContext<AlertDialogPopupContext | null>(null);

export type IUseAlertDialogPopupContext = IUseContext<AlertDialogPopupContext>;

export const useAlertDialogPopupContext: IUseAlertDialogPopupContext =
  function useSuiAlertDialogPopupContext(optional?: boolean): any {
    const ctx = React.use(AlertDialogPopupContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AlertDialogPopupContext",
        providerName: "AlertDialogPopup",
      });
    }

    return ctx;
  };

export { AlertDialogPopupContext as PopupContext, useAlertDialogPopupContext as usePopupContext };

export namespace PopupContext {
  export type Radius = AlertDialogPopupContextRadius;

  export type Size = AlertDialogPopupContextSize;

  export type Variant = AlertDialogPopupContextVariant;
}
