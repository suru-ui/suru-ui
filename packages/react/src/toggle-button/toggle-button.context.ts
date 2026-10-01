import type { ButtonState } from "@base-ui/react";
import type { Toggle } from "@base-ui/react/toggle";
import type { Color, ButtonSize } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { Override, IUseContext } from "../types.js";

/**
 * トグルボタンの配色です。
 */
export type ToggleButtonContextColor = Color;

/**
 * トグルボタンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"xs"`: 極小の角丸
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 * - `"circle"`: 完全な丸形
 */
export type ToggleButtonContextRadius = "none" | ButtonSize | "full" | "circle";

/**
 * トグルボタンの大きさです。
 *
 * - `"xs"`: 極小
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ToggleButtonContextSize = ButtonSize;

/**
 * トグルボタンの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ToggleButtonContextVariant = "naked" | "liquid";

/**
 * {@link ToggleButtonRoot} が子パーツへ提供するコンテキストです。
 */
export type ToggleButtonContext = Readonly<
  Override<
    Override<ButtonState, Toggle.State>,
    {
      /**
       * トグルボタンの配色です。
       *
       * 押下状態でないときは grey で表示されます。
       */
      readonly color: ToggleButtonContextColor;

      /**
       * トグルボタンに枠線を表示するかどうかです。
       */
      readonly outlined: boolean;

      /**
       * トグルボタンが保留状態かどうかです。
       */
      readonly pending: boolean;

      /**
       * トグルボタンの角丸の大きさです。
       */
      readonly radius: ToggleButtonContextRadius;

      /**
       * トグルボタンの大きさです。
       */
      readonly size: ToggleButtonContextSize;

      /**
       * トグルボタンを正方形にするかどうかです。
       */
      readonly squared: boolean;

      /**
       * トグルボタンの主な外観です。
       *
       * 押下状態では solid で表示されます。
       */
      readonly variant: ToggleButtonContextVariant;
    }
  >
>;

/**
 * {@link ToggleButtonRoot} が子パーツへ提供するコンテキストです。
 */
export const ToggleButtonContext: React.Context<ToggleButtonContext | null> =
  React.createContext<ToggleButtonContext | null>(null);

export type IUseToggleButtonContext = IUseContext<ToggleButtonContext>;

/**
 * {@link ToggleButtonContext} を読み取るフックです。
 */
export const useToggleButtonContext: IUseToggleButtonContext = function useSuiToggleButtonContext(
  optional?: boolean,
): any {
  const ctx = React.use(ToggleButtonContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ToggleButtonContext",
      providerName: "ToggleButtonRoot",
    });
  }

  return ctx;
};

export { ToggleButtonContext as Context, useToggleButtonContext as useContext };

export namespace Context {
  export type Color = ToggleButtonContextColor;

  export type Radius = ToggleButtonContextRadius;

  export type Size = ToggleButtonContextSize;

  export type Variant = ToggleButtonContextVariant;
}
