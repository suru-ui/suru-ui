import { RadioGroup } from "@base-ui/react/radio-group";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type RadioGroupContextSize,
  type RadioGroupContextColor,
  type RadioGroupContextRadius,
  type RadioGroupContextVariant,
  type RadioGroupContextOrientation,
  RadioGroupContext,
} from "./radio-group.root.context.js";

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
export type RadioGroupRootColor = RadioGroupContextColor;

/**
 * ラジオボタン群の向きです。
 *
 * - `"horizontal"`: 横並び
 * - `"vertical"`: 縦並び
 */
export type RadioGroupRootOrientation = RadioGroupContextOrientation;

/**
 * ラジオボタンの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 * - `"circle"`: 完全な丸形
 */
export type RadioGroupRootRadius = RadioGroupContextRadius;

/**
 * ラジオボタンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type RadioGroupRootSize = RadioGroupContextSize;

/**
 * ラジオボタンの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type RadioGroupRootVariant = RadioGroupContextVariant;

/**
 * {@link RadioGroupRoot} が持つ状態です。
 */
export type RadioGroupRootState = Override<RadioGroupContext, RadioGroup.State>;

export namespace RadioGroupRootProps {
  export type Render = RenderProps<RadioGroupRootState>;

  export type SuruUI = {
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
     * @default true
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

  export type BaseUI<TValue = any> = Omit<
    Pick<
      React.ComponentProps<typeof RadioGroup<TValue>>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // RadioGroupRootProps より:
      | "value"
      | "defaultValue"
      | "disabled"
      | "readOnly"
      | "required"
      | "name"
      | "form"
      | "onValueChange"
      | "inputRef"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML<TValue = any> = Omit<
    React.ComponentProps<typeof RadioGroup<TValue>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link RadioGroupRoot} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 */
export type RadioGroupRootProps<TValue = any> = RadioGroupRootProps.Render &
  RadioGroupRootProps.SuruUI &
  RadioGroupRootProps.BaseUI<TValue> &
  RadioGroupRootProps.HTML<TValue>;

/**
 * ラジオボタングループのルートコンポーネントです。
 */
export interface IRadioGroupRoot extends IComponent<RadioGroupRootProps> {
  /**
   * @template TValue 項目の値の型です。
   */
  <TValue = any>(props: RadioGroupRootProps<TValue>): IComponent.Return;
}

export const RadioGroupRoot: IRadioGroupRoot = function SuiRadioGroupRoot(
  props: RadioGroupRootProps,
) {
  const {
    size = "md",
    color = "grey",
    style,
    radius = "full",
    render,
    variant = "naked",
    disabled,
    outlined = true,
    className,
    orientation = "vertical",
    // @ts-expect-error
    "data-scope": dataScope = "",
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
      orientation,
    }),
    [size, color, radius, variant, disabled, outlined, orientation],
  );

  return (
    <RadioGroupContext value={ctx}>
      <RadioGroup
        {...otherProps}
        {...proxyRenderProps<RadioGroup.State, RadioGroupRootState>(
          (state) => ({ ...ctx, ...state }),
          {
            style,
            render,
            className: cn<RadioGroupRootState>(
              className,
              "sui_radio_group",
              (state) => `sui_radio_group-size_${state.size}`,
              (state) => `sui_radio_group-color_${state.color}`,
              (state) => `sui_radio_group-radius_${state.radius}`,
              (state) => `sui_radio_group-variant_${state.variant}`,
              (state) => state.outlined && "sui_radio_group-outlined",
              (state) => `sui_radio_group-orientation_${state.orientation}`,
              (state) => state.dirty && "sui_radio_group-dirty",
              (state) => state.valid === false && "sui_radio_group-invalid",
              (state) => state.valid === true && "sui_radio_group-valid",
              (state) => state.valid === null && "sui_radio_group-unverified",
              (state) => state.filled && "sui_radio_group-filled",
              (state) => state.focused && "sui_radio_group-focused",
              (state) => state.touched && "sui_radio_group-touched",
              (state) => state.disabled && "sui_radio_group-disabled",
              (state) => state.readOnly && "sui_radio_group-readonly",
              (state) => state.required && "sui_radio_group-required",
            ),
          },
        )}
        disabled={disabled}
        data-scope={dataScope}
      />
    </RadioGroupContext>
  );
};

export { RadioGroupRoot as Root };

export namespace Root {
  export type State = RadioGroupRootState;

  export type Props<TValue = any> = Props.Render &
    Props.SuruUI &
    Props.BaseUI<TValue> &
    Props.HTML<TValue>;

  export namespace Props {
    export type Render = RadioGroupRootProps.Render;

    export type SuruUI = RadioGroupRootProps.SuruUI;

    export type BaseUI<TValue = any> = RadioGroupRootProps.BaseUI<TValue>;

    export type HTML<TValue = any> = RadioGroupRootProps.HTML<TValue>;
  }

  export type ChangeEventDetails = RadioGroupRootChangeEventDetails;

  export type ChangeEventReason = RadioGroupRootChangeEventReason;

  export type Color = RadioGroupRootColor;

  export type Orientation = RadioGroupRootOrientation;

  export type Radius = RadioGroupRootRadius;

  export type Size = RadioGroupRootSize;

  export type Variant = RadioGroupRootVariant;
}
