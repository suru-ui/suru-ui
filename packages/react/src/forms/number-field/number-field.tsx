import * as React from "react";

import type { Component } from "../../types.js";
import * as NumberFieldParts from "./number-field.parts.jsx";

/**
 * {@link NumberField} コンポーネントのプロパティーです。
 */
export type NumberFieldProps = NumberFieldParts.Root.Props & {
  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?:
    | {
        readonly scrubArea?: NumberFieldParts.ScrubArea.Props | undefined;

        readonly scrubAreaCursor?: NumberFieldParts.ScrubAreaCursor.Props | undefined;

        readonly group?: NumberFieldParts.Group.Props | undefined;

        readonly decrement?: NumberFieldParts.Decrement.Props | undefined;

        readonly input?: NumberFieldParts.Input.Props | undefined;

        readonly increment?: NumberFieldParts.Increment.Props | undefined;
      }
    | undefined;
};

/**
 * 数値入力欄を表示するコンポーネントです。
 *
 * Increment と Decrement に挿入するアイコンは、`slotProps` の
 * `increment.children` と `decrement.children` で差し替えられます。
 * ScrubArea は `slotProps.scrubArea` を渡したときだけ表示します。
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
    slotProps: {
      scrubArea: scrubAreaProps,
      scrubAreaCursor: scrubAreaCursorProps,
      group: groupProps,
      decrement: decrementProps,
      input: inputProps,
      increment: incrementProps,
    } = {},
    ...rootProps
  } = props;
  const { children: decrementChildren = <SuiMinusIcon />, ...restDecrementProps } =
    decrementProps ?? {};
  const { children: incrementChildren = <SuiPlusIcon />, ...restIncrementProps } =
    incrementProps ?? {};

  return (
    <NumberFieldParts.Root {...rootProps}>
      {scrubAreaProps ? (
        <NumberFieldParts.ScrubArea {...scrubAreaProps}>
          {scrubAreaProps.children}
          {scrubAreaCursorProps ? (
            <NumberFieldParts.ScrubAreaCursor {...scrubAreaCursorProps} />
          ) : null}
        </NumberFieldParts.ScrubArea>
      ) : null}
      <NumberFieldParts.Group {...groupProps}>
        <NumberFieldParts.Input {...inputProps} />
        <NumberFieldParts.Decrement {...restDecrementProps}>
          {decrementChildren}
        </NumberFieldParts.Decrement>
        <NumberFieldParts.Increment {...restIncrementProps}>
          {incrementChildren}
        </NumberFieldParts.Increment>
      </NumberFieldParts.Group>
    </NumberFieldParts.Root>
  );
};

// Increment と Decrement の既定アイコンです。

function SuiPlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" {...props}>
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function SuiMinusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" {...props}>
      <path d="M3 8h10" />
    </svg>
  );
}
