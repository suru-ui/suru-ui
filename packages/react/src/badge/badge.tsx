import type { IComponent } from "../types.js";
import {
  type BadgeRootSize,
  type BadgeRootColor,
  type BadgeRootProps,
  type BadgeRootState,
  type BadgeRootRadius,
  type BadgeRootOverlap,
  type BadgeRootVariant,
  type BadgeRootPosition,
  BadgeRoot,
} from "./badge.parts.jsx";

// Types
// -----

/**
 * {@link BadgeRootColor}
 */
export type BadgeColor = BadgeRootColor;

/**
 * {@link BadgeRootOverlap}
 */
export type BadgeOverlap = BadgeRootOverlap;

/**
 * {@link BadgeRootPosition}
 */
export type BadgePosition = BadgeRootPosition;

/**
 * {@link BadgeRootRadius}
 */
export type BadgeRadius = BadgeRootRadius;

/**
 * {@link BadgeRootSize}
 */
export type BadgeSize = BadgeRootSize;

/**
 * {@link BadgeRootVariant}
 */
export type BadgeVariant = BadgeRootVariant;

/**
 * {@link Badge} が持つ状態です。
 */
export type BadgeState = BadgeRootState;

/**
 * {@link Badge} に渡す props です。
 */
export type BadgeProps = BadgeRootProps;

// API
// ---

/**
 * {@link Badge} を構成する各パーツの props を作成するための API です。
 */
export interface BadgeAPI {
  /**
   * {@link BadgeRoot} に渡す props を取得します。
   */
  getRootProps(): BadgeRootProps;
}

interface IUseBadgeAPI {
  /**
   * {@link BadgeAPI} を作成します。
   *
   * @param props {@link Badge} の props です。
   * @returns バッジの API です
   */
  (props: BadgeProps): BadgeAPI;
}

/**
 * {@link BadgeAPI} を作成するフックです。
 */
export const useBadgeAPI: IUseBadgeAPI = function useSuiBadgeAPI(props) {
  return {
    getRootProps() {
      return props;
    },
  };
};

export { type BadgeAPI as API, useBadgeAPI as useAPI };

// Component
// ---------

/**
 * 状態や数値を示す小さなラベルを表示するバッジコンポーネントです。
 */
export const Badge: IComponent<BadgeProps> = function SuiBadge(props) {
  const api = useBadgeAPI(props);

  return <BadgeRoot {...api.getRootProps()} />;
};

export namespace Badge {
  /**
   * {@link BadgeState}
   */
  export type State = BadgeState;

  /**
   * {@link BadgeProps}
   */
  export type Props = BadgeProps;

  /**
   * {@link BadgeColor}
   */
  export type Color = BadgeColor;

  /**
   * {@link BadgeOverlap}
   */
  export type Overlap = BadgeOverlap;

  /**
   * {@link BadgePosition}
   */
  export type Position = BadgePosition;

  /**
   * {@link BadgeRadius}
   */
  export type Radius = BadgeRadius;

  /**
   * {@link BadgeSize}
   */
  export type Size = BadgeSize;

  /**
   * {@link BadgeVariant}
   */
  export type Variant = BadgeVariant;
}
