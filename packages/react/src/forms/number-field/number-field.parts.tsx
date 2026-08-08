import { NumberField } from "@base-ui/react/number-field";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./number-field.css";

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type NumberFieldRootState = NumberField.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type NumberFieldRootProps = Omit<React.ComponentProps<typeof NumberField.Root>, "size"> & {
  /**
   * フォーカス時に枠線へ適用するアクセントカラーを指定します。
   *
   * @default "grey"
   */
  accentColor?: Color | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   */
  outlined?: boolean | undefined;

  /**
   * 数値入力欄のサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * 数値入力欄のスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のない数値入力欄
   * - `"liquid"`: 薄い塗りつぶし
   *
   * @default "naked"
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * 数値入力欄の角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * @default "rounded"
   */
  radius?: "none" | "rounded" | "full" | undefined;
};

/**
 * 数値入力欄のルート要素です。
 *
 * Base UI の {@link NumberField.Root} をラップし、テーマに基づくスタイルクラスを適用します。
 * Field に組み込むと、検証状態が `data-*` 属性として自動的に付与されます。
 *
 * @example
 * ```tsx
 * <NumberFieldParts.Root defaultValue={100} min={0} max={200}>
 *   <NumberFieldParts.Group>
 *     <NumberFieldParts.Input />
 *     <NumberFieldParts.Decrement>−</NumberFieldParts.Decrement>
 *     <NumberFieldParts.Increment>＋</NumberFieldParts.Increment>
 *   </NumberFieldParts.Group>
 * </NumberFieldParts.Root>
 * ```
 */
export const NumberFieldRoot: Component<NumberFieldRootProps> = function SuiNumberFieldRoot(props) {
  const {
    size: sizeProp = "md",
    radius: radiusProp = "rounded",
    variant: variantProp = "naked",
    outlined: outlinedProp = variantProp === "naked",
    accentColor: accentColorProp = "grey",
    className,
    ...otherProps
  } = props;

  return (
    <NumberField.Root
      {...otherProps}
      className={cn(
        className,
        "sui_number_field",
        `sui_number_field-size_${sizeProp}`,
        `sui_number_field-variant_${variantProp}`,
        `sui_number_field-radius_${radiusProp}`,
        `sui_number_field-accent_color_${accentColorProp}`,
        outlinedProp && "sui_number_field-outlined",
        (state) => state.disabled && "sui_number_field-disabled",
      )}
    />
  );
};

export namespace Root {
  export type State = NumberFieldRootState;
  export type Props = NumberFieldRootProps;
}

export const Root: Component<Root.Props> = NumberFieldRoot;

// ScrubArea
// ---------

/**
 * {@link ScrubArea} の状態です。
 */
export type NumberFieldScrubAreaState = NumberField.ScrubArea.State;

/**
 * {@link ScrubArea} に渡すプロパティーです。
 */
export type NumberFieldScrubAreaProps = React.ComponentProps<typeof NumberField.ScrubArea>;

/**
 * ドラッグで値を変更できる領域です。
 *
 * @example
 * ```tsx
 * <NumberFieldParts.Root>
 *   <NumberFieldParts.ScrubArea>
 *     数量
 *     <NumberFieldParts.ScrubAreaCursor>
 *       <CursorIcon />
 *     </NumberFieldParts.ScrubAreaCursor>
 *   </NumberFieldParts.ScrubArea>
 *   <NumberFieldParts.Group>
 *     <NumberFieldParts.Input />
 *   </NumberFieldParts.Group>
 * </NumberFieldParts.Root>
 * ```
 */
export const NumberFieldScrubArea: Component<NumberFieldScrubAreaProps> =
  function SuiNumberFieldScrubArea(props) {
    const { className, ...otherProps } = props;

    return (
      <NumberField.ScrubArea
        {...otherProps}
        className={cn(className, "sui_number_field_scrub_area")}
      />
    );
  };

export namespace ScrubArea {
  export type State = NumberFieldScrubAreaState;
  export type Props = NumberFieldScrubAreaProps;
}

export const ScrubArea: Component<ScrubArea.Props> = NumberFieldScrubArea;

// ScrubAreaCursor
// ---------------

/**
 * {@link ScrubAreaCursor} の状態です。
 */
export type NumberFieldScrubAreaCursorState = NumberField.ScrubAreaCursor.State;

/**
 * {@link ScrubAreaCursor} に渡すプロパティーです。
 */
export type NumberFieldScrubAreaCursorProps = React.ComponentProps<
  typeof NumberField.ScrubAreaCursor
>;

/**
 * スクラブ中にネイティブカーソルの代わりに表示する要素です。
 *
 * @example
 * ```tsx
 * <NumberFieldParts.ScrubArea>
 *   <NumberFieldParts.ScrubAreaCursor>
 *     <CursorIcon />
 *   </NumberFieldParts.ScrubAreaCursor>
 * </NumberFieldParts.ScrubArea>
 * ```
 */
