import type { Component } from "../../types.js";
import * as RadioParts from "./radio.parts.jsx";

/**
 * {@link Radio} コンポーネントのプロパティーです。
 */
export type RadioProps = RadioParts.Root.Props & {
  /**
   * Indicator 内に表示するコンテンツです。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?:
    | {
        readonly indicator?: RadioParts.Indicator.Props | undefined;
      }
    | undefined;
};

/**
 * ラジオボタンを表示するコンポーネントです。
 *
 * @example 基本
 * ```tsx
 * <Radio value="option-a" />
 * ```
 *
 * @example ラベル付き
 * ```tsx
 * <label>
 *   <Radio variant="liquid" color="blue" value="option-a" />
 *   オプション A
 * </label>
 * ```
 */
export const Radio: Component<RadioProps> = function SuiRadio(props) {
  const { children, slotProps: { indicator: indicatorProps } = {}, ...rootProps } = props;

  return (
    <RadioParts.Root {...rootProps}>
      <RadioParts.Indicator {...indicatorProps}>{children}</RadioParts.Indicator>
    </RadioParts.Root>
  );
};
