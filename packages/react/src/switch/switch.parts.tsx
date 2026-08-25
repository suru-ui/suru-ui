import { Switch } from "@base-ui/react/switch";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./switch.css";

// Root
// ----

/**
 * スイッチの色です。
 */
export type SwitchRootColor = Color;

/**
 * スイッチの角丸です。
 *
 * {@link SwitchRootProps} で指定できます。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type SwitchRootRadius = "none" | Size | "full";

/**
 * スイッチの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type SwitchRootSize = Size;

/**
 * スイッチの主な外観です。
 *
 * {@link SwitchRootProps} で指定できます。
 *
 * - `"naked"`: 背景のないトラックのみ、枠線なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type SwitchRootVariant = "naked" | "liquid";

/**
 * {@link SwitchRoot} の状態です。
 */
export type SwitchRootState = Switch.Root.State;

/**
 * {@link SwitchRoot} に渡すプロパティーです。
 *
 * スタイルのプロパティーを変更すると、対応するクラスと表示が更新されます。
 */
export type SwitchRootProps = React.ComponentProps<typeof Switch.Root> & {
  /**
   * スイッチの色を指定します。
   *
   * 値を変更すると、スイッチの色が更新されます。
   *
   * @default "grey"
   */
  color?: SwitchRootColor | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * 未指定時は `variant` が `"naked"` の場合に表示します。
   * 値を変更すると、枠線の表示が更新されます。
   */
  outlined?: boolean | undefined;

  /**
   * スイッチの角丸を指定します。
   *
   * 値を変更すると、スイッチのスタイルが更新されます。
   *
   * @default "full"
   */
  radius?: SwitchRootRadius | undefined;

  /**
   * スイッチのサイズを指定します。
   *
   * 値を変更すると、スイッチのサイズが更新されます。
   *
   * @default "md"
   */
  size?: SwitchRootSize | undefined;

  /**
   * スイッチの主な外観を指定します。
   *
   * 値を変更すると、スイッチのスタイルが更新されます。
   *
   * @default "naked"
   */
  variant?: SwitchRootVariant | undefined;
};

/**
 * スイッチのルート要素です。
 */
export const SwitchRoot: IComponent<SwitchRootProps> = function SuiSwitchRoot(props) {
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = "full",
    variant: variantProp = "naked",
    disabled = false,
    outlined = variantProp === "naked",
    className,
    ...otherProps
  } = props;

  return (
    <Switch.Root
      {...otherProps}
      disabled={disabled}
      className={cn(
        className,
        "sui_switch",
        `sui_switch-size_${sizeProp}`,
        `sui_switch-color_${colorProp}`,
        `sui_switch-radius_${radiusProp}`,
        `sui_switch-variant_${variantProp}`,
        outlined && "sui_switch-outlined",
        disabled && "sui_switch-disabled",
      )}
    />
  );
};

/**
 * {@link SwitchRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link SwitchRootState} です。
   */
  export type State = SwitchRootState;

  /**
   * {@link SwitchRootProps} です。
   */
  export type Props = SwitchRootProps;

  /**
   * {@link SwitchRootColor} です。
   */
  export type Color = SwitchRootColor;

  /**
   * {@link SwitchRootRadius} です。
   */
  export type Radius = SwitchRootRadius;

  /**
   * {@link SwitchRootSize} です。
   */
  export type Size = SwitchRootSize;

  /**
   * {@link SwitchRootVariant} です。
   */
  export type Variant = SwitchRootVariant;
}

/**
 * {@link SwitchRoot} です。
 */
export const Root: IComponent<Root.Props> = SwitchRoot;

// Thumb
// -----

/**
 * {@link SwitchThumb} が公開するつまみ要素の状態です。
 */
export type SwitchThumbState = Switch.Thumb.State;

/**
 * {@link SwitchThumb} に渡すプロパティーです。
 */
export type SwitchThumbProps = React.ComponentProps<typeof Switch.Thumb>;

/**
 * スイッチのつまみ要素です。
 */
export const SwitchThumb: IComponent<SwitchThumbProps> = function SuiSwitchThumb(props) {
  const { className, ...otherProps } = props;

  return <Switch.Thumb {...otherProps} className={cn(className, "sui_switch_thumb")} />;
};

/**
 * {@link SwitchThumb} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Thumb {
  /**
   * {@link SwitchThumbState} です。
   */
  export type State = SwitchThumbState;

  /**
   * {@link SwitchThumbProps} です。
   */
  export type Props = SwitchThumbProps;
}

/**
 * {@link SwitchThumb} です。
 */
export const Thumb: IComponent<Thumb.Props> = SwitchThumb;
