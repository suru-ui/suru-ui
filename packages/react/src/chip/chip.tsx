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

/**
 * {@link ChipRootColor}
 */
export type ChipColor = ChipRootColor;

/**
 * {@link ChipRootRadius}
 */
export type ChipRadius = ChipRootRadius;

/**
 * {@link ChipRootSize}
 */
export type ChipSize = ChipRootSize;

/**
 * {@link ChipRootVariant}
 */
export type ChipVariant = ChipRootVariant;

/**
 * {@link Chip} を構成する各パーツの props などを作成するための API です。
 */
export interface ChipAPI {
  /**
   * {@link ChipRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<ChipRootProps, "children">;
}

/**
 * {@link Chip} の状態です。
 */
export type ChipState = ChipRootState;

/**
 * {@link Chip} コンポーネントのプロパティーです。
 */
export type ChipProps = ChipRootProps;

interface IUseAPI {
  /**
   * {@link ChipAPI} を作成します。
   *
   * @param props {@link Chip} の props です。
   * @returns ボタンの API です
   */
  (props: ChipProps): ChipAPI;
}

/**
 * {@link ChipAPI} を作成するフックです。
 */
export const useChipAPI: IUseAPI = function useSuiChipAPI(props) {
  return {
    getRootProps() {
      return props;
    },
  };
};

/**
 * {@link useChipAPI}
 */
export const useAPI: IUseAPI = useChipAPI;

/**
 * 短いラベルや属性を表示するチップコンポーネントです。
 */
export const Chip: IComponent<ChipProps> = function SuiChip(props) {
  const api = useAPI(props);

  return <ChipRoot {...api.getRootProps()} />;
};

export namespace Chip {
  /**
   * {@link ChipState}
   */
  export type State = ChipState;

  /**
   * {@link ChipProps}
   */
  export type Props = ChipProps;

  /**
   * {@link ChipColor}
   */
  export type Color = ChipColor;

  /**
   * {@link ChipRadius}
   */
  export type Radius = ChipRadius;

  /**
   * {@link ChipSize}
   */
  export type Size = ChipSize;

  /**
   * {@link ChipVariant}
   */
  export type Variant = ChipVariant;
}
