import { NumberField } from "@base-ui/react/number-field";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { PlusIcon, MinusIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import { useActionGroupContext } from "../action-group/action-group.parts.jsx";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./number-field.css";

// Context
// -------

/**
 * 数値入力欄の配色です。
 */
type NumberFieldContextColor = Color;

/**
 * 数値入力欄の角丸です。
 */
type NumberFieldContextRadius = "none" | Size | "full";

/**
 * 数値入力欄のサイズです。
 */
type NumberFieldContextSize = Size;

/**
 * 数値入力欄の主な外観です。
 */
type NumberFieldContextVariant = "naked" | "liquid";

/**
 * {@link NumberFieldRoot} が子パーツへ提供するスタイルです。
 */
export type NumberFieldContext = {
  /**
   * 数値入力欄の配色です。
   */
  readonly color: NumberFieldContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 数値入力欄の角丸です。
   */
  readonly radius: NumberFieldContextRadius;

  /**
   * 数値入力欄のサイズです。
   */
  readonly size: NumberFieldContextSize;

  /**
   * 数値入力欄の主な外観です。
   */
  readonly variant: NumberFieldContextVariant;
};

/**
 * NumberField のスタイルを子パーツへ伝播するコンテキストです。
 */
export const NumberFieldContext: React.Context<NumberFieldContext | null> =
  React.createContext<NumberFieldContext | null>(null);

function useSuiNumberFieldContext(optional?: false): NumberFieldContext;
function useSuiNumberFieldContext(optional?: boolean): NumberFieldContext | null;
function useSuiNumberFieldContext(optional?: boolean): NumberFieldContext | null {
  const ctx = React.use(NumberFieldContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "NumberFieldContext",
      providerName: "NumberFieldRoot",
    });
  }

  return ctx;
}

/**
 * {@link NumberFieldContext} を読み取るフックです。
 */
export const useNumberFieldContext: IUseContext<NumberFieldContext> = useSuiNumberFieldContext;

export { NumberFieldContext as Context, useNumberFieldContext as useContext };

export namespace Context {
  /**
   * {@link NumberFieldContextColor}
   */
  export type Color = NumberFieldContextColor;

  /**
   * {@link NumberFieldContextRadius}
   */
  export type Radius = NumberFieldContextRadius;

  /**
   * {@link NumberFieldContextSize}
   */
  export type Size = NumberFieldContextSize;

  /**
   * {@link NumberFieldContextVariant}
   */
  export type Variant = NumberFieldContextVariant;
}

// Root
// ----

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
 * {@link NumberFieldRoot} の値が変更された理由です。
 */
export type NumberFieldRootChangeEventReason = NumberField.Root.ChangeEventReason;

/**
 * {@link NumberFieldRoot} の値が変更されたイベントの詳細です。
 */
export type NumberFieldRootChangeEventDetails = NumberField.Root.ChangeEventDetails;

/**
 * {@link NumberFieldRoot} の値が確定された理由です。
 */
export type NumberFieldRootCommitEventReason = NumberField.Root.CommitEventReason;

/**
 * {@link NumberFieldRoot} の値が確定されたイベントの詳細です。
 */
export type NumberFieldRootCommitEventDetails = NumberField.Root.CommitEventDetails;

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
   * 既定値は {@link NumberFieldRootProps.size|size} です。
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

/**
 * 数値入力欄のルートコンポーネントです。
 */
export const NumberFieldRoot: IComponent<NumberFieldRootProps> = function SuiNumberFieldRoot(
  props,
) {
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
          "sui_action_group_item",
          `sui_number_field-size_${size}`,
          `sui_number_field-color_${color}`,
          `sui_number_field-radius_${radius}`,
          `sui_number_field-variant_${variant}`,
          outlined && "sui_number_field-outlined",
          (state) => state.disabled && "sui_number_field-disabled",
        )}
        data-scope=""
      />
    </NumberFieldContext>
  );
};

export { NumberFieldRoot as Root };

export namespace Root {
  /**
   * {@link NumberFieldRootState}
   */
  export type State = NumberFieldRootState;

  /**
   * {@link NumberFieldRootProps}
   */
  export type Props = NumberFieldRootProps;

  /**
   * {@link NumberFieldRootChangeEventDetails}
   */
  export type ChangeEventDetails = NumberFieldRootChangeEventDetails;

  /**
   * {@link NumberFieldRootChangeEventReason}
   */
  export type ChangeEventReason = NumberFieldRootChangeEventReason;

  /**
   * {@link NumberFieldRootColor}
   */
  export type Color = NumberFieldRootColor;

  /**
   * {@link NumberFieldRootCommitEventDetails}
   */
  export type CommitEventDetails = NumberFieldRootCommitEventDetails;

  /**
   * {@link NumberFieldRootCommitEventReason}
   */
  export type CommitEventReason = NumberFieldRootCommitEventReason;

  /**
   * {@link NumberFieldRootRadius}
   */
  export type Radius = NumberFieldRootRadius;

  /**
   * {@link NumberFieldRootSize}
   */
  export type Size = NumberFieldRootSize;

  /**
   * {@link NumberFieldRootVariant}
   */
  export type Variant = NumberFieldRootVariant;
}

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
 */