export const NumberFieldScrubAreaCursor: Component<NumberFieldScrubAreaCursorProps> =
  function SuiNumberFieldScrubAreaCursor(props) {
    const { className, ...otherProps } = props;

    return (
      <NumberField.ScrubAreaCursor
        {...otherProps}
        className={cn(className, "sui_number_field_scrub_area_cursor")}
      />
    );
  };

export namespace ScrubAreaCursor {
  export type State = NumberFieldScrubAreaCursorState;
  export type Props = NumberFieldScrubAreaCursorProps;
}

export const ScrubAreaCursor: Component<ScrubAreaCursor.Props> = NumberFieldScrubAreaCursor;

// Group
// -----

/**
 * {@link Group} の状態です。
 */
export type NumberFieldGroupState = NumberField.Group.State;

/**
 * {@link Group} に渡すプロパティーです。
 */
export type NumberFieldGroupProps = React.ComponentProps<typeof NumberField.Group>;

/**
 * 入力欄と増減ボタンをまとめるグループ要素です。
 *
 * @example
 * ```tsx
 * <NumberFieldParts.Root>
 *   <NumberFieldParts.Group>
 *     <NumberFieldParts.Input />
 *     <NumberFieldParts.Decrement>−</NumberFieldParts.Decrement>
 *     <NumberFieldParts.Increment>＋</NumberFieldParts.Increment>
 *   </NumberFieldParts.Group>
 * </NumberFieldParts.Root>
 * ```
 */
export const NumberFieldGroup: Component<NumberFieldGroupProps> = function SuiNumberFieldGroup(
  props,
) {
  const { className, ...otherProps } = props;

  return <NumberField.Group {...otherProps} className={cn(className, "sui_number_field_group")} />;
};

export namespace Group {
  export type State = NumberFieldGroupState;
  export type Props = NumberFieldGroupProps;
}

export const Group: Component<Group.Props> = NumberFieldGroup;

// Decrement
// ---------

/**
 * {@link Decrement} の状態です。
 */
export type NumberFieldDecrementState = NumberField.Decrement.State;

/**
 * {@link Decrement} に渡すプロパティーです。
 */
export type NumberFieldDecrementProps = React.ComponentProps<typeof NumberField.Decrement>;

/**
 * 値を減らすボタンです。
 *
 * @example
 * ```tsx
 * <NumberFieldParts.Decrement>−</NumberFieldParts.Decrement>
 * ```
 */
export const NumberFieldDecrement: Component<NumberFieldDecrementProps> =
  function SuiNumberFieldDecrement(props) {
    const { className, ...otherProps } = props;

    return (
      <NumberField.Decrement
        {...otherProps}
        className={cn(className, "sui_number_field_decrement")}
      />
    );
  };

export namespace Decrement {
  export type State = NumberFieldDecrementState;
  export type Props = NumberFieldDecrementProps;
}

export const Decrement: Component<Decrement.Props> = NumberFieldDecrement;

// Input
// -----

/**
 * {@link Input} の状態です。
 */
export type NumberFieldInputState = NumberField.Input.State;

/**
 * {@link Input} に渡すプロパティーです。
 */
export type NumberFieldInputProps = React.ComponentProps<typeof NumberField.Input>;

/**
 * 数値の入力欄です。
 *
 * @example
 * ```tsx
 * <NumberFieldParts.Input />
 * ```
 */
export const NumberFieldInput: Component<NumberFieldInputProps> = function SuiNumberFieldInput(
  props,
) {
  const { className, ...otherProps } = props;

  return <NumberField.Input {...otherProps} className={cn(className, "sui_number_field_input")} />;
};

export namespace Input {
  export type State = NumberFieldInputState;
  export type Props = NumberFieldInputProps;
}

export const Input: Component<Input.Props> = NumberFieldInput;

// Increment
// ---------

/**
 * {@link Increment} の状態です。
 */
export type NumberFieldIncrementState = NumberField.Increment.State;

/**
 * {@link Increment} に渡すプロパティーです。
 */
export type NumberFieldIncrementProps = React.ComponentProps<typeof NumberField.Increment>;

/**
 * 値を増やすボタンです。
 *
 * @example
 * ```tsx
 * <NumberFieldParts.Increment>＋</NumberFieldParts.Increment>
 * ```
 */
export const NumberFieldIncrement: Component<NumberFieldIncrementProps> =
  function SuiNumberFieldIncrement(props) {
    const { className, ...otherProps } = props;

    return (
      <NumberField.Increment
        {...otherProps}
        className={cn(className, "sui_number_field_increment")}
      />
    );
  };

export namespace Increment {
  export type State = NumberFieldIncrementState;
  export type Props = NumberFieldIncrementProps;
}

export const Increment: Component<Increment.Props> = NumberFieldIncrement;
