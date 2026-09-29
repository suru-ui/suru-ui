import { NumberField } from "@base-ui/react/number-field";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { NumberFieldContext } from "./number-field.context.js";

/**
 * {@link NumberFieldRoot} の値が変更されたイベントの詳細です。
 */
export type NumberFieldRootChangeEventDetails = NumberField.Root.ChangeEventDetails;

/**
 * {@link NumberFieldRoot} の値が変更された理由です。
 */
export type NumberFieldRootChangeEventReason = NumberField.Root.ChangeEventReason;

/**
 * {@link NumberFieldRoot} の値が確定されたイベントの詳細です。
 */
export type NumberFieldRootCommitEventDetails = NumberField.Root.CommitEventDetails;

/**
 * {@link NumberFieldRoot} の値が確定された理由です。
 */
export type NumberFieldRootCommitEventReason = NumberField.Root.CommitEventReason;

/**
 * 数値入力欄の配色です。
 */
export type NumberFieldRootColor = Color;

/**
 * 数値入力欄の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type NumberFieldRootRadius = "none" | Size | "full";

/**
 * 数値入力欄の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type NumberFieldRootSize = Size;

/**
 * 数値入力欄の主な外観の種類です。
 *
 * - `"naked"`: 背景のない数値入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type NumberFieldRootVariant = "naked" | "liquid";

/**
 * {@link NumberFieldRoot} が持つ状態です。
 */
export type NumberFieldRootState = NumberField.Root.State;

export namespace NumberFieldRootProps {
  export type Render = RenderProps<NumberFieldRootState>;

  export type SuruUI = {
    /**
     * フォーカス時に枠線へ適用する色を指定します。
     *
     * @default "grey"
     */
    color?: NumberFieldRootColor | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * 数値入力欄の角丸を指定します。
     *
     * 既定値は {@link NumberFieldRootProps.size|size}
     */
    radius?: NumberFieldRootRadius | undefined;

    /**
     * 数値入力欄のサイズを指定します。
     *
     * @default "md"
     */
    size?: NumberFieldRootSize | undefined;

    /**
     * 数値入力欄の主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: NumberFieldRootVariant | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NumberFieldRootProps:
      | "id"
      | "min"
      | "max"
      | "allowOutOfRange"
      | "smallStep"
      | "step"
      | "largeStep"
      | "required"
      | "disabled"
      | "readOnly"
      | "name"
      | "form"
      | "value"
      | "defaultValue"
      | "allowWheelScrub"
      | "snapOnStep"
      | "format"
      | "onValueChange"
      | "onValueCommitted"
      | "locale"
      | "inputRef",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldRoot} に渡す props です。
 */
export type NumberFieldRootProps = NumberFieldRootProps.Render &
  NumberFieldRootProps.SuruUI &
  NumberFieldRootProps.BaseUI &
  NumberFieldRootProps.HTML;

/**
 * 数値入力欄のルートコンポーネントです。
 */
export const NumberFieldRoot: IComponent<NumberFieldRootProps> = function SuiNumberFieldRoot(
  props,
) {
  const {
    size = "md",
    color = "grey",
    radius = size,
    variant = "liquid",
    outlined = false,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = React.useMemo<NumberFieldContext>(
    () => ({ size, color, radius, variant, outlined }),
    [size, color, radius, variant, outlined],
  );

  return (
    <NumberFieldContext value={ctx}>
      <NumberField.Root
        {...otherProps}
        className={cn(
          className,
          "sui_number_field",
          `sui_number_field-size_${size}`,
          `sui_number_field-color_${color}`,
          `sui_number_field-radius_${radius}`,
          `sui_number_field-variant_${variant}`,
          outlined && "sui_number_field-outlined",
          (state) => state.disabled && "sui_number_field-disabled",
        )}
        data-scope={dataScope}
      />
    </NumberFieldContext>
  );
};

export { NumberFieldRoot as Root };

export namespace Root {
  export type State = NumberFieldRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldRootProps.Render;

    export type SuruUI = NumberFieldRootProps.SuruUI;

    export type BaseUI = NumberFieldRootProps.BaseUI;

    export type HTML = NumberFieldRootProps.HTML;
  }

  export type ChangeEventDetails = NumberFieldRootChangeEventDetails;

  export type ChangeEventReason = NumberFieldRootChangeEventReason;

  export type Color = NumberFieldRootColor;

  export type CommitEventDetails = NumberFieldRootCommitEventDetails;

  export type CommitEventReason = NumberFieldRootCommitEventReason;

  export type Radius = NumberFieldRootRadius;

  export type Size = NumberFieldRootSize;

  export type Variant = NumberFieldRootVariant;
}
