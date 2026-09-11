import type { IComponent } from "../types.js";
import {
  type ChipRootSize,
  type ChipRootColor,
  type ChipRootProps,
  type ChipRootState,
  type ChipRootRadius,
  type ChipRootVariant,
  ChipRoot,
} from "./chip.parts.jsx";

// Types
// -----

export type ChipColor = ChipRootColor;

export type ChipRadius = ChipRootRadius;

export type ChipSize = ChipRootSize;

export type ChipVariant = ChipRootVariant;

/**
 * {@link Chip} が持つ状態です。
 */
export type ChipState = ChipRootState;

/**
 * {@link Chip} に渡す props です。
 */
export type ChipProps = ChipRootProps;

// API
// ---

/**
 * {@link Chip} を構成する各パーツの props を作成するための API です。
 */
export interface ChipAPI {
  /**
   * {@link ChipRoot} に渡す props を取得します。
   */
  getRootProps(): ChipRootProps;
}

interface IUseChipAPI {
  /**
   * {@link ChipAPI} を作成します。
   *
   * @param props {@link Chip} の props です。
   * @returns チップの API です
   */
  (props: ChipProps): ChipAPI;
}

/**
 * {@link ChipAPI} を作成するフックです。
 */
export const useChipAPI: IUseChipAPI = function useSuiChipAPI(props) {
  return {
    getRootProps() {
      return props;
    },
  };
};

export { type ChipAPI as API, useChipAPI as useAPI };

// Component
// ---------

/**
 * 短いラベルや属性を表示するチップコンポーネントです。
 */
export const Chip: IComponent<ChipProps> = function SuiChip(props) {
  const api = useChipAPI(props);

  return <ChipRoot {...api.getRootProps()} />;
};

export namespace Chip {
  export type State = ChipState;

  export type Props = ChipProps;

  export type Color = ChipColor;

  export type Radius = ChipRadius;

  export type Size = ChipSize;

  export type Variant = ChipVariant;
}
