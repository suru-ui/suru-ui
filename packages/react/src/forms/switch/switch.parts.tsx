import { Switch } from "@base-ui/react/switch";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./switch.css";

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type SwitchRootState = Switch.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type SwitchRootProps = React.ComponentProps<typeof Switch.Root> & {
  /**
   * スイッチのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * スイッチの色を指定します。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * スイッチのスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のないトラックのみ、枠線なし
   * - `"liquid"`: 薄い塗りつぶし
   *
   * @default "naked"
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   */
  outlined?: boolean | undefined;

  /**
   * スイッチの角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * @default "full"
   */
  radius?: "none" | "rounded" | "full" | undefined;
};

/**
 * スイッチのルート要素です。
 *
 * @example
 * ```tsx
 * <SwitchParts.Root color="blue" defaultChecked>
 *   <SwitchParts.Thumb />
 * </SwitchParts.Root>
 * ```
 */
export const SwitchRoot: Component<SwitchRootProps> = function SuiSwitchRoot(props) {
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

export namespace Root {
  export type State = SwitchRootState;
  export type Props = SwitchRootProps;
}

export const Root: Component<Root.Props> = SwitchRoot;

// Thumb
// -----

/**
 * {@link Thumb} の状態です。
 */
export type SwitchThumbState = Switch.Thumb.State;

/**
 * {@link Thumb} に渡すプロパティーです。
 */
export type SwitchThumbProps = React.ComponentProps<typeof Switch.Thumb>;

/**
 * スイッチのつまみ要素です。
 *
 * @example
 * ```tsx
 * <SwitchParts.Root defaultChecked>
 *   <SwitchParts.Thumb />
 * </SwitchParts.Root>
 * ```
 */
export const SwitchThumb: Component<SwitchThumbProps> = function SuiSwitchThumb(props) {
  const { className, ...otherProps } = props;

  return <Switch.Thumb {...otherProps} className={cn(className, "sui_switch_thumb")} />;
};

export namespace Thumb {
  export type State = SwitchThumbState;
  export type Props = SwitchThumbProps;
}

export const Thumb: Component<Thumb.Props> = SwitchThumb;
