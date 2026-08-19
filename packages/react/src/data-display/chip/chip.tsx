import type { IComponent } from "../../types.js";
import {
  type ChipRootSize,
  type ChipRootColor,
  type ChipRootProps,
  type ChipRootState,
  type ChipRootRadius,
  type ChipRootVariant,
  ChipRoot,
} from "./chip.parts.jsx";

/**
 * {@link ChipRootColor} です。
 */
export type ChipColor = ChipRootColor;

/**
 * {@link ChipRootRadius} です。
 */
export type ChipRadius = ChipRootRadius;

/**
 * {@link ChipRootSize} です。
 */
export type ChipSize = ChipRootSize;

/**
 * {@link ChipRootVariant} です。
 */
export type ChipVariant = ChipRootVariant;

/**
 * {@link Chip} の状態です。
 */
export type ChipState = ChipRootState;

/**
 * {@link Chip} コンポーネントのプロパティーです。
 */
export type ChipProps = ChipRootProps;

/**
 * 短いラベルや属性を表示するチップコンポーネントです。
 */
export const Chip: IComponent<ChipProps> = function SuiChip(props) {
  return <ChipRoot {...props} />;
};

/**
 * {@link Chip} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Chip {
  /**
   * {@link ChipState} です。
   */
  export type State = ChipState;

  /**
   * {@link ChipProps} です。
   */
  export type Props = ChipProps;

  /**
   * {@link ChipColor} です。
   */
  export type Color = ChipColor;

  /**
   * {@link ChipRadius} です。
   */
  export type Radius = ChipRadius;

  /**
   * {@link ChipSize} です。
   */
  export type Size = ChipSize;

  /**
   * {@link ChipVariant} です。
   */
  export type Variant = ChipVariant;
}
