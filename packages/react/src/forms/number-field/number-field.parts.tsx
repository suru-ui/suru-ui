import { NumberField } from "@base-ui/react/number-field";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import { useActionGroupContext } from "../../layout/action-group/action-group.parts.jsx";
import type { IComponent, IUseContext } from "../../types.js";

import "./number-field.css";

// Context
// -------

/**
 * {@link NumberFieldRoot} が子パーツへ提供するスタイルです。
 */
export type NumberFieldContext = {
  /**
   * 数値入力欄の色です。
   */
  readonly color: NumberFieldRootColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 数値入力欄の角丸です。
   */
  readonly radius: NumberFieldRootRadius;

  /**
   * 数値入力欄のサイズです。
   */
  readonly size: NumberFieldRootSize;

  /**
   * 数値入力欄の主な外観です。
   */
  readonly variant: NumberFieldRootVariant;
};

/**
 * NumberField のスタイルを子パーツへ伝播するコンテキストです。
 */
export const NumberFieldContext: React.Context<NumberFieldContext | null> =
  React.createContext<NumberFieldContext | null>(null);

function useSuiNumberFieldContext(optional?: false): NumberFieldContext;
function useSuiNumberFieldContext(optional?: boolean): NumberFieldContext | null;
function useSuiNumberFieldContext(optional?: boolean): NumberFieldContext | null {
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
 * {@link NumberFieldContext} を読み取るフックです。
 */
export const useNumberFieldContext: IUseContext<NumberFieldContext> = useSuiNumberFieldContext;

/**
 * {@link useNumberFieldContext} です。
 */
export const useContext: IUseContext<Context> = useNumberFieldContext;

// Root
// ----

/**
 * 数値入力欄の色です。
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
   * {@link NumberFieldRootState} です。
   */
  export type State = NumberFieldRootState;

  /**
   * {@link NumberFieldRootProps} です。
   */
  export type Props = NumberFieldRootProps;

  /**
   * {@link NumberFieldRootColor} です。
   */
  export type Color = NumberFieldRootColor;

  /**
   * {@link NumberFieldRootRadius} です。
   */
  export type Radius = NumberFieldRootRadius;

  /**
   * {@link NumberFieldRootSize} です。
   */
  export type Size = NumberFieldRootSize;

  /**
   * {@link NumberFieldRootVariant} です。
   */
  export type Variant = NumberFieldRootVariant;

  /**
   * {@link NumberFieldRootChangeEventReason} です。
   */
  export type ChangeEventReason = NumberFieldRootChangeEventReason;

  /**
   * {@link NumberFieldRootChangeEventDetails} です。
   */
  export type ChangeEventDetails = NumberFieldRootChangeEventDetails;
}

/**
 * {@link NumberFieldRoot} です。
 */
export const Root: IComponent<Root.Props> = NumberFieldRoot;

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

/**
 * {@link NumberFieldScrubArea} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ScrubArea {
  /**
   * {@link NumberFieldScrubAreaState} です。
   */
  export type State = NumberFieldScrubAreaState;

  /**
   * {@link NumberFieldScrubAreaProps} です。
   */
  export type Props = NumberFieldScrubAreaProps;
}

/**
 * {@link NumberFieldScrubArea} です。
 */
export const ScrubArea: IComponent<ScrubArea.Props> = NumberFieldScrubArea;

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

/**
 * {@link NumberFieldScrubAreaCursor} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ScrubAreaCursor {
  /**
   * {@link NumberFieldScrubAreaCursorState} です。
   */
  export type State = NumberFieldScrubAreaCursorState;

  /**
   * {@link NumberFieldScrubAreaCursorProps} です。
   */
  export type Props = NumberFieldScrubAreaCursorProps;
}

/**
 * {@link NumberFieldScrubAreaCursor} です。
 */
export const ScrubAreaCursor: IComponent<ScrubAreaCursor.Props> = NumberFieldScrubAreaCursor;

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
  // ユーザーの `onClick` はここでは呼び出さず、`handleClick` 側で 1 回だけ呼び出します。
  const focusInput: NonNullable<NumberFieldGroupProps["onClick"]> = (evt) => {
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
   * {@link NumberFieldGroupState} です。
   */
  export type State = NumberFieldGroupState;

  /**
   * {@link NumberFieldGroupProps} です。
   */
  export type Props = NumberFieldGroupProps;
}

/**
 * {@link NumberFieldGroup} です。
 */
export const Group: IComponent<Group.Props> = NumberFieldGroup;

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

/**
 * {@link NumberFieldInput} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Input {
  /**
   * {@link NumberFieldInputState} です。
   */
  export type State = NumberFieldInputState;

  /**
   * {@link NumberFieldInputProps} です。
   */
  export type Props = NumberFieldInputProps;
}

/**
 * {@link NumberFieldInput} です。
 */
export const Input: IComponent<Input.Props> = NumberFieldInput;

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
   * {@link NumberFieldAddonState} です。
   */
  export type State = NumberFieldAddonState;

  /**
   * {@link NumberFieldAddonProps} です。
   */
  export type Props = NumberFieldAddonProps;
}

/**
 * {@link NumberFieldAddon} です。
 */
export const Addon: IComponent<Addon.Props> = NumberFieldAddon;

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
   * {@link NumberFieldDecrementState} です。
   */
  export type State = NumberFieldDecrementState;

  /**
   * {@link NumberFieldDecrementProps} です。
   */
  export type Props = NumberFieldDecrementProps;
}

/**
 * {@link NumberFieldDecrement} です。
 */
export const Decrement: IComponent<Decrement.Props> = NumberFieldDecrement;

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
   * {@link NumberFieldIncrementState} です。
   */
  export type State = NumberFieldIncrementState;

  /**
   * {@link NumberFieldIncrementProps} です。
   */
  export type Props = NumberFieldIncrementProps;
}

/**
 * {@link NumberFieldIncrement} です。
 */
export const Increment: IComponent<Increment.Props> = NumberFieldIncrement;
