import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * ラジオボタンの配色です。
 */
export type RadioGroupContextColor = Color;

/**
 * ラジオボタンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type RadioGroupContextRadius = "none" | Size | "full";

/**
 * ラジオボタンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type RadioGroupContextSize = Size;

/**
 * ラジオボタンの主な外観です。
 *
 * - `"naked"`: 背景のないインジケーターのみ、枠線なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type RadioGroupContextVariant = "naked" | "liquid";

/**
 * {@link RadioGroupRoot} が子パーツへ提供するコンテキストです。
 */
export type RadioGroupContext = {
  /**
   * ラジオボタンの配色です。
   */
  readonly color: RadioGroupContextColor;

  /**
   * グループ全体を無効にするかどうかです。
   */
  readonly disabled: boolean | undefined;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ラジオボタンの角丸です。
   */
  readonly radius: RadioGroupContextRadius;

  /**
   * ラジオボタンの大きさです。
   */
  readonly size: RadioGroupContextSize;

  /**
   * ラジオボタンの主な外観です。
   */
  readonly variant: RadioGroupContextVariant;
};

/**
 * ラジオボタングループのスタイルを子要素へ伝播するコンテキストです。
 */
export const RadioGroupContext: React.Context<RadioGroupContext | null> =
  React.createContext<RadioGroupContext | null>(null);

export interface IUseRadioGroupContext extends IUseContext<RadioGroupContext> {
  /**
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
  (optional?: false): RadioGroupContext;
  (optional?: boolean): RadioGroupContext | null;
}

/**
 * {@link RadioGroupContext} を読み取るフックです。
 */
export const useRadioGroupContext: IUseRadioGroupContext = function useSuiRadioGroupContext(
  optional?: boolean,
): any {
  const ctx = React.use(RadioGroupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "RadioGroupContext",
      providerName: "RadioGroupRoot",
    });
  }

  return ctx;
};

export { RadioGroupContext as Context, useRadioGroupContext as useContext };

export namespace Context {
  export type Color = RadioGroupContextColor;

  export type Radius = RadioGroupContextRadius;

  export type Size = RadioGroupContextSize;

  export type Variant = RadioGroupContextVariant;
}
