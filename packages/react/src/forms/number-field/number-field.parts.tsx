import { NumberField } from "@base-ui/react/number-field";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./number-field.css";

// Root
// ----

/**
 * {@link NumberFieldRoot} の状態です。
 */
export type NumberFieldRootState = NumberField.Root.State;

/**
 * {@link NumberFieldRoot} に渡すプロパティーです。
 */
export type NumberFieldRootProps = Omit<React.ComponentProps<typeof NumberField.Root>, "size"> & {
  /**
   * フォーカス時に枠線へ適用するアクセントカラーを指定します。
   *
   * 指定可能な値はテーマの {@link Color} です。
   * `accentColor` はフォーカス中の枠線にだけ適用されます。
   *
   * @default "grey"
   */
  accentColor?: Color | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * 未指定時は `variant` が `"naked"` の場合に表示します。
   * 明示した値が `variant` による既定値より優先されます。
   */
  outlined?: boolean | undefined;

  /**
   * 数値入力欄のサイズを指定します。
   *
   * 指定可能な値はテーマの {@link Size} です。
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
   * `outlined` を指定しない場合は、`"naked"` のときだけ枠線を表示します。
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
   * 指定値は角丸の見た目だけを変更し、入力値やフォーカス状態は変更しません。
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
        `sui_number_field-radius_${radiusProp}`,
        `sui_number_field-variant_${variantProp}`,
        `sui_number_field-accent_color_${accentColorProp}`,
        outlinedProp && "sui_number_field-outlined",
        (state) => state.disabled && "sui_number_field-disabled",
      )}
    />
  );
};

/**
 * {@link NumberFieldRoot} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link NumberFieldRoot} の状態型です。
   */
  export type State = NumberFieldRootState;

  /**
   * {@link NumberFieldRoot} のプロパティー型です。
   */
  export type Props = NumberFieldRootProps;
}

/**
 * {@link NumberFieldRoot} の別名です。
 */
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

/**
 * {@link NumberFieldScrubArea} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace ScrubArea {
  /**
   * {@link NumberFieldScrubArea} の状態型です。
   */
  export type State = NumberFieldScrubAreaState;

  /**
   * {@link NumberFieldScrubArea} のプロパティー型です。
   */
  export type Props = NumberFieldScrubAreaProps;
}

/**
 * {@link NumberFieldScrubArea} の別名です。
 */
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

/**
 * {@link NumberFieldScrubAreaCursor} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace ScrubAreaCursor {
  /**
   * {@link NumberFieldScrubAreaCursor} の状態型です。
   */
  export type State = NumberFieldScrubAreaCursorState;

  /**
   * {@link NumberFieldScrubAreaCursor} のプロパティー型です。
   */
  export type Props = NumberFieldScrubAreaCursorProps;
}

/**
 * {@link NumberFieldScrubAreaCursor} の別名です。
 */
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

/**
 * {@link NumberFieldGroup} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Group {
  /**
   * {@link NumberFieldGroup} の状態型です。
   */
  export type State = NumberFieldGroupState;

  /**
   * {@link NumberFieldGroup} のプロパティー型です。
   */
  export type Props = NumberFieldGroupProps;
}

/**
 * {@link NumberFieldGroup} の別名です。
 */
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

/**
 * {@link NumberFieldDecrement} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Decrement {
  /**
   * {@link NumberFieldDecrement} の状態型です。
   */
  export type State = NumberFieldDecrementState;

  /**
   * {@link NumberFieldDecrement} のプロパティー型です。
   */
  export type Props = NumberFieldDecrementProps;
}

/**
 * {@link NumberFieldDecrement} の別名です。
 */
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

/**
 * {@link NumberFieldInput} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Input {
  /**
   * {@link NumberFieldInput} の状態型です。
   */
  export type State = NumberFieldInputState;

  /**
   * {@link NumberFieldInput} のプロパティー型です。
   */
  export type Props = NumberFieldInputProps;
}

/**
 * {@link NumberFieldInput} の別名です。
 */
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

/**
 * {@link NumberFieldIncrement} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Increment {
  /**
   * {@link NumberFieldIncrement} の状態型です。
   */
  export type State = NumberFieldIncrementState;

  /**
   * {@link NumberFieldIncrement} のプロパティー型です。
   */
  export type Props = NumberFieldIncrementProps;
}

/**
 * {@link NumberFieldIncrement} の別名です。
 */
export const Increment: Component<Increment.Props> = NumberFieldIncrement;
