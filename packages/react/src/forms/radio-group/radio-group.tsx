import * as React from "react";

import type { IComponent, IUseContext } from "../../types.js";
import {
  type RadioGroupContext,
  type RadioGroupRootSize,
  type RadioGroupRootColor,
  type RadioGroupRootProps,
  type RadioGroupRootState,
  type RadioGroupRootRadius,
  type RadioGroupRootVariant,
  type RadioGroupRootOrientation,
  RadioGroupRoot,
  useRadioGroupContext,
} from "./radio-group.parts.jsx";

/**
 * {@link RadioGroupRootColor} です。
 */
export type RadioGroupColor = RadioGroupRootColor;

/**
 * {@link RadioGroupRootOrientation} です。
 */
export type RadioGroupOrientation = RadioGroupRootOrientation;

/**
 * {@link RadioGroupRootRadius} です。
 */
export type RadioGroupRadius = RadioGroupRootRadius;

/**
 * {@link RadioGroupRootSize} です。
 */
export type RadioGroupSize = RadioGroupRootSize;

/**
 * {@link RadioGroupRootVariant} です。
 */
export type RadioGroupVariant = RadioGroupRootVariant;

/**
 * {@link RadioGroup} の状態です。
 */
export type RadioGroupState = RadioGroupRootState;

/**
 * {@link RadioGroup} コンポーネントのプロパティーです。
 */
export type RadioGroupProps = RadioGroupRootProps;

/**
 * {@link RadioGroup} の各パーツに渡すプロパティーです。
 */
export type RadioGroupPartsProps = {
  /**
   * {@link RadioGroupRoot} に渡すプロパティーです。
   */
  readonly root: RadioGroupRootProps;
};

/**
 * {@link RadioGroup} の各パーツに渡すプロパティーを作るフックです。
 */
export function useRadioGroup(props: RadioGroupProps): RadioGroupPartsProps {
  return {
    root: props,
  };
}

interface RadioGroupType extends IComponent<RadioGroupProps> {
  /**
   * {@link useRadioGroupContext} です。
   */
  readonly useContext: IUseContext<RadioGroupContext>;
}

/**
 * ラジオボタンをグループ化するコンポーネントです。
 *
 * グループの選択状態を管理し、子要素のラジオボタンにスタイルを強制します。
 * スタイルの指定は子要素の指定より優先され、値を変更するとグループ内へ反映されます。
 */
export const RadioGroup: RadioGroupType = /*#__PURE__*/ Object.assign(
  function SuiRadioGroup(props: RadioGroupProps) {
    const partsProps = useRadioGroup(props);

    return <RadioGroupRoot {...partsProps.root} />;
  },
  {
    useContext: useRadioGroupContext,
  },
);

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

  /**
   * {@link RadioGroupContext} です。
   */
  export type Context = RadioGroupContext;

  /**
   * {@link RadioGroupColor} です。
   */
  export type Color = RadioGroupColor;

  /**
   * {@link RadioGroupOrientation} です。
   */
  export type Orientation = RadioGroupOrientation;

  /**
   * {@link RadioGroupRadius} です。
   */
  export type Radius = RadioGroupRadius;

  /**
   * {@link RadioGroupSize} です。
   */
  export type Size = RadioGroupSize;

  /**
   * {@link RadioGroupVariant} です。
   */
  export type Variant = RadioGroupVariant;
}
