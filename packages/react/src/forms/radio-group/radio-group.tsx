import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type RadioGroupRootProps,
  type RadioGroupRootState,
  RadioGroupRoot,
} from "./radio-group.parts.jsx";

/**
 * {@link RadioGroup} の状態です。
 */
export type RadioGroupState = RadioGroupRootState;

/**
 * {@link RadioGroup} コンポーネントのプロパティーです。
 */
export type RadioGroupProps = RadioGroupRootProps & {
  /**
   * ラジオボタン要素です。
   *
   * {@link RadioGroupRoot} にそのまま渡されます。
   */
  readonly children?: React.ReactNode | undefined;
};

/**
 * ラジオボタンをグループ化するコンポーネントです。
 *
 * グループの選択状態を管理し、子要素のラジオボタンにスタイルを強制します。
 * スタイルの指定は子要素の指定より優先され、値を変更するとグループ内へ反映されます。
 */
export const RadioGroup: IComponent<RadioGroupProps> = function SuiRadioGroup(props) {
  return <RadioGroupRoot {...props} />;
};

/**
 * {@link RadioGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace RadioGroup {
  /**
   * {@link RadioGroupState} です。
   */
  export type State = RadioGroupState;

  /**
   * {@link RadioGroupProps} です。
   */
  export type Props = RadioGroupProps;
}
