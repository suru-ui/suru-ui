import { COLORS, type Color, type Size } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";
import * as Avatar from "../avatar/index.js";

import "./avatar-group.css";

const colorfulColors = COLORS.filter((color) => color !== "grey");

// Context
// -------

/**
 * {@link AvatarGroupRoot} が子パーツへ提供するコンテキストです。
 */
export type AvatarGroupContext = {
  /**
   * アバターの背景色です。
   */
  color: Color;

  /**
   * アバターの角丸です。
   */
  radius: "none" | Size | "full";

  /**
   * アバターの大きさを指定します。
   */
  size: Size;
};

/**
 * {@link AvatarGroupRoot} が子パーツへ提供するコンテキストです。
 */
export const AvatarGroupContext: React.Context<AvatarGroupContext | null> =
  React.createContext<AvatarGroupContext | null>(null);

/**
 * {@link AvatarGroupContext} を読み取るフックです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
 */
export function useAvatarGroupContext(optional?: false): AvatarGroupContext;
export function useAvatarGroupContext(optional?: boolean): AvatarGroupContext | null;
export function useAvatarGroupContext(optional?: boolean): AvatarGroupContext | null {
  const context = React.use(AvatarGroupContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "AvatarGroupContext",
      providerName: "AvatarGroupRoot",
    });
  }

  return context;
}

/**
 * {@link AvatarGroupContext} です。
 */
export type Context = AvatarGroupContext;

/**
 * {@link AvatarGroupContext} です。
 */
export const Context: React.Context<AvatarGroupContext | null> = AvatarGroupContext;

/**
 * {@link useAvatarGroupContext} です。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
 */
export function useContext(optional?: false): AvatarGroupContext;
export function useContext(optional?: boolean): AvatarGroupContext | null;
export function useContext(optional?: boolean): AvatarGroupContext | null {
  return useAvatarGroupContext(optional);
}

// Root
// ----

/**
 * {@link AvatarGroupRoot} の状態です。
 */
export type AvatarGroupRootState = {};

/**
 * {@link AvatarGroupRoot} に渡すプロパティーです。
 */
export type AvatarGroupRootProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<AvatarGroupRootState> & {
    /**
     * フォールバックの背景色を指定します。
     *
     * アバターに色が指定されている場合、それを優先します。
     *
     * @default "colorful"
     */
    color?: Color | "colorful" | undefined;

    // opticallyCenter?: boolean | undefined;

    /**
     * アバターの角丸を指定します。
     *
     * アバターに角丸が指定されている場合、それを優先します。
     *
     * @default "full"
     */
    radius?: "none" | Size | "full" | undefined;

    /**
     * アバターの重なり順を逆にします。
     *
     * @default false
     */
    reverse?: boolean | undefined;

    /**
     * アバターの大きさを指定します。
     *
     * アバターの大きさを上書きします。
     *
     * @default "md"
     */
    size?: Size | undefined;
  };

/**
 * アバターを重ねて表示するグループのルートコンポーネントです。
 *
 * @example
 * ```tsx
 * <AvatarGroupRoot>
 *   <Avatar>太</Avatar>
 *   <Avatar>花</Avatar>
 * </AvatarGroupRoot>
 * ```
 */
export const AvatarGroupRoot: Component<AvatarGroupRootProps> = function SuiAvatarGroupRoot(props) {
  const {
    size = "md",
    color = "colorful",
    radius = "full",
    reverse = false,
    children: childrenProp,
    // opticallyCenter = false,
    ...otherProps
  } = props;
  // oxlint-disable-next-line react/jsx-key
  const children = React.Children.map(childrenProp, (child, i) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    return (
      <AvatarGroupContext
        value={{
          size,
          color: color === "colorful" ? colorfulColors[i % colorfulColors.length]! : color,
          radius,
        }}
      >
        {child}
      </AvatarGroupContext>
    );
  });

  return useRender({
    defaultTagName: "div",
    props: [
      otherProps,
      {
        children,
        className: cn(
          "sui_avatar_group",
          reverse && "sui_avatar_group-reverse",
          !reverse && "sui_avatar_group-forward",
          // opticallyCenter && "sui_avatar_group-optically_center",
        ),
      },
    ],
  });
};

/**
 * {@link AvatarGroupRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link AvatarGroupRoot} の状態型です。
   */
  export type State = AvatarGroupRootState;

  /**
   * {@link AvatarGroupRoot} のプロパティー型です。
   */
  export type Props = AvatarGroupRootProps;
}

/**
 * {@link AvatarGroupRoot} です。
 */
export const Root: Component<Root.Props> = AvatarGroupRoot;

// Surplus
// -------

/**
 * {@link AvatarGroupSurplus} の状態です。
 */
export type AvatarGroupSurplusState = Avatar.Root.State;

/**
 * {@link AvatarGroupSurplus} に渡すプロパティーです。
 */
export type AvatarGroupSurplusProps = Avatar.Root.Props;

/**
 * 余剰分のアバターの数などを表示するコンポーネントです。
 *
 * @example
 * ```tsx
 * <AvatarGroupSurplus>+{surplus}</AvatarGroupSurplus>
 * ```
 */
export const AvatarGroupSurplus: Component<AvatarGroupSurplusProps> =
  function SuiAvatarGroupSurplus(props) {
    const { color = "grey", ...otherProps } = props;

    return <Avatar.Root {...otherProps} color={color} />;
  };

/**
 * {@link AvatarGroupSurplus} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Surplus {
  /**
   * {@link AvatarGroupSurplus} の状態型です。
   */
  export type State = AvatarGroupSurplusState;

  /**
   * {@link AvatarGroupSurplus} のプロパティー型です。
   */
  export type Props = AvatarGroupSurplusProps;
}

/**
 * {@link AvatarGroupSurplus} です。
 */
export const Surplus: Component<Surplus.Props> = AvatarGroupSurplus;
