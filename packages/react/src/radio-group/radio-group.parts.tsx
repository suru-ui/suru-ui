import { RadioGroup } from "@base-ui/react/radio-group";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { RadioRootRadius, RadioRootVariant } from "../radio/radio.parts.jsx";
import type { IComponent, IUseContext } from "../types.js";

import "./radio-group.css";

// Context
// -------

/**
 * ラジオボタンの配色です。
 */
export type RadioGroupContextColor = Color;

/**
 * ラジオボタンの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type RadioGroupContextRadius = "none" | Size | "full";

/**
 * ラジオボタンの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
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

function useSuiRadioGroupContext(optional?: false): RadioGroupContext;
function useSuiRadioGroupContext(optional?: boolean): RadioGroupContext | null;
function useSuiRadioGroupContext(optional?: boolean): RadioGroupContext | null {
  const ctx = React.use(RadioGroupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "RadioGroupContext",
      providerName: "RadioGroupRoot",
    });
  }

  return ctx;
}

/**
 * {@link RadioGroupContext} を読み取るフックです。
 */
export const useRadioGroupContext: IUseContext<RadioGroupContext> = useSuiRadioGroupContext;

export { RadioGroupContext as Context, useRadioGroupContext as useContext };

export namespace Context {
  /**
   * {@link RadioGroupContextColor}
   */
  export type Color = RadioGroupContextColor;

  /**
   * {@link RadioGroupContextRadius}
   */
  export type Radius = RadioGroupContextRadius;

  /**
   * {@link RadioGroupContextSize}
   */
  export type Size = RadioGroupContextSize;

  /**
   * {@link RadioGroupContextVariant}
   */
  export type Variant = RadioGroupContextVariant;
}

// Root
// ----

/**
 * ラジオボタングループの選択状態が変更されたイベントの詳細です。
 */
export type RadioGroupRootChangeEventDetails = RadioGroup.ChangeEventDetails;

/**
 * ラジオボタングループの選択状態が変更された理由です。
 */
export type RadioGroupRootChangeEventReason = RadioGroup.ChangeEventReason;

/**
 * ラジオボタンの配色です。
 */
export type RadioGroupRootColor = Color;

/**
 * ラジオボタン群の向きです。
 *
 * - `"horizontal"`: 横並び
 * - `"vertical"`: 縦並び
 */
export type RadioGroupRootOrientation = "horizontal" | "vertical";

/**
 * ラジオボタンの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type RadioGroupRootRadius = RadioRootRadius;

/**
 * ラジオボタンの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type RadioGroupRootSize = Size;

/**
 * ラジオボタンの主な外観です。
 *
 * - `"naked"`: 背景のないインジケーターのみ、枠線なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type RadioGroupRootVariant = RadioRootVariant;

/**
 * {@link RadioGroupRoot} が持つ状態です。
 */
export type RadioGroupRootState = RadioGroup.State;

/**
 * {@link RadioGroupRoot} に渡す props です。
 */
export type RadioGroupRootProps = React.ComponentProps<typeof RadioGroup> & {
  /**
   * ラジオボタンの配色を指定します。
   *
   * グループ内のラジオボタンより優先されます。
   *
   * @default "grey"
   */
  color?: RadioGroupRootColor | undefined;

  /**
   * ラジオボタン群の向きを指定します。
   *
   * @default "vertical"
   */
  orientation?: RadioGroupRootOrientation | undefined;

  /**
   * ラジオボタンに枠線を表示するかどうかを指定します。
   *
   * グループ内のラジオボタンより優先されます。
   *
   * 既定値は {@link RadioGroupRootProps.variant|variant} が `"naked"` かどうかです。
   */
  outlined?: boolean | undefined;

  /**
   * ラジオボタンの角丸を指定します。
   *
   * グループ内のラジオボタンより優先されます。
   *
   * @default "full"
   */
  radius?: RadioGroupRootRadius | undefined;

  /**
   * ラジオボタンの大きさを指定します。
   *
   * グループ内のラジオボタンより優先されます。
   *
   * @default "md"
   */
  size?: RadioGroupRootSize | undefined;

  /**
   * ラジオボタンの主な外観を指定します。
   *
   * グループ内のラジオボタンより優先されます。
   *
   * @default "naked"
   */
  variant?: RadioGroupRootVariant | undefined;
};

/**
 * ラジオボタングループのルートコンポーネントです。
 */
export const RadioGroupRoot: IComponent<RadioGroupRootProps> = function SuiRadioGroupRoot(props) {
  const {
    size = "md",
    color = "grey",
    radius = "full",
    variant = "naked",
    disabled,
    outlined = variant === "naked",
    // @ts-expect-error
    "data-scope": dataScope = "",
    className,
    orientation = "vertical",
    ...otherProps
  } = props;
  const ctx = React.useMemo<RadioGroupContext>(
    () => ({
      size,
      color,
      radius,
      variant,
      disabled,
      outlined,
    }),
    [size, color, radius, variant, disabled, outlined],
  );

  return (
    <RadioGroupContext value={ctx}>
      <RadioGroup
        {...otherProps}
        disabled={disabled}
        className={cn(
          className,
          "sui_radio_group",
          `sui_radio_group-orientation_${orientation}`,
          (state) => state.disabled && "sui_radio_group-disabled",
        )}
        data-scope={dataScope}
      />
    </RadioGroupContext>
  );
};

export { RadioGroupRoot as Root };

export namespace Root {
  /**
   * {@link RadioGroupRootState}
   */
  export type State = RadioGroupRootState;

  /**
   * {@link RadioGroupRootProps}
   */
  export type Props = RadioGroupRootProps;

  /**
   * {@link RadioGroupRootChangeEventDetails}
   */
  export type ChangeEventDetails = RadioGroupRootChangeEventDetails;

  /**
   * {@link RadioGroupRootChangeEventReason}
   */
  export type ChangeEventReason = RadioGroupRootChangeEventReason;

  /**
   * {@link RadioGroupRootColor}
   */
  export type Color = RadioGroupRootColor;

  /**
   * {@link RadioGroupRootOrientation}
   */
  export type Orientation = RadioGroupRootOrientation;

  /**
   * {@link RadioGroupRootRadius}
   */
  export type Radius = RadioGroupRootRadius;

  /**
   * {@link RadioGroupRootSize}
   */
  export type Size = RadioGroupRootSize;

  /**
   * {@link RadioGroupRootVariant}
   */
  export type Variant = RadioGroupRootVariant;
}
