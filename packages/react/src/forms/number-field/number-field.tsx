import * as React from "react";

import isLikelyVisibleNode from "../../_is-likely-visible-node.js";
import type { Component } from "../../types.js";
import * as NumberFieldParts from "./number-field.parts.jsx";

/**
 * {@link NumberField} の各パーツに渡すプロパティーです。
 */
export type NumberFieldSlotProps = {
  /**
   * {@link NumberFieldParts.Addon|Addon} に渡すプロパティーです。
   */
  readonly addon?: Omit<NumberFieldParts.Addon.Props, "children"> | undefined;

  /**
   * {@link NumberFieldParts.Decrement|Decrement} に渡すプロパティーです。
   */
  readonly decrement?: NumberFieldParts.Decrement.Props | undefined;

  /**
   * {@link NumberFieldParts.Group|Group} に渡すプロパティーです。
   */
  readonly group?: NumberFieldParts.Group.Props | undefined;

  /**
   * {@link NumberFieldParts.Increment|Increment} に渡すプロパティーです。
   */
  readonly increment?: NumberFieldParts.Increment.Props | undefined;

  /**
   * {@link NumberFieldParts.Input|Input} に渡すプロパティーです。
   */
  readonly input?: NumberFieldParts.Input.Props | undefined;

  /**
   * {@link NumberFieldParts.ScrubArea|ScrubArea} に渡すプロパティーです。
   */
  readonly scrubArea?: NumberFieldParts.ScrubArea.Props | undefined;

  /**
   * {@link NumberFieldParts.ScrubAreaCursor|ScrubAreaCursor} に渡すプロパティーです。
   */
  readonly scrubAreaCursor?: NumberFieldParts.ScrubAreaCursor.Props | undefined;
};

/**
 * {@link NumberField} コンポーネントのプロパティーです。
 */
export type NumberFieldProps = NumberFieldParts.Root.Props &
  Pick<NumberFieldParts.Input.Props, "placeholder"> & {
    decrement?: NumberFieldParts.Decrement.Props["children"];

    endAddons?: readonly React.ReactNode[] | undefined;

    increment?: NumberFieldParts.Decrement.Props["children"];

    /**
     * ドラッグで値を変更できる領域です。
     */
    scrubArea?: NumberFieldParts.ScrubArea.Props["children"];

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
 *
 * @example 基本
 * ```tsx
 * <NumberField defaultValue={100} />
 * ```
 *
 * @example 範囲と刻みの指定
 * ```tsx
 * <NumberField min={0} max={100} step={5} defaultValue={25} />
 * ```
 *
 * @example アイコンの差し替え
 * ```tsx
 * <NumberField
 *   slotProps={{
 *     increment: { children: <PlusIcon /> },
 *     decrement: { children: <MinusIcon /> },
 *   }}
 * />
 * ```
 */
export const NumberField: Component<NumberFieldProps> = function SuiNumberField(props) {
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
    <NumberFieldParts.Root {...rootProps}>
      {("scrubArea" in props || !!scrubAreaProps) && (
        <NumberFieldParts.ScrubArea
          {...{
            children: (
              <>
                {scrubArea}
                <NumberFieldParts.ScrubAreaCursor
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
      <NumberFieldParts.Group {...groupProps}>
        {startAddons.map((addon, i) => (
          <NumberFieldParts.Addon
            {...addonProps}
            key={React.isValidElement(addon) ? (addon.key ?? i) : i}
          >
            {addon}
          </NumberFieldParts.Addon>
        ))}
        <NumberFieldParts.Input placeholder={placeholder} {...inputProps} />
        {endAddons.map((addon, i) => (
          <NumberFieldParts.Addon
            {...addonProps}
            key={React.isValidElement(addon) ? (addon.key ?? i) : i}
          >
            {addon}
          </NumberFieldParts.Addon>
        ))}
        {(("decrement" in props && (decrement === true || isLikelyVisibleNode(decrement))) ||
          !!decrementProps) && (
          <NumberFieldParts.Addon disableFocusOnClick {...addonProps}>
            <NumberFieldParts.Decrement
              {...{
                children: decrement === true ? <SuiMinusIcon /> : decrement,
                ...decrementProps,
              }}
            />
          </NumberFieldParts.Addon>
        )}
        {(("increment" in props && (increment === true || isLikelyVisibleNode(increment))) ||
          !!incrementProps) && (
          <NumberFieldParts.Addon disableFocusOnClick {...addonProps}>
            <NumberFieldParts.Increment
              {...{
                children: increment === true ? <SuiPlusIcon /> : increment,
                ...incrementProps,
              }}
            />
          </NumberFieldParts.Addon>
        )}
      </NumberFieldParts.Group>
    </NumberFieldParts.Root>
  );
};

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
