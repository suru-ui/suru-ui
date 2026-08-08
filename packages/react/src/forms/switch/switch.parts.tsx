import { Switch } from "@base-ui/react/switch";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./switch.css";

/**
 * スイッチのスタイルバリエーションです。
 *
 * {@link SwitchRootProps} で指定できます。
 */
export type SwitchVariant = "naked" | "liquid";

/**
 * スイッチの角丸です。
 *
 * {@link SwitchRootProps} で指定できます。
 */
export type SwitchRadius = "none" | "rounded" | "full";

/**
 * {@link SwitchRoot} が公開するスイッチのルート要素の状態です。
 */
export type SwitchRootState = Switch.Root.State;

/**
 * {@link SwitchRoot} に渡すプロパティーです。
 *
 * スタイルのプロパティーを変更すると、対応するクラスと表示が更新されます。
 */
export type SwitchRootProps = React.ComponentProps<typeof Switch.Root> & {
  /**
   * スイッチのサイズを指定します。
   *
   * 指定可能な値はテーマの {@link Size} です。
   * 値を変更すると、スイッチのサイズが更新されます。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * スイッチの色を指定します。
   *
   * 指定可能な値はテーマの {@link Color} です。
   * 値を変更すると、スイッチの色が更新されます。
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
   * 値を変更すると、スイッチのスタイルが更新されます。
   *
   * @default "naked"
   */
  variant?: SwitchVariant | undefined;

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
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * 値を変更すると、スイッチの角丸が更新されます。
   *
   * @default "full"
   */
  radius?: SwitchRadius | undefined;
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
  /**
   * {@link SwitchRoot} の状態型です。
   */
  export type State = SwitchRootState;

  /**
   * {@link SwitchRoot} のプロパティー型です。
   */
  export type Props = SwitchRootProps;
}

/**
 * {@link SwitchRoot} の別名です。
 */
export const Root: Component<Root.Props> = SwitchRoot;

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
  /**
   * {@link SwitchThumb} の状態型です。
   */
  export type State = SwitchThumbState;

  /**
   * {@link SwitchThumb} のプロパティー型です。
   */
  export type Props = SwitchThumbProps;
}

/**
 * {@link SwitchThumb} の別名です。
 */
export const Thumb: Component<Thumb.Props> = SwitchThumb;
