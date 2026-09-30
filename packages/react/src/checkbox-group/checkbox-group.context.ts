import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * チェックボックスの配色です。
 */
export type CheckboxGroupContextColor = Color;

/**
 * チェックボックス群の向きです。
 *
 * - `"horizontal"`: 横並び
 * - `"vertical"`: 縦並び
 */
export type CheckboxGroupContextOrientation = "horizontal" | "vertical";

/**
 * チェックボックスの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 * - `"circle"`: 完全な丸形
 */
export type CheckboxGroupContextRadius = "none" | Size | "full" | "circle";

/**
 * チェックボックスの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type CheckboxGroupContextSize = Size;

/**
 * チェックボックスの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type CheckboxGroupContextVariant = "naked" | "liquid";

/**
 * {@link CheckboxGroupRoot} が子パーツへ提供するコンテキストです。
 */
export type CheckboxGroupContext = {
  /**
   * チェックボックスの配色です。
   */
  readonly color: CheckboxGroupContextColor;

  /**
   * グループ全体を無効にするかどうかです。
   */
  readonly disabled: boolean | undefined;

  /**
   * チェックボックス群の向きです。
   */
  readonly orientation: CheckboxGroupContextOrientation;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * チェックボックスの角丸です。
   */
  readonly radius: CheckboxGroupContextRadius;

  /**
   * チェックボックスの大きさです。
   */
  readonly size: CheckboxGroupContextSize;

  /**
   * チェックボックスの主な外観です。
   */
  readonly variant: CheckboxGroupContextVariant;
};

/**
 * チェックボックスグループのスタイルを子要素へ伝播するコンテキストです。
 */
export const CheckboxGroupContext: React.Context<CheckboxGroupContext | null> =
  React.createContext<CheckboxGroupContext | null>(null);

export type IUseCheckboxGroupContext = IUseContext<CheckboxGroupContext>;

/**
 * {@link CheckboxGroupContext} を読み取るフックです。
 */
export const useCheckboxGroupContext: IUseCheckboxGroupContext =
  function useSuiCheckboxGroupContext(optional?: boolean): any {
    const ctx = React.use(CheckboxGroupContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "CheckboxGroupContext",
        providerName: "CheckboxGroupRoot",
      });
    }

    return ctx;
  };

export { CheckboxGroupContext as Context, useCheckboxGroupContext as useContext };

export namespace Context {
  export type Color = CheckboxGroupContextColor;

  export type Orientation = CheckboxGroupContextOrientation;

  export type Radius = CheckboxGroupContextRadius;

  export type Size = CheckboxGroupContextSize;

  export type Variant = CheckboxGroupContextVariant;
}
