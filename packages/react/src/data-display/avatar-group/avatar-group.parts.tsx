import { COLORS, type Color, type Size } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";
import * as Avatar from "../avatar/index.js";

import "./avatar-group.css";

const colorfulColors = COLORS.filter((color) => color !== "grey");

// Context
// -------

/**
 * {@link AvatarGroupRoot} が子パーツへ提供する状態です。
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
 * {@link AvatarGroupRoot} が提供するボタン状態の Context です。
 *
 * 通常は {@link useAvatarGroupContext} または {@link useContext} を使用してください。
 */
export const AvatarGroupContext: React.Context<AvatarGroupContext | null> =
  React.createContext<AvatarGroupContext | null>(null);

/**
 * 直近の {@link AvatarGroupRoot} が提供する状態を取得します。
 *
 * `optional` が `true` の場合、Provider の外では `null` を返します。
 * `optional` を指定しない場合、Provider の外で呼び出すとエラーになります。
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
 * {@link AvatarGroupContext} の別名です。
 */
export type Context = AvatarGroupContext;

/**
 * {@link AvatarGroupContext} の別名です。
 */
export const Context: React.Context<AvatarGroupContext | null> = AvatarGroupContext;

/**
 * {@link useAvatarGroupContext} の別名です。
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

    /**
     * アバターの角丸を指定します。
     *
     * アバターに角丸が指定されている場合、それを優先します。
     *
     * @default "full"
     */
    radius?: "none" | Size | "full" | undefined;

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
  const { size = "md", color = "colorful", radius = "full", children, ...otherProps } = props;
  const renderedChildArray = React.Children.map(children, (child, i) => {
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
        children: renderedChildArray,
        className: "sui_avatar_group",
      },
    ],
  });
};

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

export const AvatarGroupSurplus: Component<AvatarGroupSurplusProps> =
  function SuiAvatarGroupSurplus(props) {
    const { color = "grey", ...otherProps } = props;

    return <Avatar.Root {...otherProps} color={color} />;
  };

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

export const Surplus: Component<Surplus.Props> = AvatarGroupSurplus;
