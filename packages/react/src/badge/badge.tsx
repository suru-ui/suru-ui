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

// Types.

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

export type IBadge = IComponent<BadgeProps>;

export interface IUseBadgeAPI {
  /**
   * {@link BadgeAPI} を作成します。
   *
   * @param props {@link Badge} の props です。
   *
   * @returns バッジの API です
   */
  (props: BadgeProps): BadgeAPI;
}

// API.

/**
 * {@link Badge} を構成する各パーツの props を作成するための API です。
 */
export class BadgeAPI {
  private readonly rootProps: BadgeRootProps;

  /**
   * @param props {@link Badge} の props です。
   *
   * @internal
   */
  public constructor(props: BadgeProps) {
    this.rootProps = props;
  }

  /**
   * {@link BadgeRoot} に渡す props を取得します。
   */
  public getRootProps(): BadgeRootProps {
    return this.rootProps;
  }
}

/**
 * {@link BadgeAPI} を作成するフックです。
 */
export const useBadgeAPI: IUseBadgeAPI = (props) => new BadgeAPI(props);

export { BadgeAPI as API, useBadgeAPI as useAPI };

// Component.

/**
 * 状態や数値を示す小さなラベルを表示するコンポーネントです。
 *
 * `position` を指定すると、基準となる要素の四隅へ重ねて表示できます。`variant` が `"dot"` のときは内容を表示せず、小さな点だけを描画します。
 */
export const Badge: IBadge = (props) => {
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
