import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import { type Size, type Color, COLORS } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { AvatarGroupContext } from "./avatar-group.context.js";

/**
 * 各アバターの配色です。
 *
 * `"auto"` を指定すると、子アバターごとに色を自動で割り当てます。
 */
export type AvatarGroupRootColor = "auto" | Color;

/**
 * 各アバターの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 完全な丸形
 */
export type AvatarGroupRootRadius = "none" | Size | "full";

/**
 * 各アバターの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AvatarGroupRootSize = Size;

/**
 * {@link AvatarGroupRoot} が持つ状態です。
 */
export type AvatarGroupRootState = {};

export namespace AvatarGroupRootProps {
  export type Render = RenderProps<AvatarGroupRootState>;

  export type SuruUI = {
    /**
     * 各アバターの背景色を指定します。
     *
     * アバターに色が指定されている場合、それを優先します。
     *
     * @default "auto"
     */
    color?: AvatarGroupRootColor | undefined;

    /**
     * アバターの角丸を指定します。
     *
     * アバターに角丸が指定されている場合、それを優先します。
     *
     * @default "full"
     */
    radius?: AvatarGroupRootRadius | undefined;

    /**
     * アバターの重なり順を逆にします。
     *
     * @default false
     */
    reverse?: boolean | undefined;

    /**
     * アバターの大きさを指定します。
     *
     * 子のアバターの大きさを上書きします。
     *
     * @default "md"
     */
    size?: AvatarGroupRootSize | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AvatarGroupRoot} に渡す props です。
 *
 * 大きさは子のアバターの指定より優先され、色と角丸は子の指定がないときに使われます。
 */
export type AvatarGroupRootProps = AvatarGroupRootProps.Render &
  AvatarGroupRootProps.SuruUI &
  AvatarGroupRootProps.BaseUI &
  AvatarGroupRootProps.HTML;

const colors = /*#__PURE__*/ COLORS.filter((color) => color !== "grey");

/**
 * アバターを重ねて表示するグループのルート要素です。
 *
 * 大きさ・色・角丸をコンテキストで子のアバターへ伝播します。
 */
export const AvatarGroupRoot: IComponent<AvatarGroupRootProps> = function SuiAvatarGroupRoot(
  props,
) {
  const {
    size = "md",
    color = "auto",
    radius = "full",
    reverse = false,
    children: childrenProp,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;
  const children = React.Children.map(childrenProp, (child, i) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    return (
      <AvatarGroupContext
        value={{
          size,
          color: color === "auto" ? (colors[i % colors.length] ?? "grey") : color,
          radius,
        }}
      >
        {child}
      </AvatarGroupContext>
    );
  });

  return useRender({
    props: [
      otherDivProps,
      {
        children,
        className: cn(
          className,
          "sui_avatar_group",
          reverse && "sui_avatar_group-reverse",
          !reverse && "sui_avatar_group-forward",
        ),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "div",
  });
};

export { AvatarGroupRoot as Root };

export namespace Root {
  export type State = AvatarGroupRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AvatarGroupRootProps.Render;

    export type SuruUI = AvatarGroupRootProps.SuruUI;

    export type BaseUI = AvatarGroupRootProps.BaseUI;

    export type HTML = AvatarGroupRootProps.HTML;
  }

  export type Color = AvatarGroupRootColor;

  export type Radius = AvatarGroupRootRadius;

  export type Size = AvatarGroupRootSize;
}
