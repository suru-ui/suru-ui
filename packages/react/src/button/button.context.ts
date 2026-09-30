import type { ButtonState } from "@base-ui/react";
import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * ボタンの配色です。
 */
export type ButtonContextColor = Color;

/**
 * ボタンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 * - `"circle"`: 完全な丸形
 */
export type ButtonContextRadius = "none" | Size | "full" | "circle";

/**
 * ボタンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ButtonContextSize = Size;

/**
 * ボタンの主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ButtonContextVariant = ColorTemplate;

/**
 * {@link ButtonRoot} が子パーツへ提供するコンテキストです。
 */
export type ButtonContext = Readonly<
  ButtonState & {
    /**
     * ボタンの配色です。
     */
    readonly color: ButtonContextColor;

    /**
     * ボタンをメニューなどのリストアイテムとして使うかどうかです。
     */
    readonly item: boolean;

    /**
     * ボタンの背景色を控えめにするかどうかです。
     */
    readonly muted: boolean;

    /**
     * ボタンに枠線を表示するかどうかです。
     */
    readonly outlined: boolean;

    /**
     * ボタンが保留状態かどうかです。
     */
    readonly pending: boolean;

    /**
     * ボタンの角丸の大きさです。
     */
    readonly radius: ButtonContextRadius;

    /**
     * ボタンの大きさです。
     */
    readonly size: ButtonContextSize;

    /**
     * ボタンを正方形にするかどうかです。
     */
    readonly squared: boolean;

    /**
     * ボタンの主な外観です。
     */
    readonly variant: ButtonContextVariant;
  }
>;

/**
 * {@link ButtonRoot} が子パーツへ提供するコンテキストです。
 */
export const ButtonContext: React.Context<ButtonContext | null> =
  React.createContext<ButtonContext | null>(null);

export type IUseButtonContext = IUseContext<ButtonContext>;

/**
 * {@link ButtonContext} を読み取るフックです。
 */
export const useButtonContext: IUseButtonContext = function useSuiButtonContext(
  optional?: boolean,
): any {
  const ctx = React.use(ButtonContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ButtonContext",
      providerName: "ButtonRoot",
    });
  }

  return ctx;
};

export { ButtonContext as Context, useButtonContext as useContext };

export namespace Context {
  export type Color = ButtonContextColor;

  export type Radius = ButtonContextRadius;

  export type Size = ButtonContextSize;

  export type Variant = ButtonContextVariant;
}
