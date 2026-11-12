import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type NumberFieldContextSize,
  type NumberFieldContextColor,
  type NumberFieldContextRadius,
  type NumberFieldContextVariant,
  NumberFieldContext,
} from "./number-field.root.context.js";

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

/** 数値入力欄の配色です。 */
export type NumberFieldRootColor = NumberFieldContextColor;

/**
 * 数値入力欄の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 * - `"circle"`: 完全な円形
 */
export type NumberFieldRootRadius = NumberFieldContextRadius;

/**
 * 数値入力欄の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type NumberFieldRootSize = NumberFieldContextSize;

/**
 * 数値入力欄の主な外観の種類です。
 *
 * - `"naked"`: 背景のない数値入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type NumberFieldRootVariant = NumberFieldContextVariant;

/**
 * {@link NumberFieldRoot} が持つ状態です。
 */
export type NumberFieldRootState = Override<NumberFieldContext, NumberField.Root.State>;

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
     * @default true
     */
    outlined?: boolean | undefined;

    /**
     * 数値入力欄の角丸を指定します。
     *
     * 既定値は {@link NumberFieldRootProps.size|size}。
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
     * @default "naked"
     */
    variant?: NumberFieldRootVariant | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof NumberField.Root>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NumberFieldRootProps より :
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
      | "inputRef"
    >,
    keyof Render | keyof SuruUI
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

export type INumberFieldRoot = IComponent<NumberFieldRootProps>;

/** 数値入力欄のルートコンポーネントです。 */
export const NumberFieldRoot: INumberFieldRoot = (props) => {
  const {
    size = "md",
    color = "grey",
    style,
    radius = size,
    render,
    variant = "naked",
    outlined = true,
    className,
    // @ts-expect-error data-scope は Base UI のコンポーネント型に含まれないため。
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = React.useMemo<NumberFieldContext>(
    () => ({
      size,
      color,
      radius,
      variant,
      outlined,
    }),
    [size, color, radius, variant, outlined],
  );

  return (
    <NumberFieldContext value={ctx}>
      <NumberField.Root
        {...otherProps}
        {...proxyRenderProps<NumberField.Root.State, NumberFieldRootState>(
          (state) => ({
            ...ctx,
            ...state,
          }),
          {
            style,
            render,
            className: cn<NumberFieldRootState>(
              className,
              "sui_number_field",
              (state) => `sui_number_field-size_${state.size}`,
              (state) => `sui_number_field-color_${state.color}`,
              (state) => `sui_number_field-radius_${state.radius}`,
              (state) => `sui_number_field-variant_${state.variant}`,
              (state) => state.outlined && "sui_number_field-outlined",
              (state) => state.disabled && "sui_number_field-disabled",
              (state) => state.readOnly && "sui_number_field-readonly",
              (state) => state.required && "sui_number_field-required",
              (state) => state.scrubbing && "sui_number_field-scrubbing",
              (state) => state.touched && "sui_number_field-touched",
              (state) => state.dirty && "sui_number_field-dirty",
              (state) => state.filled && "sui_number_field-filled",
              (state) => state.focused && "sui_number_field-focused",
              (state) => state.valid === false && "sui_number_field-invalid",
              (state) => state.valid === true && "sui_number_field-valid",
              (state) => state.valid === null && "sui_number_field-unverified",
            ),
          },
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
