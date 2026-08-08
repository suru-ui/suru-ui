import * as React from "react";

import type { Component } from "../../types.js";
import * as ButtonGroupParts from "./button-group.parts.jsx";

/**
 * {@link ButtonGroup} コンポーネントのプロパティーです。
 */
export type ButtonGroupProps = ButtonGroupParts.Root.Props & {
  /**
   * ボタン要素です。
   *
   * グループのスタイル指定が子ボタンの同じ指定より優先されます。
   */
  readonly children?: React.ReactNode | undefined;
};

/**
 * ボタンをグループ化するコンポーネントです。
 *
 * グループに指定したプロパティーは、子要素のボタンに強制されます。
 *
 * {@link ButtonGroupParts.Root} の Props と同じプロパティーを指定できます。
 *
 * @example 基本
 * ```tsx
 * <ButtonGroup color="blue" size="sm">
 *   <Button>保存</Button>
 *   <Button>キャンセル</Button>
 * </ButtonGroup>
 * ```
 *
 * @example 縦並び
 * ```tsx
 * <ButtonGroup orientation="vertical">
 *   <Button>A</Button>
 *   <Button>B</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup: Component<ButtonGroupProps> = function SuiButtonGroup(props) {
  return <ButtonGroupParts.Root {...props} />;
};
