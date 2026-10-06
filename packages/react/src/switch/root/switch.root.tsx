import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import { Switch } from "@base-ui/react/switch";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type SwitchContextSize,
  type SwitchContextColor,
  type SwitchContextRadius,
  type SwitchContextVariant,
  SwitchContext,
} from "./switch.root.context.js";

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
export type SwitchRootColor = SwitchContextColor;

/**
 * スイッチの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type SwitchRootRadius = SwitchContextRadius;

/**
 * スイッチの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type SwitchRootSize = SwitchContextSize;

/**
 * スイッチの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type SwitchRootVariant = SwitchContextVariant;

/**
 * {@link SwitchRoot} が持つ状態です。
 */
export type SwitchRootState = Override<SwitchContext, Switch.Root.State>;

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

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Switch.Root>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NonNativeButtonProps より:
      | keyof NonNativeButtonProps
      // SwitchRootProps より:
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
      | "value"
    >,
    keyof Render | keyof SuruUI
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

export type ISwitchRoot = IComponent<SwitchRootProps>;

/**
 * スイッチのルートコンポーネントです。
 */
export const SwitchRoot: ISwitchRoot = function SuiSwitchRoot(props) {
  const {
    size = "md",
    color = "grey",
    style,
    radius = "full",
    render,
    variant = "liquid",
    outlined = false,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = React.useMemo<SwitchContext>(
    () => ({ size, color, radius, variant, outlined }),
    [size, color, radius, variant, outlined],
  );

  return (
    <SwitchContext value={ctx}>
      <Switch.Root
        {...otherProps}
        {...proxyRenderProps<Switch.Root.State, SwitchRootState>(
          (state) => ({ ...ctx, ...state }),
          {
            style,
            render,
            className: cn<SwitchRootState>(
              className,
              "sui_switch",
              (state) => `sui_switch-size_${state.size}`,
              (state) => `sui_switch-color_${state.color}`,
              (state) => `sui_switch-radius_${state.radius}`,
              (state) => `sui_switch-variant_${state.variant}`,
              (state) => state.outlined && "sui_switch-outlined",
              (state) => state.dirty && "sui_switch-dirty",
              (state) => state.valid === null && "sui_switch-unverified",
              (state) => state.valid === true && "sui_switch-valid",
              (state) => state.valid === false && "sui_switch-invalid",
              (state) => state.filled && "sui_switch-filled",
              (state) => state.checked && "sui_switch-checked",
              (state) => state.focused && "sui_switch-focused",
              (state) => state.touched && "sui_switch-touched",
              (state) => state.disabled && "sui_switch-disabled",
              (state) => state.readOnly && "sui_switch-readonly",
              (state) => state.required && "sui_switch-required",
            ),
          },
        )}
        data-scope={dataScope}
      />
    </SwitchContext>
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
