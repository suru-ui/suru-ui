import * as React from "react";

import type { IComponent, IUseContext } from "../../types.js";
import {
  type CheckboxGroupContext,
  type CheckboxGroupRootSize,
  type CheckboxGroupRootColor,
  type CheckboxGroupRootProps,
  type CheckboxGroupRootState,
  type CheckboxGroupRootRadius,
  type CheckboxGroupRootVariant,
  type CheckboxGroupRootOrientation,
  CheckboxGroupRoot,
  useCheckboxGroupContext,
} from "./checkbox-group.parts.jsx";

/**
 * {@link CheckboxGroupRootColor} です。
 */
export type CheckboxGroupColor = CheckboxGroupRootColor;

/**
 * {@link CheckboxGroupRootOrientation} です。
 */
export type CheckboxGroupOrientation = CheckboxGroupRootOrientation;

/**
 * {@link CheckboxGroupRootRadius} です。
 */
export type CheckboxGroupRadius = CheckboxGroupRootRadius;

/**
 * {@link CheckboxGroupRootSize} です。
 */
export type CheckboxGroupSize = CheckboxGroupRootSize;

/**
 * {@link CheckboxGroupRootVariant} です。
 */
export type CheckboxGroupVariant = CheckboxGroupRootVariant;

/**
 * {@link CheckboxGroup} の状態です。
 */
export type CheckboxGroupState = CheckboxGroupRootState;

/**
 * {@link CheckboxGroup} コンポーネントのプロパティーです。
 */
export type CheckboxGroupProps = Omit<CheckboxGroupRootProps, "children"> & {
  /**
   * チェックボックス要素です。
   *
   * {@link CheckboxGroupRoot} にそのまま渡されます。
   */
  readonly children?: React.ReactNode | undefined;
};

interface CheckboxGroupType extends IComponent<CheckboxGroupProps> {
  /**
   * {@link useCheckboxGroupContext} です。
   */
  readonly useContext: IUseContext<CheckboxGroupContext>;
}

/**
 * チェックボックスをグループ化するコンポーネントです。
 *
 * グループの選択状態を管理し、子要素のチェックボックスにスタイルを強制します。
 * スタイルの指定は子要素の指定より優先され、値を変更するとグループ内へ反映されます。
 */
export const CheckboxGroup: CheckboxGroupType = /*#__PURE__*/ Object.assign(
  function SuiCheckboxGroup(props: CheckboxGroupProps) {
    return <CheckboxGroupRoot {...props} />;
  },
  {
    useContext: useCheckboxGroupContext,
  },
);

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

  /**
   * {@link CheckboxGroupContext} です。
   */
  export type Context = CheckboxGroupContext;

  /**
   * {@link CheckboxGroupColor} です。
   */
  export type Color = CheckboxGroupColor;

  /**
   * {@link CheckboxGroupOrientation} です。
   */
  export type Orientation = CheckboxGroupOrientation;

  /**
   * {@link CheckboxGroupRadius} です。
   */
  export type Radius = CheckboxGroupRadius;

  /**
   * {@link CheckboxGroupSize} です。
   */
  export type Size = CheckboxGroupSize;

  /**
   * {@link CheckboxGroupVariant} です。
   */
  export type Variant = CheckboxGroupVariant;
}
