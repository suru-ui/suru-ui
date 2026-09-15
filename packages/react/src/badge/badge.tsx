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
} from "./badge.parts.js";

// Types
// -----

export type BadgeColor = BadgeRootColor;

export type BadgeOverlap = BadgeRootOverlap;

export type BadgePosition = BadgeRootPosition;

export type BadgeRadius = BadgeRootRadius;

export type BadgeSize = BadgeRootSize;

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
  export type State = BadgeState;

  export type Props = BadgeProps;

  export type Color = BadgeColor;

  export type Overlap = BadgeOverlap;

  export type Position = BadgePosition;

  export type Radius = BadgeRadius;

  export type Size = BadgeSize;

  export type Variant = BadgeVariant;
}
