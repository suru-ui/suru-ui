import * as React from "react";

import type { Component } from "../../types.js";
import * as ToggleButtonGroupParts from "./toggle-button-group.parts.jsx";

/**
 * {@link ToggleButtonGroup} コンポーネントのプロパティーです。
 */
export type ToggleButtonGroupProps = ToggleButtonGroupParts.Root.Props & {
  /**
   * トグルボタン要素です。
   *
   * {@link ToggleButtonGroupParts.Root} が提供するコンテキストによって、選択状態とグループのスタイルが子要素へ伝播します。
   */
  readonly children?: React.ReactNode | undefined;
};

/**
 * トグルボタンをグループ化するコンポーネントです。
 *
 * グループに指定したプロパティーは、子要素のトグルボタンに強制されます。
 * 選択状態を管理し、単一選択または複数選択をサポートします。
 *
 * @example 基本（単一選択）
 * ```tsx
 * <ToggleButtonGroup>
 *   <ToggleButton value="a">A</ToggleButton>
 *   <ToggleButton value="b">B</ToggleButton>
 * </ToggleButtonGroup>
 * ```
 *
 * @example 複数選択
 * ```tsx
 * <ToggleButtonGroup multiple>
 *   <ToggleButton value="a">A</ToggleButton>
 *   <ToggleButton value="b">B</ToggleButton>
 * </ToggleButtonGroup>
 * ```
 *
 * @example 初期選択値
 * ```tsx
 * <ToggleButtonGroup defaultValue={["a"]}>
 *   <ToggleButton value="a">A</ToggleButton>
 *   <ToggleButton value="b">B</ToggleButton>
 * </ToggleButtonGroup>
 * ```
 *
 * @example 縦並び
 * ```tsx
 * <ToggleButtonGroup orientation="vertical">
 *   <ToggleButton value="a">A</ToggleButton>
 *   <ToggleButton value="b">B</ToggleButton>
 * </ToggleButtonGroup>
 * ```
 */
export const ToggleButtonGroup: Component<ToggleButtonGroupProps> = function SuiToggleButtonGroup(
  props,
) {
  return <ToggleButtonGroupParts.Root {...props} />;
};
