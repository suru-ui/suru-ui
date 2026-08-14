import type { Component } from "../../types.js";
import * as ChipParts from "./chip.parts.jsx";

/**
 * {@link Chip} コンポーネントのプロパティーです。
 */
export type ChipProps = ChipParts.Root.Props;

/**
 * 短いラベルや属性を表示するチップコンポーネントです。
 *
 * @example 基本
 * ```tsx
 * <Chip color="blue">新着</Chip>
 * ```
 */
export const Chip: Component<ChipProps> = function SuiChip(props) {
  return <ChipParts.Root {...props} />;
};
