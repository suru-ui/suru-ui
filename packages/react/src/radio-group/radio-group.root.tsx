import { RadioGroup } from "@base-ui/react/radio-group";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { RadioRootRadius, RadioRootVariant } from "../radio/radio.parts.js";
import type { IComponent } from "../types.js";
import { RadioGroupContext } from "./radio-group.context.js";

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
     * @default false
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
     * @default "liquid"
     */
    variant?: RadioGroupRootVariant | undefined;
  };

  export type BaseUI<TValue = any> = Pick<
    React.ComponentProps<typeof RadioGroup<TValue>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // RadioGroupRootProps:
      | "value"
      | "defaultValue"
      | "disabled"
      | "readOnly"
      | "required"
      | "name"
      | "form"
      | "onValueChange"
      | "inputRef",
      keyof Render | keyof SuruUI
    >
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
interface IRadioGroupRoot extends IComponent<RadioGroupRootProps> {
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
    radius = "full",
    variant = "liquid",
    disabled,
    outlined = false,
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
