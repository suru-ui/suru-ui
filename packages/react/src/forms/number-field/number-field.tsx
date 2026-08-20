import * as React from "react";

import isLikelyVisibleNode from "../../_is-likely-visible-node.js";
import type { IComponent, IUseContext } from "../../types.js";
import {
  type NumberFieldContext,
  type NumberFieldRootSize,
  type NumberFieldRootColor,
  type NumberFieldRootProps,
  type NumberFieldRootState,
  type NumberFieldAddonProps,
  type NumberFieldGroupProps,
  type NumberFieldInputProps,
  type NumberFieldRootRadius,
  type NumberFieldRootVariant,
  type NumberFieldDecrementProps,
  type NumberFieldIncrementProps,
  type NumberFieldScrubAreaProps,
  type NumberFieldScrubAreaCursorProps,
  type NumberFieldRootChangeEventReason,
  type NumberFieldRootChangeEventDetails,
  NumberFieldRoot,
  NumberFieldAddon,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldScrubArea,
  useNumberFieldContext,
  NumberFieldScrubAreaCursor,
} from "./number-field.parts.jsx";

/**
 * {@link NumberFieldRootColor} です。
 */
export type NumberFieldColor = NumberFieldRootColor;

/**
 * {@link NumberFieldRootRadius} です。
 */
export type NumberFieldRadius = NumberFieldRootRadius;

/**
 * {@link NumberFieldRootSize} です。
 */
export type NumberFieldSize = NumberFieldRootSize;

/**
 * {@link NumberFieldRootVariant} です。
 */
export type NumberFieldVariant = NumberFieldRootVariant;

/**
 * {@link NumberFieldRootChangeEventReason} です。
 */
export type NumberFieldChangeEventReason = NumberFieldRootChangeEventReason;

/**
 * {@link NumberFieldRootChangeEventDetails} です。
 */
export type NumberFieldChangeEventDetails = NumberFieldRootChangeEventDetails;

/**
 * {@link NumberField} の各パーツに渡すプロパティーです。
 */
export type NumberFieldSlotProps = {
  /**
   * {@link NumberFieldAddon} に渡すプロパティーです。
   */
  readonly addon?: Omit<NumberFieldAddonProps, "children"> | undefined;

  /**
   * {@link NumberFieldDecrement} に渡すプロパティーです。
   */
  readonly decrement?: NumberFieldDecrementProps | undefined;

  /**
   * {@link NumberFieldGroup} に渡すプロパティーです。
   */
  readonly group?: NumberFieldGroupProps | undefined;

  /**
   * {@link NumberFieldIncrement} に渡すプロパティーです。
   */
  readonly increment?: NumberFieldIncrementProps | undefined;

  /**
   * {@link NumberFieldInput} に渡すプロパティーです。
   */
  readonly input?: NumberFieldInputProps | undefined;

  /**
   * {@link NumberFieldScrubArea} に渡すプロパティーです。
   */
  readonly scrubArea?: NumberFieldScrubAreaProps | undefined;

  /**
   * {@link NumberFieldScrubAreaCursor} に渡すプロパティーです。
   */
  readonly scrubAreaCursor?: NumberFieldScrubAreaCursorProps | undefined;
};

/**
 * {@link NumberField} の状態です。
 */
export type NumberFieldState = NumberFieldRootState;

/**
 * {@link NumberField} コンポーネントのプロパティーです。
 */
export type NumberFieldProps = Omit<NumberFieldRootProps, "children"> &
  Pick<NumberFieldInputProps, "placeholder"> & {
    /**
     * 値を減らずボタンを表示します。
     *
     * `true` の場合、デフォルトのマイナスアイコンを使って表示されます。
     */
    decrement?: NumberFieldDecrementProps["children"];

    /**
     * 入力欄の末尾に表示する内容です。
     */
    endAddons?: readonly React.ReactNode[] | undefined;

    /**
     * 値を増やすボタンを表示します。
     *
     * `true` の場合、デフォルトのプラスアイコンを使って表示されます。
     */
    increment?: NumberFieldIncrementProps["children"];

    /**
     * ドラッグで値を変更できる領域です。
     */
    scrubArea?: NumberFieldScrubAreaProps["children"];

    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: NumberFieldSlotProps | undefined;

    /**
     * 入力欄の先頭に表示する内容です。
     */
    startAddons?: readonly React.ReactNode[] | undefined;
  };

