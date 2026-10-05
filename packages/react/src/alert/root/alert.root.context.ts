import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * アラートのアクションの配置です。
 *
 * 説明文があるときは説明文との間に仕切り線を表示します。
 *
 * - `"bottom"`: 説明文の下
 * - `"side"`: タイトルと説明文の右側に縦方向へ並べます
 */
export type AlertContextActionsPosition = "bottom" | "side";

/**
 * アラートの説明文の配置です。
 *
 * - `"bottom"`: タイトルの下
 * - `"side-start"`: タイトルの右側に横方向へ並べ、説明文を左寄せにします
 * - `"side-end"`: タイトルの右側に横方向へ並べ、説明文を右寄せにします
 */
export type AlertContextDescriptionPosition = "bottom" | "side-start" | "side-end";

/**
 * アラートの配色です。
 */
export type AlertContextColor = Color;

/**
 * アラートの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertContextRadius = "none" | Size;

/**
 * アラートの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertContextSize = Size;

/**
 * アラートの主な外観です。
 *
 * - `"muted"`: 控えめな背景
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AlertContextVariant = "muted" | "naked" | "liquid";

/**
 * {@link AlertRoot} が提供する状態です。
 */
export type AlertContext = {
  /**
   * アラートのアクションの配置です。
   */
  readonly actionsPosition: AlertContextActionsPosition;

  /**
   * アラートの色です。
   */
  readonly color: AlertContextColor;

  /**
   * タイトルに対する説明文の配置です。
   */
  readonly descriptionPosition: AlertContextDescriptionPosition;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * アラートの角丸の大きさです。
   */
  readonly radius: AlertContextRadius;

  /**
   * アラートの大きさです。
   */
  readonly size: AlertContextSize;

  /**
   * アラートの主な外観です。
   */
  readonly variant: AlertContextVariant;
};

/**
 * アラートの見た目を子パーツへ伝播するコンテキストです。
 */
export const AlertContext: React.Context<AlertContext | null> =
  React.createContext<AlertContext | null>(null);

export type IUseAlertContext = IUseContext<AlertContext>;

/**
 * {@link AlertContext} を読み取るフックです。
 */
export const useAlertContext: IUseAlertContext = function useSuiAlertContext(
  optional?: boolean,
): any {
  const ctx = React.use(AlertContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "AlertContext",
      providerName: "AlertRoot",
    });
  }

  return ctx;
};

export { AlertContext as Context, useAlertContext as useContext };

export namespace Context {
  export type ActionsPosition = AlertContextActionsPosition;

  export type Color = AlertContextColor;

  export type DescriptionPosition = AlertContextDescriptionPosition;

  export type Radius = AlertContextRadius;

  export type Size = AlertContextSize;

  export type Variant = AlertContextVariant;
}
