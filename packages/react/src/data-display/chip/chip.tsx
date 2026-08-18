import type { IComponent } from "../../types.js";
import { type ChipRootProps, type ChipRootState, ChipRoot } from "./chip.parts.jsx";

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
}
