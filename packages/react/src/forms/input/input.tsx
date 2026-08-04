import type { Component } from "../../types.js";
import * as InputParts from "./input.parts.jsx";

/**
 * {@link Input} コンポーネントのプロパティーです。
 */
export type InputProps = InputParts.Root.Props;

/**
 * テキスト入力欄を表示するコンポーネントです。
 *
 * @example 基本
 * ```tsx
 * <Input placeholder="e.g. Colm Tuite" />
 * ```
 *
 * @example ラベル付き
 * ```tsx
 * <label>
 *   名前
 *   <Input variant="liquid" placeholder="田中 太郎" />
 * </label>
 * ```
 */
export const Input: Component<InputProps> = function SuiInput(props) {
  return <InputParts.Root {...props} />;
};
