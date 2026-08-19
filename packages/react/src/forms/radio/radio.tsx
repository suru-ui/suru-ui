import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type RadioRootSize,
  type RadioRootColor,
  type RadioRootProps,
  type RadioRootState,
  type RadioRootRadius,
  type RadioRootVariant,
  type RadioIndicatorProps,
  RadioRoot,
  RadioIndicator,
} from "./radio.parts.jsx";

/**
 * {@link RadioRootColor} です。
 */
export type RadioColor = RadioRootColor;

/**
 * {@link RadioRootRadius} です。
 */
export type RadioRadius = RadioRootRadius;

/**
 * {@link RadioRootSize} です。
 */
export type RadioSize = RadioRootSize;

/**
 * {@link RadioRootVariant} です。
 */
export type RadioVariant = RadioRootVariant;

/**
 * {@link Radio} の状態です。
 */
export type RadioState = RadioRootState;

/**
 * {@link Radio} の各パーツに渡すプロパティーです。
 */
export type RadioSlotProps = {
  /**
   * {@link RadioIndicator} に渡すプロパティーです。
   */
  readonly indicator?: RadioIndicatorProps | undefined;
};

/**
 * {@link Radio} コンポーネントのプロパティーです。
 */
export type RadioProps = Omit<RadioRootProps, "children"> &
  Pick<RadioIndicatorProps, "children"> & {
    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: RadioSlotProps | undefined;
  };

/**
 * ラジオボタンを表示するコンポーネントです。
 */
export const Radio: IComponent<RadioProps> = function SuiRadio(props) {
  const { children, slotProps: { indicator: indicatorProps } = {}, ...rootProps } = props;

  return (
    <RadioRoot {...rootProps}>
      <RadioIndicator children={children} {...indicatorProps} />
    </RadioRoot>
  );
};

/**
 * {@link Radio} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Radio {
  /**
   * {@link RadioState} です。
   */
  export type State = RadioState;

  /**
   * {@link RadioProps} です。
   */
  export type Props = RadioProps;

  /**
   * {@link RadioSlotProps} です。
   */
  export type SlotProps = RadioSlotProps;

  /**
   * {@link RadioColor} です。
   */
  export type Color = RadioColor;

  /**
   * {@link RadioRadius} です。
   */
  export type Radius = RadioRadius;

  /**
   * {@link RadioSize} です。
   */
  export type Size = RadioSize;

  /**
   * {@link RadioVariant} です。
   */
  export type Variant = RadioVariant;
}
