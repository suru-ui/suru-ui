import type { IComponent } from "../types.js";
import {
  type BadgeRootSize,
  type BadgeRootColor,
  type BadgeRootProps,
  type BadgeRootState,
  type BadgeRootRadius,
  type BadgeRootVariant,
  BadgeRoot,
} from "./badge.parts.jsx";

/**
 * {@link BadgeRootColor} です。
 */
export type BadgeColor = BadgeRootColor;

/**
 * {@link BadgeRootRadius} です。
 */
export type BadgeRadius = BadgeRootRadius;

/**
 * {@link BadgeRootSize} です。
 */
export type BadgeSize = BadgeRootSize;

/**
 * {@link BadgeRootVariant} です。
 */
export type BadgeVariant = BadgeRootVariant;

/**
 * {@link Badge} の各パーツに渡すプロパティーです。
 */
export type BadgePartsProps = {
  /**
   * {@link BadgeRoot} に渡すプロパティーです。
   */
  readonly root: BadgeRootProps;
};

/**
 * {@link Badge} の状態です。
 */
export type BadgeState = BadgeRootState;

/**
 * {@link Badge} コンポーネントのプロパティーです。
 */
export type BadgeProps = BadgeRootProps;

/**
 * {@link Badge} の各パーツに渡すプロパティーを作るフックです。
 */
export function useBadge(props: BadgeProps): BadgePartsProps {
  return {
    root: props,
  };
}

/**
 * 状態や数値を示す小さなラベルを表示するバッジコンポーネントです。
 */
export const Badge: IComponent<BadgeProps> = function SuiBadge(props) {
  const partsProps = useBadge(props);

  return <BadgeRoot {...partsProps.root} />;
};

/**
 * {@link Badge} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Badge {
  /**
   * {@link BadgeState} です。
   */
  export type State = BadgeState;

  /**
   * {@link BadgeProps} です。
   */
  export type Props = BadgeProps;

  /**
   * {@link BadgeColor} です。
   */
  export type Color = BadgeColor;

  /**
   * {@link BadgeRadius} です。
   */
  export type Radius = BadgeRadius;

  /**
   * {@link BadgeSize} です。
   */
  export type Size = BadgeSize;

  /**
   * {@link BadgeVariant} です。
   */
  export type Variant = BadgeVariant;
}
