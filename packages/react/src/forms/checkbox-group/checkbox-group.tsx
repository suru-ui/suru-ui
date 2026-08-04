import type { Component } from "../../types.js";
import * as CheckboxGroupParts from "./checkbox-group.parts.jsx";

/**
 * {@link CheckboxGroup} コンポーネントのプロパティーです。
 */
export type CheckboxGroupProps = CheckboxGroupParts.Root.Props & {
  /**
   * チェックボックス要素です。
   */
  readonly children?: React.ReactNode | undefined;
};

/**
 * チェックボックスをグループ化するコンポーネントです。
 *
 * グループの選択状態を管理し、子要素のチェックボックスにスタイルを強制します。
 *
 * @example 基本
 * ```tsx
 * <CheckboxGroup defaultValue={["option-a"]} color="blue">
 *   <Checkbox value="option-a" />
 *   <Checkbox value="option-b" />
 * </CheckboxGroup>
 * ```
 *
 * @example 横並び
 * ```tsx
 * <CheckboxGroup orientation="horizontal">
 *   <Checkbox value="a" />
 *   <Checkbox value="b" />
 * </CheckboxGroup>
 * ```
 */
export const CheckboxGroup: Component<CheckboxGroupProps> = function SuiCheckboxGroup(props) {
  return <CheckboxGroupParts.Root {...props} />;
};
