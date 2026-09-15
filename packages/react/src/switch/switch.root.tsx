import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import { Switch } from "@base-ui/react/switch";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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
     * @default false
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
     * @default "liquid"
     */
    variant?: SwitchRootVariant | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Switch.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NonNativeButtonProps:
      | keyof NonNativeButtonProps
      // SwitchRootProps:
      | "checked"
      | "defaultChecked"
      | "disabled"
      | "form"
      | "id"
      | "inputRef"
      | "name"
      | "onCheckedChange"
      | "readOnly"
      | "required"
      | "uncheckedValue"
      | "value",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Switch.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
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
    variant = "liquid",
    outlined = false,
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
