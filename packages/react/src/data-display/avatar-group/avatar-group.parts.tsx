import { useRender } from "@base-ui/react/use-render";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./avatar-group.css";

// Root
// ----

/**
 * アバターグループのルート要素の状態です。
 */
export type AvatarGroupRootState = {};

/**
 * アバターグループのルート要素に渡すプロパティーです。
 */
export type AvatarGroupRootProps = useRender.ComponentProps<"div", AvatarGroupRootState>;

/**
 * アバターを重ねて表示するグループのルート要素です。
 *
 * @example
 * ```tsx
 * <AvatarGroupParts.Root>
 *   <Avatar>太</Avatar>
 *   <Avatar>花</Avatar>
 * </AvatarGroupParts.Root>
 * ```
 */
export const AvatarGroupRoot: Component<AvatarGroupRootProps> = function SuiAvatarGroupRoot(props) {
  const { className, ref, render, ...elementProps } = props;

  return useRender({
    defaultTagName: "div",
    ref,
    render,
    props: {
      ...elementProps,
      className: cn(className, "sui_avatar_group"),
    },
  });
};

export namespace Root {
  export type State = AvatarGroupRootState;
  export type Props = AvatarGroupRootProps;
}

export const Root: Component<Root.Props> = AvatarGroupRoot;
