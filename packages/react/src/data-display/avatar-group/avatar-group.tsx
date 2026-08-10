import { mergeProps } from "@base-ui/react/merge-props";
import * as React from "react";

import type { Component } from "../../types.js";
import { Avatar } from "../avatar/index.js";
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
   * @default 5
   */
  max?: number | undefined;

  /**
   * グループに含めるアバター要素です。
   */
  readonly children?: React.ReactNode | undefined;

  /**
   * 省略されたアバター数を表示する要素を生成します。
   */
  renderSurplus?: ((surplus: number) => React.ReactNode) | undefined;
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
  const {
    children,
    max = 5,
    renderSurplus = (surplus) => <Avatar>+{surplus}</Avatar>,
    ...rootProps
  } = props;
  const avatarChildren = React.Children.toArray(children);
  const hasSurplus = avatarChildren.length > max;
  const visibleChildren = avatarChildren.slice(0, hasSurplus ? max - 1 : max);
  const surplus = avatarChildren.length - visibleChildren.length;
  const renderedChildren: React.ReactNode[] = visibleChildren.map((child, index) => {
    if (!React.isValidElement<React.ComponentProps<"div">>(child)) {
      return child;
    }

    return React.cloneElement(
      child,
      mergeProps<"div">(child.props, {
        style: {
          zIndex: visibleChildren.length - index + (hasSurplus ? 1 : 0),
        },
      }),
    );
  });

  if (hasSurplus) {
    const surplusAvatar = renderSurplus(surplus);

    if (React.isValidElement<React.ComponentProps<"div">>(surplusAvatar)) {
      renderedChildren.push(
        React.cloneElement(
          surplusAvatar,
          mergeProps<"div">(surplusAvatar.props, {
            style: {
              zIndex: 1,
            },
          }),
        ),
      );
    } else {
      renderedChildren.push(surplusAvatar);
    }
  }

  return <AvatarGroupParts.Root {...rootProps}>{renderedChildren}</AvatarGroupParts.Root>;
};
