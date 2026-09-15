import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * アラートダイアログの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertDialogContentContextRadius = "none" | Size;

/**
 * {@link AlertDialogContent} が子パーツへ提供するコンテキストです。
 */
export type AlertDialogContentContext = {
  /**
   * アラートダイアログの角丸の大きさです。
   */
  readonly radius: AlertDialogContentContextRadius;
};

/**
 * {@link AlertDialogContent} が子パーツへ提供するコンテキストです。
 */
export const AlertDialogContentContext: React.Context<AlertDialogContentContext | null> =
  React.createContext<AlertDialogContentContext | null>(null);

function useSuiAlertDialogContentContext(optional?: false): AlertDialogContentContext;
function useSuiAlertDialogContentContext(optional?: boolean): AlertDialogContentContext | null;
function useSuiAlertDialogContentContext(optional?: boolean): AlertDialogContentContext | null {
  const ctx = React.use(AlertDialogContentContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "AlertDialogContentContext",
      providerName: "AlertDialogContent",
    });
  }

  return ctx;
}

/**
 * {@link AlertDialogContentContext} を読み取るフックです。
 */
export const useAlertDialogContentContext: IUseContext<AlertDialogContentContext> =
  useSuiAlertDialogContentContext;

export {
  AlertDialogContentContext as ContentContext,
  useAlertDialogContentContext as useContentContext,
};

export namespace ContentContext {
  export type Radius = AlertDialogContentContextRadius;
}
