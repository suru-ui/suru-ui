import type { IComponent } from "../types.js";
import {
  type SkeletonRootProps,
  type SkeletonRootState,
  type SkeletonRootRadius,
  type SkeletonRootAnimation,
  SkeletonRoot,
} from "./skeleton.parts.js";

// Types
// -----

export type SkeletonRadius = SkeletonRootRadius;

export type SkeletonAnimation = SkeletonRootAnimation;

/**
 * {@link Skeleton} が持つ状態です。
 */
export type SkeletonState = SkeletonRootState;

/**
 * {@link Skeleton} に渡す props です。
 */
export type SkeletonProps = SkeletonRootProps;

// API
// ---

/**
 * {@link Skeleton} を構成する各パーツの props を作成するための API です。
 */
export class SkeletonAPI {
  private readonly rootProps: SkeletonRootProps;

  /**
   * @param props {@link Skeleton} の props です。
   * @internal
   */
  public constructor(props: SkeletonProps) {
    this.rootProps = props;
  }

  /**
   * {@link SkeletonRoot} に渡す props を取得します。
   */
  public getRootProps(): SkeletonRootProps {
    return this.rootProps;
  }
}

interface IUseSkeletonAPI {
  /**
   * {@link SkeletonAPI} を作成します。
   *
   * @param props {@link Skeleton} の props です。
   * @returns スケルトンの API です
   */
  (props: SkeletonProps): SkeletonAPI;
}

/**
 * {@link SkeletonAPI} を作成するフックです。
 */
export const useSkeletonAPI: IUseSkeletonAPI = function useSuiSkeletonAPI(props) {
  return new SkeletonAPI(props);
};

export { SkeletonAPI as API, useSkeletonAPI as useAPI };

// Component
// ---------

/**
 * コンテンツの読み込み中を表すプレースホルダーコンポーネントです。
 *
 * 大きさは `className` や `style` などで指定します。
 */
export const Skeleton: IComponent<SkeletonProps> = function SuiSkeleton(props) {
  const api = useSkeletonAPI(props);

  return <SkeletonRoot {...api.getRootProps()} />;
};

export namespace Skeleton {
  export type State = SkeletonState;

  export type Props = SkeletonProps;

  export type Animation = SkeletonAnimation;

  export type Radius = SkeletonRadius;
}
