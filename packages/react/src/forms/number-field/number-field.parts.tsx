import { NumberField } from "@base-ui/react/number-field";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import { useActionGroupContext } from "../../layout/action-group/action-group.parts.jsx";
import type { Component } from "../../types.js";

import "./number-field.css";

// Context
// -------

/**
 * {@link NumberFieldRoot} が子パーツへ提供するスタイルです。
 */
export type NumberFieldContext = {
  /**
   * テキストフィールドの色です。
   */
  readonly color: Color;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * テキストフィールドの角丸です。
   */
  readonly radius: "none" | Size | "full";

  /**
   * テキストフィールドのサイズです。
   */
  readonly size: Size;

  /**
   * テキストフィールドのスタイルバリエーションです。
   */
  readonly variant: "naked" | "liquid";
};

/**
 * NumberField のスタイルを子パーツへ伝播するコンテキストです。
 */
export const NumberFieldContext: React.Context<NumberFieldContext | null> =
  React.createContext<NumberFieldContext | null>(null);

/**
 * {@link NumberFieldContext} を読み取るフックです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
 */
export function useNumberFieldContext(optional?: false): NumberFieldContext;
export function useNumberFieldContext(optional?: boolean): NumberFieldContext | null;
export function useNumberFieldContext(optional?: boolean): NumberFieldContext | null {
  const context = React.use(NumberFieldContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "NumberFieldContext",
      providerName: "NumberFieldRoot",
    });
  }

  return context;
}

/**
 * {@link NumberFieldContext} です。
 */
export type Context = NumberFieldContext;

/**
 * {@link NumberFieldContext} です。
 */
export const Context: React.Context<NumberFieldContext | null> = NumberFieldContext;

/**
 * {@link useNumberFieldContext} です。
 */
export function useContext(optional?: false): NumberFieldContext;
export function useContext(optional?: boolean): NumberFieldContext | null;
export function useContext(optional?: boolean): NumberFieldContext | null {
  return useNumberFieldContext(optional);
}

// Root
// ----

/**
 * {@link NumberFieldRoot} の状態です。
 */
export type NumberFieldRootState = NumberField.Root.State;

/**
 * {@link NumberFieldRoot} に渡すプロパティーです。
 */
export type NumberFieldRootProps = React.ComponentProps<typeof NumberField.Root> & {
  /**
   * フォーカス時に枠線へ適用する色を指定します。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * 数値入力欄の角丸を指定します。
   *
   * デフォルト値は {@link NumberFieldRootProps.size|size} です。
   *
   * - `"none"`: 角を直角にする
   * - `"sm"`: 小さい角丸
   * - `"md"`: 標準的な角丸
   * - `"lg"`: 大きい角丸
   * - `"full"`: 完全な丸形
   */
  radius?: "none" | Size | "full" | undefined;

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
   * @default "liquid"
   */
  variant?: "naked" | "liquid" | undefined;
};

/**
 * 数値入力欄のルートコンポーネントです。
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
  const actionGroupCtx = useActionGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = sizeProp,
    variant: variantProp = "liquid",
    outlined: outlinedProp = false,
    className,
    ...otherProps
  } = props;
  const size = actionGroupCtx?.size ?? sizeProp;
  const color = actionGroupCtx?.color ?? colorProp;
  const radius = actionGroupCtx?.radius ?? radiusProp;
  const variant =
    (actionGroupCtx?.variant === "solid" ? null : actionGroupCtx?.variant) ?? variantProp;
  const outlined = actionGroupCtx?.outlined ?? outlinedProp;
  const context = React.useMemo<NumberFieldContext>(
    () => ({ size, color, radius, variant, outlined }),
    [size, color, radius, variant, outlined],
  );

  return (
    <Context value={context}>
      <NumberField.Root
        {...otherProps}
        className={cn(
          className,
          "sui_number_field",
          "sui_action_group_item",
          `sui_number_field-size_${size}`,
          `sui_number_field-color_${color}`,
          `sui_number_field-radius_${radius}`,
          `sui_number_field-variant_${variant}`,
          outlined && "sui_number_field-outlined",
          (state) => state.disabled && "sui_number_field-disabled",
        )}
      />
    </Context>
  );
};

/**
 * {@link NumberFieldRoot} の状態やプロパティーをまとめた型名前空間です。
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
 * {@link NumberFieldRoot} です。
 */
export const Root: Component<Root.Props> = NumberFieldRoot;

// ScrubArea
// ---------

/**
 * {@link NumberFieldScrubArea} の状態です。
 */
export type NumberFieldScrubAreaState = NumberField.ScrubArea.State;

/**
 * {@link NumberFieldScrubArea} に渡すプロパティーです。
 */
export type NumberFieldScrubAreaProps = React.ComponentProps<typeof NumberField.ScrubArea>;

/**
 * ドラッグで値を変更できる領域を提供するコンポーネントです。
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
 * {@link NumberFieldScrubArea} の状態やプロパティーをまとめた型名前空間です。
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
 * {@link NumberFieldScrubArea} です。
 */
export const ScrubArea: Component<ScrubArea.Props> = NumberFieldScrubArea;

// ScrubAreaCursor
// ---------------

/**
 * {@link NumberFieldScrubAreaCursor} の状態です。
 */
export type NumberFieldScrubAreaCursorState = NumberField.ScrubAreaCursor.State;

