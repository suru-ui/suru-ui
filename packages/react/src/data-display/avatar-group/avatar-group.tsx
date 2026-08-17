import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type AvatarGroupRootProps,
  type AvatarGroupRootState,
  AvatarGroupRoot,
  AvatarGroupSurplus,
} from "./avatar-group.parts.jsx";

/**
 * {@link AvatarGroup} の状態です。
 */
export type AvatarGroupState = AvatarGroupRootState;

/**
 * {@link AvatarGroup} に渡すプロパティーです。
 */
export type AvatarGroupProps = AvatarGroupRootProps & {
  /**
   * 表示するアバターの最大数です。
   *
   * 省略アバターもこの数に含まれます。
   *
   * @default 4
   */
  max?: number | undefined;
};

/**
 * 複数のアバターを重ねて表示するコンポーネントです。
 */
export const AvatarGroup: IComponent<AvatarGroupProps> = function SuiAvatarGroup(props) {
  const { max = 4, children, ...otherRootProps } = props;
  const childArray = React.Children.toArray(children);
  const hasSurplus = childArray.length > max;
  const renderedChildArray = childArray.slice(0, hasSurplus ? max - 1 : max);
  if (hasSurplus) {
    const surplus = Math.max(0, childArray.length - renderedChildArray.length);
    renderedChildArray.push(<AvatarGroupSurplus>+{surplus}</AvatarGroupSurplus>);
  }

  return <AvatarGroupRoot {...otherRootProps}>{renderedChildArray}</AvatarGroupRoot>;
};

/**
 * {@link AvatarGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace AvatarGroup {
  /**
   * {@link AvatarGroupState} です。
   */
  export type State = AvatarGroupState;

  /**
   * {@link AvatarGroupProps} です。
   */
  export type Props = AvatarGroupProps;
}
