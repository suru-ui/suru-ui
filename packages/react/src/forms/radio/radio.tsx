import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type RadioRootProps,
  type RadioRootState,
  type RadioIndicatorProps,
  RadioRoot,
  RadioIndicator,
} from "./radio.parts.jsx";

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
export type RadioProps = RadioRootProps & {
  /**
   * Indicator 内に表示するコンテンツです。
   *
   * 選択時だけ表示され、未選択時は DOM から除去されます。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * `indicator` の値はインジケーターの既定値に優先して適用されます。
   * `children` を指定した場合は、`indicator.children` より優先されます。
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
      <RadioIndicator {...{ children, ...indicatorProps }} />
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
}
