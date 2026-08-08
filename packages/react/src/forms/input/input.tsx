import type { Component } from "../../types.js";
import * as InputParts from "./input.parts.jsx";

/**
 * {@link Input} に渡すプロパティーです。
 *
 * {@link InputParts.Root.Props} の別名であり、標準の input 属性と {@link InputParts.Root}
 * 固有のスタイル指定を受け取ります。
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
export const Input: Component<InputProps> = InputParts.Root;