export const NumberFieldScrubArea: IComponent<NumberFieldScrubAreaProps> =
  function SuiNumberFieldScrubArea(props) {
    const { className, ...otherProps } = props;

    return (
      <NumberField.ScrubArea
        {...otherProps}
        className={cn(className, "sui_number_field_scrub_area")}
      />
    );
  };

export { NumberFieldScrubArea as ScrubArea };

export namespace ScrubArea {
  /**
   * {@link NumberFieldScrubAreaState}
   */
  export type State = NumberFieldScrubAreaState;

  /**
   * {@link NumberFieldScrubAreaProps}
   */
  export type Props = NumberFieldScrubAreaProps;
}

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
 */
export const NumberFieldScrubAreaCursor: IComponent<NumberFieldScrubAreaCursorProps> =
  function SuiNumberFieldScrubAreaCursor(props) {
    const { className, ...otherProps } = props;

    return (
      <NumberField.ScrubAreaCursor
        {...otherProps}
        className={cn(className, "sui_number_field_scrub_area_cursor")}
      />
    );
  };

export { NumberFieldScrubAreaCursor as ScrubAreaCursor };

export namespace ScrubAreaCursor {
  /**
   * {@link NumberFieldScrubAreaCursorState}
   */
  export type State = NumberFieldScrubAreaCursorState;

  /**
   * {@link NumberFieldScrubAreaCursorProps}
   */
  export type Props = NumberFieldScrubAreaCursorProps;
}

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
 */
export const NumberFieldGroup: IComponent<NumberFieldGroupProps> = function SuiNumberFieldGroup(
  props,
) {
  const { onClick, className, ...otherProps } = props;
  const handleClick: NonNullable<NumberFieldGroupProps["onClick"]> = (evt) => {
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

  return (
    <NumberField.Group
      {...otherProps}
      onClick={handleClick}
      className={cn(className, "sui_number_field_group")}
    />
  );
};

export { NumberFieldGroup as Group };

export namespace Group {
  /**
   * {@link NumberFieldGroupState}
   */
  export type State = NumberFieldGroupState;

  /**
   * {@link NumberFieldGroupProps}
   */
  export type Props = NumberFieldGroupProps;
}

// Input
// -----

/**
 * {@link NumberFieldInput} の状態です。
 */
export type NumberFieldInputState = NumberField.Input.State;

/**
 * {@link NumberFieldInput} に渡すプロパティーです。
 */
export type NumberFieldInputProps = React.ComponentProps<typeof NumberField.Input>;

/**
 * 数値の入力欄です。
 */
export const NumberFieldInput: IComponent<NumberFieldInputProps> = function SuiNumberFieldInput(
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

export { NumberFieldInput as Input };

export namespace Input {
  /**
   * {@link NumberFieldInputState}
   */
  export type State = NumberFieldInputState;

  /**
   * {@link NumberFieldInputProps}
   */
  export type Props = NumberFieldInputProps;
}

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
export const NumberFieldAddon: IComponent<NumberFieldAddonProps> = function SuiNumberFieldAddon(
  props,
) {
  const { disableFocusOnClick = false, ...otherSpanProps } = props;

  return useRender({
    defaultTagName: "span",
    props: [
      otherSpanProps,
      {
        className: "sui_number_field_addon",
        [DISABLE_FOCUS_ON_CLICK_DATA]: disableFocusOnClick ? "true" : undefined,
      },
    ],
  });
};

export { NumberFieldAddon as Addon };

export namespace Addon {
  /**
   * {@link NumberFieldAddonState}
   */
  export type State = NumberFieldAddonState;

  /**
   * {@link NumberFieldAddonProps}
   */
  export type Props = NumberFieldAddonProps;
}

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
 */
export const NumberFieldDecrement: IComponent<NumberFieldDecrementProps> =
  function SuiNumberFieldDecrement(props) {
    const { children = <MinusIcon />, className, ...otherProps } = props;

    return (
      <NumberField.Decrement
        {...otherProps}
        className={cn(className, "sui_number_field_stepper", "sui_number_field_decrement")}
      >
        {children}
      </NumberField.Decrement>
    );
  };

export { NumberFieldDecrement as Decrement };

export namespace Decrement {
  /**
   * {@link NumberFieldDecrementState}
   */
  export type State = NumberFieldDecrementState;

  /**
   * {@link NumberFieldDecrementProps}
   */
  export type Props = NumberFieldDecrementProps;
}

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
 */
export const NumberFieldIncrement: IComponent<NumberFieldIncrementProps> =
  function SuiNumberFieldIncrement(props) {
    const { children = <PlusIcon />, className, ...otherProps } = props;

    return (
      <NumberField.Increment
        {...otherProps}
        className={cn(className, "sui_number_field_stepper", "sui_number_field_increment")}
      >
        {children}
      </NumberField.Increment>
    );
  };

export { NumberFieldIncrement as Increment };

export namespace Increment {
  /**
   * {@link NumberFieldIncrementState}
   */
  export type State = NumberFieldIncrementState;

  /**
   * {@link NumberFieldIncrementProps}
   */
  export type Props = NumberFieldIncrementProps;
}
