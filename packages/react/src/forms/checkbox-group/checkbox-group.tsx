import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type CheckboxGroupRootProps,
  type CheckboxGroupRootState,
  CheckboxGroupRoot,
} from "./checkbox-group.parts.jsx";

/**
 * {@link CheckboxGroup} の状態です。
 */
export type CheckboxGroupState = CheckboxGroupRootState;

/**
 * {@link CheckboxGroup} コンポーネントのプロパティーです。
 */
export type CheckboxGroupProps = CheckboxGroupRootProps & {
  /**
   * チェックボックス要素です。
   *
   * {@link CheckboxGroupRoot} にそのまま渡されます。
   */
  readonly children?: React.ReactNode | undefined;
};

/**
 * チェックボックスをグループ化するコンポーネントです。
 *
 * グループの選択状態を管理し、子要素のチェックボックスにスタイルを強制します。
 * スタイルの指定は子要素の指定より優先され、値を変更するとグループ内へ反映されます。
 */
export const CheckboxGroup: IComponent<CheckboxGroupProps> = function SuiCheckboxGroup(props) {
  return <CheckboxGroupRoot {...props} />;
};

/**
 * {@link CheckboxGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace CheckboxGroup {
  /**
   * {@link CheckboxGroupState} です。
   */
  export type State = CheckboxGroupState;

  /**
   * {@link CheckboxGroupProps} です。
   */
  export type Props = CheckboxGroupProps;
}
