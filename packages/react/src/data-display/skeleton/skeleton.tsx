import type { IComponent } from "../../types.js";
import {
  type SkeletonRootProps,
  type SkeletonRootState,
  type SkeletonRootRadius,
  SkeletonRoot,
} from "./skeleton.parts.jsx";

/**
 * {@link SkeletonRootRadius} です。
 */
export type SkeletonRadius = SkeletonRootRadius;

/**
 * {@link Skeleton} の各パーツに渡すプロパティーです。
 */
export type SkeletonPartsProps = {
  /**
   * {@link SkeletonRoot} に渡すプロパティーです。
   */
  readonly root: SkeletonRootProps;
};

/**
 * {@link Skeleton} の状態です。
 */
export type SkeletonState = SkeletonRootState;

/**
 * {@link Skeleton} コンポーネントのプロパティーです。
 */
export type SkeletonProps = SkeletonRootProps;

/**
 * {@link Skeleton} の各パーツに渡すプロパティーを作るフックです。
 */
export function useSkeleton(props: SkeletonProps): SkeletonPartsProps {
  return {
    root: props,
  };
}

/**
 * コンテンツの読み込み中を表すプレースホルダーコンポーネントです。
 *
 * 大きさは `width` と `height` プロパティーや CSS で指定します。テキストの行を模す場合は既定の高さが使われます。
 */
export const Skeleton: IComponent<SkeletonProps> = function SuiSkeleton(props) {
  const partsProps = useSkeleton(props);

  return <SkeletonRoot {...partsProps.root} />;
};

/**
 * {@link Skeleton} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Skeleton {
  /**
   * {@link SkeletonState} です。
   */
  export type State = SkeletonState;

  /**
   * {@link SkeletonProps} です。
   */
  export type Props = SkeletonProps;

  /**
   * {@link SkeletonRadius} です。
   */
  export type Radius = SkeletonRadius;
}
