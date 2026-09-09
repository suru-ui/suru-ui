import { Switch } from "@base-ui/react/switch";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./switch.css";

// Root
// ----

/**
 * スイッチの選択状態が変更されたイベントの詳細です。
 */
export type SwitchRootChangeEventDetails = Switch.Root.ChangeEventDetails;

/**
 * スイッチの選択状態が変更された理由です。
 */
export type SwitchRootChangeEventReason = Switch.Root.ChangeEventReason;

/**
 * スイッチの配色です。
 */
export type SwitchRootColor = Color;

/**
 * スイッチの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type SwitchRootRadius = "none" | Size | "full";

/**
 * スイッチの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type SwitchRootSize = Size;

/**
 * スイッチの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type SwitchRootVariant = "naked" | "liquid";

/**
 * {@link SwitchRoot} が持つ状態です。
 */
export type SwitchRootState = Switch.Root.State;

/**
 * {@link SwitchRoot} に渡す props です。
 */
export type SwitchRootProps = React.ComponentProps<typeof Switch.Root> & {
  /**
   * スイッチの配色を指定します。
   *
   * @default "grey"
   */
  color?: SwitchRootColor | undefined;

  /**
   * スイッチに枠線を表示するかどうかを指定します。
   *
   * 既定値は {@link SwitchRootProps.variant|variant} が `"naked"` かどうか
   */
  outlined?: boolean | undefined;

  /**
   * スイッチの角丸の大きさを指定します。
   *
   * @default "full"
   */
  radius?: SwitchRootRadius | undefined;

  /**
   * スイッチの大きさを指定します。
   *
   * @default "md"
   */
  size?: SwitchRootSize | undefined;

  /**
   * スイッチの主な外観を指定します。
   *
   * @default "naked"
   */
  variant?: SwitchRootVariant | undefined;
};

/**
 * スイッチのルートコンポーネントです。
 */
export const SwitchRoot: IComponent<SwitchRootProps> = function SuiSwitchRoot(props) {
  const {
    size = "md",
    color = "grey",
    radius = "full",
    variant = "naked",
    outlined = variant === "naked",
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Switch.Root
      {...otherProps}
      className={cn(
        className,
        "sui_switch",
        `sui_switch-size_${size}`,
        `sui_switch-color_${color}`,
        `sui_switch-radius_${radius}`,
        `sui_switch-variant_${variant}`,
        outlined && "sui_switch-outlined",
        (state) => state.checked && "sui_switch-checked",
        (state) => state.disabled && "sui_switch-disabled",
      )}
      data-scope={dataScope}
    />
  );
};

export { SwitchRoot as Root };

export namespace Root {
  /**
   * {@link SwitchRootState}
   */
  export type State = SwitchRootState;

  /**
   * {@link SwitchRootProps}
   */
  export type Props = SwitchRootProps;

  /**
   * {@link SwitchRootChangeEventDetails}
   */
  export type ChangeEventDetails = SwitchRootChangeEventDetails;

  /**
   * {@link SwitchRootChangeEventReason}
   */
  export type ChangeEventReason = SwitchRootChangeEventReason;

  /**
   * {@link SwitchRootColor}
   */
  export type Color = SwitchRootColor;

  /**
   * {@link SwitchRootRadius}
   */
  export type Radius = SwitchRootRadius;

  /**
   * {@link SwitchRootSize}
   */
  export type Size = SwitchRootSize;

  /**
   * {@link SwitchRootVariant}
   */
  export type Variant = SwitchRootVariant;
}

// Thumb
// -----

/**
 * {@link SwitchThumb} が持つ状態です。
 */
export type SwitchThumbState = Switch.Thumb.State;

/**
 * {@link SwitchThumb} に渡す props です。
 */
export type SwitchThumbProps = React.ComponentProps<typeof Switch.Thumb>;

/**
 * スイッチのつまみコンポーネントです。
 */
export const SwitchThumb: IComponent<SwitchThumbProps> = function SuiSwitchThumb(props) {
  const { className, ...otherProps } = props;

  return <Switch.Thumb {...otherProps} className={cn(className, "sui_switch_thumb")} />;
};

export { SwitchThumb as Thumb };

export namespace Thumb {
  /**
   * {@link SwitchThumbState}
   */
  export type State = SwitchThumbState;

  /**
   * {@link SwitchThumbProps}
   */
  export type Props = SwitchThumbProps;
}
