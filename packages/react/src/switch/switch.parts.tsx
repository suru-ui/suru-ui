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

  export type BaseUI = Omit<
    React.ComponentProps<typeof Switch.Root>,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<"span">
  >;

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof SuruUI>;
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
  export type State = SwitchRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SwitchRootProps.Render;

    export type SuruUI = SwitchRootProps.SuruUI;

    export type BaseUI = SwitchRootProps.BaseUI;

    export type HTML = SwitchRootProps.HTML;
  }

  export type ChangeEventDetails = SwitchRootChangeEventDetails;

  export type ChangeEventReason = SwitchRootChangeEventReason;

  export type Color = SwitchRootColor;

  export type Radius = SwitchRootRadius;

  export type Size = SwitchRootSize;

  export type Variant = SwitchRootVariant;
}

// Thumb
// -----

/**
 * {@link SwitchThumb} が持つ状態です。
 */
export type SwitchThumbState = Switch.Thumb.State;

export namespace SwitchThumbProps {
  export type Render = RenderProps<SwitchThumbState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Switch.Thumb>,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<"span">
  >;

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof SuruUI>;
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
  export type State = SwitchThumbState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SwitchThumbProps.Render;

    export type SuruUI = SwitchThumbProps.SuruUI;

    export type BaseUI = SwitchThumbProps.BaseUI;

    export type HTML = SwitchThumbProps.HTML;
  }
}
