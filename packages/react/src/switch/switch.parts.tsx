import { Switch } from "@base-ui/react/switch";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
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

export namespace SwitchRootProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof Switch.Root>,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<"span">
  >;

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<SwitchRootState>;

  export type SuruUI = {
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
}

/**
 * {@link SwitchRoot} に渡す props です。
 */
export type SwitchRootProps = SwitchRootProps.Render &
  SwitchRootProps.SuruUI &
  SwitchRootProps.BaseUI &
  SwitchRootProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SwitchRootProps.BaseUI}
     */
    export type BaseUI = SwitchRootProps.BaseUI;

    /**
     * {@link SwitchRootProps.HTML}
     */
    export type HTML = SwitchRootProps.HTML;

    /**
     * {@link SwitchRootProps.Render}
     */
    export type Render = SwitchRootProps.Render;

    /**
     * {@link SwitchRootProps.SuruUI}
     */
    export type SuruUI = SwitchRootProps.SuruUI;
  }

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

export namespace SwitchThumbProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof Switch.Thumb>,
    keyof Render | keyof React.ComponentProps<"span">
  >;

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render>;

  export type Render = RenderProps<SwitchThumbState>;

  export type SuruUI = {};
}

/**
 * {@link SwitchThumb} に渡す props です。
 */
export type SwitchThumbProps = SwitchThumbProps.Render &
  SwitchThumbProps.SuruUI &
  SwitchThumbProps.BaseUI &
  SwitchThumbProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    /**
     * {@link SwitchThumbProps.BaseUI}
     */
    export type BaseUI = SwitchThumbProps.BaseUI;

    /**
     * {@link SwitchThumbProps.HTML}
     */
    export type HTML = SwitchThumbProps.HTML;

    /**
     * {@link SwitchThumbProps.Render}
     */
    export type Render = SwitchThumbProps.Render;

    /**
     * {@link SwitchThumbProps.SuruUI}
     */
    export type SuruUI = SwitchThumbProps.SuruUI;
  }
}
