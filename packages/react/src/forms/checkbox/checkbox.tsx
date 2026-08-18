import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type CheckboxRootProps,
  type CheckboxRootState,
  type CheckboxIndicatorProps,
  CheckboxRoot,
  CheckboxIndicator,
} from "./checkbox.parts.jsx";

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
 * {@link Checkbox} の状態です。
 */
export type CheckboxState = CheckboxRootState;

/**
 * {@link Checkbox} コンポーネントのプロパティーです。
 *
 * スタイルに関するプロパティーは、{@link CheckboxGroup} 内ではグループの指定が優先されます。
 * 指定後に値を変更すると、チェックボックスのスタイルも更新されます。
 */
export type CheckboxProps = CheckboxRootProps & {
  /**
   * Indicator 内に表示するコンテンツ（チェックアイコンなど）です。
   *
   * 未指定の場合、子要素の `Indicator` は生成されません。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * `indicator` を指定した場合、子要素がなくても {@link CheckboxIndicator} を生成します。
   */
  slotProps?: CheckboxSlotProps | undefined;
};

/**
 * チェックボックスを表示するコンポーネントです。
 */
export const Checkbox: IComponent<CheckboxProps> = function SuiCheckbox(props) {
  const { children, slotProps: { indicator: indicatorProps } = {}, ...rootProps } = props;

  return (
    <CheckboxRoot {...rootProps}>
      {children !== undefined || indicatorProps !== undefined ? (
        <CheckboxIndicator {...{ children, ...indicatorProps }} />
      ) : null}
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
}
