import type { IComponent } from "../types.js";
import {
  type SkeletonRootProps,
  type SkeletonRootState,
  type SkeletonRootRadius,
  SkeletonRoot,
} from "./skeleton.parts.jsx";

// Types
// -----

/**
 * {@link SkeletonRootRadius}
 */
export type SkeletonRadius = SkeletonRootRadius;

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
export interface SkeletonAPI {
  /**
   * {@link SkeletonRoot} に渡す props を取得します。
   */
  getRootProps(): SkeletonRootProps;
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
  return {
    getRootProps() {
      return props;
    },
  };
};

export { type SkeletonAPI as API, useSkeletonAPI as useAPI };

// Component
// ---------

/**
 * コンテンツの読み込み中を表すプレースホルダーコンポーネントです。
 *
 * 大きさは `width` と `height` プロパティーや CSS で指定します。テキストの行を模す場合は既定の高さが使われます。
 */
export const Skeleton: IComponent<SkeletonProps> = function SuiSkeleton(props) {
  const api = useSkeletonAPI(props);

  return <SkeletonRoot {...api.getRootProps()} />;
};

export namespace Skeleton {
  /**
   * {@link SkeletonState}
   */
  export type State = SkeletonState;

  /**
   * {@link SkeletonProps}
   */
  export type Props = SkeletonProps;

  /**
   * {@link SkeletonRadius}
   */
  export type Radius = SkeletonRadius;
}
