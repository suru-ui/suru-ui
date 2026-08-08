import * as React from "react";

import type { Component } from "../../types.js";
import * as RadioGroupParts from "./radio-group.parts.jsx";

/**
 * {@link RadioGroup} コンポーネントのプロパティーです。
 */
export type RadioGroupProps = RadioGroupParts.Root.Props & {
  /**
   * ラジオボタン要素です。
   *
   * {@link RadioGroupParts.Root} にそのまま渡されます。
   */
  readonly children?: React.ReactNode | undefined;
};

/**
 * ラジオボタンをグループ化するコンポーネントです。
 *
 * グループの選択状態を管理し、子要素のラジオボタンにスタイルを強制します。
 * スタイルの指定は子要素の指定より優先され、値を変更するとグループ内へ反映されます。
 *
 * @example 基本
 * ```tsx
 * <RadioGroup defaultValue="option-a" color="blue">
 *   <Radio value="option-a" />
 *   <Radio value="option-b" />
 * </RadioGroup>
 * ```
 *
 * @example 横並び
 * ```tsx
 * <RadioGroup orientation="horizontal">
 *   <Radio value="a" />
 *   <Radio value="b" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup: Component<RadioGroupProps> = function SuiRadioGroup(props) {
  return <RadioGroupParts.Root {...props} />;
};