/**
 * {@link NumberFieldScrubAreaCursor} に渡すプロパティーです。
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
 * {@link NumberFieldScrubAreaCursor} の状態やプロパティーをまとめた型名前空間です。
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
 * {@link NumberFieldScrubAreaCursor} です。
 */
export const ScrubAreaCursor: Component<ScrubAreaCursor.Props> = NumberFieldScrubAreaCursor;

// Group
// -----

/**
 * {@link NumberFieldGroup} の状態です。
 */
export type NumberFieldGroupState = NumberField.Group.State;

/**
 * {@link NumberFieldGroup} に渡すプロパティーです。
 */
export type NumberFieldGroupProps = React.ComponentProps<typeof NumberField.Group>;

const DISABLE_FOCUS_ON_CLICK_DATA = "data-suinumberfielddisablefocusonclick";

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
  const { onClick, className, ...otherProps } = props;
  const focusInput: NonNullable<NumberFieldGroupProps["onClick"]> = (evt) => {
    onClick?.(evt);

    if (evt.defaultPrevented || !(evt.target instanceof Element)) {
      return;
    }

    if (
      evt.target.closest(".sui_number_field_input") !== null ||
      evt.target.closest(`[${DISABLE_FOCUS_ON_CLICK_DATA}="true"]`) !== null
    ) {
      return;
    }

    const input = evt.currentTarget.querySelector<HTMLInputElement>(".sui_number_field_input");
    if (input !== null && !input.disabled) {
      input.focus();
    }
  };
  const handleClick: NonNullable<NumberFieldGroupProps["onClick"]> = (evt) => {
    onClick?.(evt);
    focusInput(evt);
  };

  return (
    <NumberField.Group
      {...otherProps}
      onClick={handleClick}
      className={cn(className, "sui_number_field_group")}
    />
  );
};

/**
 * {@link NumberFieldGroup} の状態やプロパティーをまとめた型名前空間です。
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
 * {@link NumberFieldGroup} です。
 */
export const Group: Component<Group.Props> = NumberFieldGroup;

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

  return (
    <NumberField.Input
      {...otherProps}
      className={cn(
        className,
        "sui_number_field_input",
        (state) => state.valid === true && "sui_number_field_input-valid",
        (state) => state.valid === false && "sui_number_field_input-invalid",
        (state) => state.valid === null && "sui_number_field_input-unverified",
      )}
    />
  );
};

/**
 * {@link NumberFieldInput} の状態やプロパティーをまとめた型名前空間です。
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
 * {@link NumberFieldInput} です。
 */
export const Input: Component<Input.Props> = NumberFieldInput;

// Addon
// -----

/**
 * {@link NumberFieldAddon} の状態です。
 */
export type NumberFieldAddonState = {};

/**
 * {@link NumberFieldAddon} に渡すプロパティーです。
 */
export type NumberFieldAddonProps = Omit<
  React.ComponentProps<"span">,
  keyof RenderProps<NumberFieldAddonState>
> &
  RenderProps<NumberFieldAddonState> & {
    /**
     * クリック時の入力欄への自動フォーカスを無効にするかどうかを指定します。
     *
     * @default false
     */
    disableFocusOnClick?: boolean | undefined;
  };

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const NumberFieldAddon: Component<NumberFieldAddonProps> = function SuiNumberFieldAddon(
  props,
) {
  const { disableFocusOnClick = false, ...otherProps } = props;

  return useRender({
    defaultTagName: "span",
    props: [
      otherProps,
      {
        className: "sui_number_field_addon",
        [DISABLE_FOCUS_ON_CLICK_DATA]: disableFocusOnClick ? "true" : undefined,
      },
    ],
  });
};

/**
 * {@link NumberFieldAddon} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Addon {
  /**
   * {@link NumberFieldAddon} の状態型です。
   */
  export type State = NumberFieldAddonState;

  /**
   * {@link NumberFieldAddon} のプロパティー型です。
   */
  export type Props = NumberFieldAddonProps;
}

/**
 * {@link NumberFieldAddon} の別名です。
 */
export const Addon: Component<Addon.Props> = NumberFieldAddon;

// Decrement
// ---------

/**
 * {@link NumberFieldDecrement} の状態です。
 */
export type NumberFieldDecrementState = NumberField.Decrement.State;

/**
 * {@link NumberFieldDecrement} に渡すプロパティーです。
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
        className={cn(className, "sui_number_field_stepper", "sui_number_field_decrement")}
      />
    );
  };

/**
 * {@link NumberFieldDecrement} の状態やプロパティーをまとめた型名前空間です。
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
 * {@link NumberFieldDecrement} です。
 */
export const Decrement: Component<Decrement.Props> = NumberFieldDecrement;

// Increment
// ---------

/**
 * {@link NumberFieldIncrement} の状態です。
 */
export type NumberFieldIncrementState = NumberField.Increment.State;

/**
 * {@link NumberFieldIncrement} に渡すプロパティーです。
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
        className={cn(className, "sui_number_field_stepper", "sui_number_field_increment")}
      />
    );
  };

/**
 * {@link NumberFieldIncrement} の状態やプロパティーをまとめた型名前空間です。
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
 * {@link NumberFieldIncrement} です。
 */
export const Increment: Component<Increment.Props> = NumberFieldIncrement;
