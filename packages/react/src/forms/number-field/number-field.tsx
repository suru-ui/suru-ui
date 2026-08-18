import * as React from "react";

import isLikelyVisibleNode from "../../_is-likely-visible-node.js";
import type { IComponent } from "../../types.js";
import {
  type NumberFieldRootProps,
  type NumberFieldRootState,
  type NumberFieldAddonProps,
  type NumberFieldGroupProps,
  type NumberFieldInputProps,
  type NumberFieldDecrementProps,
  type NumberFieldIncrementProps,
  type NumberFieldScrubAreaProps,
  type NumberFieldScrubAreaCursorProps,
  NumberFieldRoot,
  NumberFieldAddon,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "./number-field.parts.jsx";

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
export type NumberFieldProps = NumberFieldRootProps &
  Pick<NumberFieldInputProps, "placeholder"> & {
    decrement?: NumberFieldDecrementProps["children"];

    endAddons?: readonly React.ReactNode[] | undefined;

    increment?: NumberFieldDecrementProps["children"];

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

    startAddons?: readonly React.ReactNode[] | undefined;
  };

/**
 * 数値入力欄を表示するコンポーネントです。
 */
export const NumberField: IComponent<NumberFieldProps> = function SuiNumberField(props) {
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
        <NumberFieldScrubArea
          {...{
            children: (
              <>
                {scrubArea}
                <NumberFieldScrubAreaCursor
                  {...{
                    children: <SuiCursorGrowIcon />,
                    ...scrubAreaCursorProps,
                  }}
                />
              </>
            ),
            ...scrubAreaProps,
          }}
        />
      )}
      <NumberFieldGroup {...groupProps}>
        {startAddons.map((addon, i) => (
          <NumberFieldAddon
            {...addonProps}
            key={React.isValidElement(addon) ? (addon.key ?? i) : i}
          >
            {addon}
          </NumberFieldAddon>
        ))}
        <NumberFieldInput placeholder={placeholder} {...inputProps} />
        {endAddons.map((addon, i) => (
          <NumberFieldAddon
            {...addonProps}
            key={React.isValidElement(addon) ? (addon.key ?? i) : i}
          >
            {addon}
          </NumberFieldAddon>
        ))}
        {(("decrement" in props && (decrement === true || isLikelyVisibleNode(decrement))) ||
          !!decrementProps) && (
          <NumberFieldAddon disableFocusOnClick {...addonProps}>
            <NumberFieldDecrement
              {...{
                children: decrement === true ? <SuiMinusIcon /> : decrement,
                ...decrementProps,
              }}
            />
          </NumberFieldAddon>
        )}
        {(("increment" in props && (increment === true || isLikelyVisibleNode(increment))) ||
          !!incrementProps) && (
          <NumberFieldAddon disableFocusOnClick {...addonProps}>
            <NumberFieldIncrement
              {...{
                children: increment === true ? <SuiPlusIcon /> : increment,
                ...incrementProps,
              }}
            />
          </NumberFieldAddon>
        )}
      </NumberFieldGroup>
    </NumberFieldRoot>
  );
};

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
      <line x1="4" y1="12" x2="20" y2="12" />
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
