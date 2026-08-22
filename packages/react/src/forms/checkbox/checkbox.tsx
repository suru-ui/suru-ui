import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type CheckboxRootSize,
  type CheckboxRootColor,
  type CheckboxRootProps,
  type CheckboxRootState,
  type CheckboxRootRadius,
  type CheckboxRootVariant,
  type CheckboxIndicatorProps,
  CheckboxRoot,
  CheckboxIndicator,
} from "./checkbox.parts.jsx";

/**
 * {@link CheckboxRootColor} です。
 */
export type CheckboxColor = CheckboxRootColor;

/**
 * {@link CheckboxRootRadius} です。
 */
export type CheckboxRadius = CheckboxRootRadius;

/**
 * {@link CheckboxRootSize} です。
 */
export type CheckboxSize = CheckboxRootSize;

/**
 * {@link CheckboxRootVariant} です。
 */
export type CheckboxVariant = CheckboxRootVariant;

/**
 * {@link Checkbox} の各パーツに渡すプロパティーです。
 */
export type CheckboxSlotProps = {
  /**
   * {@link CheckboxIndicator} に渡すプロパティーです。
   */
  readonly indicator?: CheckboxIndicatorProps | undefined;
};

/**
 * {@link Checkbox} の各パーツに渡すプロパティーです。
 */
export type CheckboxPartsProps = {
  /**
   * {@link CheckboxIndicator} に渡すプロパティーです。
   */
  readonly indicator: CheckboxIndicatorProps;

  /**
   * {@link CheckboxRoot} に渡すプロパティーです。
   */
  readonly root: CheckboxRootProps;
};

/**
 * {@link Checkbox} の状態です。
 */
export type CheckboxState = CheckboxRootState;

/**
 * {@link Checkbox} コンポーネントのプロパティーです。
 *
 * スタイルに関するプロパティーは、{@link CheckboxGroup} 内ではグループの指定が優先されます。
 * 指定後に値を変更すると、チェックボックスのスタイルも更新されます。
 */
export type CheckboxProps = Omit<CheckboxRootProps, "children"> & {
  /**
   * Indicator 内に表示するコンテンツ（チェックアイコンなど）です。
   *
   * 未指定の場合、{@link CheckboxIcon} を表示します。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: CheckboxSlotProps | undefined;
};

/**
 * {@link Checkbox} の各パーツに渡すプロパティーを作るフックです。
 */
export function useCheckbox(props: CheckboxProps): CheckboxPartsProps {
  const {
    children = <SuiCheckboxIcon />,
    slotProps: { indicator: indicatorProps } = {},
    ...rootProps
  } = props;

  return {
    root: rootProps,
    indicator: {
      children,
      ...indicatorProps,
    },
  };
}

/**
 * チェックボックスを表示するコンポーネントです。
 */
export const Checkbox: IComponent<CheckboxProps> = function SuiCheckbox(props) {
  const partsProps = useCheckbox(props);

  return (
    <CheckboxRoot {...partsProps.root}>
      <CheckboxIndicator {...partsProps.indicator} />
    </CheckboxRoot>
  );
};

/**
 * {@link Checkbox} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Checkbox {
  /**
   * {@link CheckboxState} です。
   */
  export type State = CheckboxState;

  /**
   * {@link CheckboxProps} です。
   */
  export type Props = CheckboxProps;

  /**
   * {@link CheckboxSlotProps} です。
   */
  export type SlotProps = CheckboxSlotProps;

  /**
   * {@link CheckboxColor} です。
   */
  export type Color = CheckboxColor;

  /**
   * {@link CheckboxRadius} です。
   */
  export type Radius = CheckboxRadius;

  /**
   * {@link CheckboxSize} です。
   */
  export type Size = CheckboxSize;

  /**
   * {@link CheckboxVariant} です。
   */
  export type Variant = CheckboxVariant;
}

function SuiCheckboxIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      focusable="false"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 8h10" className="sui_checkbox_icon-dash" />
      <path d="m2.5 8.5 4 4 7-9" className="sui_checkbox_icon-check" />
    </svg>
  );
}
