import * as React from "react";

import type { Component } from "../../types.js";
import * as AvatarGroupParts from "./avatar-group.parts.jsx";

/**
 * {@link AvatarGroup} コンポーネントのプロパティーです。
 */
export type AvatarGroupProps = AvatarGroupParts.Root.Props & {
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
 *
 * @example
 * ```tsx
 * <AvatarGroup max={4}>
 *   <Avatar src="/taro.jpg" alt="太郎">太</Avatar>
 *   <Avatar src="/hanako.jpg" alt="花子">花</Avatar>
 *   <Avatar src="/jiro.jpg" alt="次郎">次</Avatar>
 *   <Avatar src="/sakura.jpg" alt="桜">桜</Avatar>
 *   <Avatar src="/ken.jpg" alt="健">健</Avatar>
 * </AvatarGroup>
 * ```
 */
export const AvatarGroup: Component<AvatarGroupProps> = function SuiAvatarGroup(props) {
  const { max = 4, children, ...otherRootProps } = props;
  const childArray = React.Children.toArray(children);
  const hasSurplus = childArray.length > max;
  const renderedChildArray = childArray.slice(0, hasSurplus ? max - 1 : max);
  if (hasSurplus) {
    const surplus = Math.max(0, childArray.length - renderedChildArray.length);
    renderedChildArray.push(<AvatarGroupParts.Surplus>+{surplus}</AvatarGroupParts.Surplus>);
  }

  return <AvatarGroupParts.Root {...otherRootProps}>{renderedChildArray}</AvatarGroupParts.Root>;
};