interface NumberFieldType extends IComponent<NumberFieldProps> {
  /**
   * {@link useNumberFieldContext} です。
   */
  readonly useContext: IUseContext<NumberFieldContext>;
}

/**
 * 数値入力欄を表示するコンポーネントです。
 */
export const NumberField: NumberFieldType = /*#__PURE__*/ Object.assign(
  function SuiNumberField(props: NumberFieldProps) {
    const {
      decrement,
      endAddons = [],
      increment,
      scrubArea,
      slotProps: {
        addon: addonProps,
        group: groupProps,
        input: inputProps,
        decrement: decrementProps,
        increment: incrementProps,
        scrubArea: scrubAreaProps,
        scrubAreaCursor: scrubAreaCursorProps,
      } = {},
      placeholder,
      startAddons = [],
      ...rootProps
    } = props;

    return (
      <NumberFieldRoot {...rootProps}>
        {("scrubArea" in props || !!scrubAreaProps) && (
          <NumberFieldScrubArea {...scrubAreaProps}>
            {scrubAreaProps?.children ?? (
              <>
                {scrubArea}
                <NumberFieldScrubAreaCursor {...scrubAreaCursorProps}>
                  <SuiCursorGrowIcon />
                </NumberFieldScrubAreaCursor>
              </>
            )}
          </NumberFieldScrubArea>
        )}
        <NumberFieldGroup {...groupProps}>
          {React.Children.map(startAddons, (addon) => (
            <NumberFieldAddon {...addonProps}>{addon}</NumberFieldAddon>
          ))}
          <NumberFieldInput placeholder={placeholder} {...inputProps} />
          {React.Children.map(endAddons, (addon) => (
            <NumberFieldAddon {...addonProps}>{addon}</NumberFieldAddon>
          ))}
          {(("decrement" in props && (decrement === true || isLikelyVisibleNode(decrement))) ||
            !!decrementProps) && (
            <NumberFieldAddon disableFocusOnClick {...addonProps}>
              <NumberFieldDecrement>
                {decrementProps?.children ?? (decrement === true ? <SuiMinusIcon /> : decrement)}
              </NumberFieldDecrement>
            </NumberFieldAddon>
          )}
          {(("increment" in props && (increment === true || isLikelyVisibleNode(increment))) ||
            !!incrementProps) && (
            <NumberFieldAddon disableFocusOnClick {...addonProps}>
              <NumberFieldIncrement>
                {incrementProps?.children ?? (increment === true ? <SuiPlusIcon /> : increment)}
              </NumberFieldIncrement>
            </NumberFieldAddon>
          )}
        </NumberFieldGroup>
      </NumberFieldRoot>
    );
  },
  {
    useContext: useNumberFieldContext,
  },
);

/**
 * {@link NumberField} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace NumberField {
  /**
   * {@link NumberFieldState} です。
   */
  export type State = NumberFieldState;

  /**
   * {@link NumberFieldProps} です。
   */
  export type Props = NumberFieldProps;

  /**
   * {@link NumberFieldSlotProps} です。
   */
  export type SlotProps = NumberFieldSlotProps;

  /**
   * {@link NumberFieldContext} です。
   */
  export type Context = NumberFieldContext;

  /**
   * {@link NumberFieldColor} です。
   */
  export type Color = NumberFieldColor;

  /**
   * {@link NumberFieldRadius} です。
   */
  export type Radius = NumberFieldRadius;

  /**
   * {@link NumberFieldSize} です。
   */
  export type Size = NumberFieldSize;

  /**
   * {@link NumberFieldVariant} です。
   */
  export type Variant = NumberFieldVariant;

  /**
   * {@link NumberFieldChangeEventReason} です。
   */
  export type ChangeEventReason = NumberFieldChangeEventReason;

  /**
   * {@link NumberFieldChangeEventDetails} です。
   */
  export type ChangeEventDetails = NumberFieldChangeEventDetails;
}

function SuiCursorGrowIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <polyline points="8 8 4 12 8 16" />
      <polyline points="16 8 20 12 16 16" />
    </svg>
  );
}

function SuiMinusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 8h10" />
    </svg>
  );
}

function SuiPlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      viewBox="0 0 16 16"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}
