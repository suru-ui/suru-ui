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
export type DialogContentContextRadius = "none" | Size;

/**
 * {@link DialogContent} が子パーツへ提供する状態です。
 */
export type DialogContentContext = {
  /**
   * ダイアログの角丸の大きさです。
   */
  readonly radius: DialogContentContextRadius;
};

/**
 * ダイアログの角丸を子パーツへ伝播するコンテキストです。
 */
export const DialogContentContext: React.Context<DialogContentContext | null> =
  React.createContext<DialogContentContext | null>(null);

function useSuiDialogContentContext(optional?: false): DialogContentContext;
function useSuiDialogContentContext(optional?: boolean): DialogContentContext | null;
function useSuiDialogContentContext(optional?: boolean): DialogContentContext | null {
  const ctx = React.use(DialogContentContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "DialogContentContext",
      providerName: "DialogContent",
    });
  }

  return ctx;
}

/**
 * {@link DialogContentContext} を読み取るフックです。
 */
export const useDialogContentContext: IUseContext<DialogContentContext> =
  useSuiDialogContentContext;

export { DialogContentContext as ContentContext, useDialogContentContext as useContentContext };

export namespace ContentContext {
  export type Radius = DialogContentContextRadius;
}
