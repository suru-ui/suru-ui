import { type Size, type Color, COLORS } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import { type AvatarRootProps, type AvatarRootState, AvatarRoot } from "../avatar/avatar.parts.jsx";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./avatar-group.css";

// Context
// -------

/**
 * アバターの色です。
 */
export type AvatarGroupContextColor = Color;

/**
 * アバターの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type AvatarGroupContextRadius = "none" | Size | "full";

/**
 * アバターの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type AvatarGroupContextSize = Size;

/**
 * {@link AvatarGroupRoot} が子パーツへ提供するコンテキストです。
 */
export type AvatarGroupContext = {
  /**
   * アバターの背景色です。
   */
  readonly color: AvatarGroupContextColor;

  /**
   * アバターの角丸です。
   */
  readonly radius: AvatarGroupContextRadius;

  /**
   * アバターの大きさを指定します。
   */
  readonly size: AvatarGroupContextSize;
};

/**
 * {@link AvatarGroupRoot} が子パーツへ提供するコンテキストです。
 */
export const AvatarGroupContext: React.Context<AvatarGroupContext | null> =
  React.createContext<AvatarGroupContext | null>(null);

function useSuiAvatarGroupContext(optional?: false): AvatarGroupContext;
function useSuiAvatarGroupContext(optional?: boolean): AvatarGroupContext | null;
function useSuiAvatarGroupContext(optional?: boolean): AvatarGroupContext | null {
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
 * {@link AvatarGroupContext} を読み取るフックです。
 */
export const useAvatarGroupContext: IUseContext<AvatarGroupContext> = useSuiAvatarGroupContext;

/**
 * {@link AvatarGroupContext} です。
 */
export type Context = AvatarGroupContext;

/**
 * {@link AvatarGroupContext} です。
 */
export const Context: React.Context<Context | null> = AvatarGroupContext;

/**
 * {@link Context} の型名前空間です。
 */
export namespace Context {
  /**
   * {@link AvatarGroupContextColor} です。
   */
  export type Color = AvatarGroupContextColor;

  /**
   * {@link AvatarGroupContextRadius} です。
   */
  export type Radius = AvatarGroupContextRadius;

  /**
   * {@link AvatarGroupContextSize} です。
   */
  export type Size = AvatarGroupContextSize;
}

/**
 * {@link useAvatarGroupContext} です。
 */
export const useContext: IUseContext<Context> = useAvatarGroupContext;

// Root
// ----

/**
 * 各アバターの色です。
 *
 * `"auto"` を指定すると、子アバターごとに色を自動で割り当てます。
 */
export type AvatarGroupRootColor = "auto" | Color;

/**
 * 各アバターの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type AvatarGroupRootRadius = "none" | Size | "full";

/**
 * 各アバターの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type AvatarGroupRootSize = Size;

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
     * @default "auto"
     */
    color?: AvatarGroupRootColor | undefined;

    // opticallyCenter?: boolean | undefined;

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
     * アバターの大きさを上書きします。
     *
     * @default "md"
     */
    size?: AvatarGroupRootSize | undefined;
  };

const colors = /*#__PURE__*/ COLORS.filter((color) => color !== "grey");

/**
 * アバターを重ねて表示するグループのルートコンポーネントです。
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
          color: color === "auto" ? colors[i % colors.length]! : color,
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
   * {@link AvatarGroupRootState} です。
   */
  export type State = AvatarGroupRootState;

  /**
   * {@link AvatarGroupRootProps} です。
   */
  export type Props = AvatarGroupRootProps;
}

/**
 * {@link AvatarGroupRoot} です。
 */
export const Root: IComponent<Root.Props> = AvatarGroupRoot;

// Surplus
// -------

/**
 * {@link AvatarGroupSurplus} の状態です。
 */
export type AvatarGroupSurplusState = AvatarRootState;

/**
 * {@link AvatarGroupSurplus} に渡すプロパティーです。
 */
export type AvatarGroupSurplusProps = AvatarRootProps;

/**
 * 余剰分のアバターの数などを表示するコンポーネントです。
 */
export const AvatarGroupSurplus: IComponent<AvatarGroupSurplusProps> =
  function SuiAvatarGroupSurplus(props) {
    const { color = "grey", ...otherProps } = props;

    return <AvatarRoot {...otherProps} color={color} />;
  };

/**
 * {@link AvatarGroupSurplus} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Surplus {
  /**
   * {@link AvatarGroupSurplusState} です。
   */
  export type State = AvatarGroupSurplusState;

  /**
   * {@link AvatarGroupSurplusProps} です。
   */
  export type Props = AvatarGroupSurplusProps;
}

/**
 * {@link AvatarGroupSurplus} です。
 */
export const Surplus: IComponent<Surplus.Props> = AvatarGroupSurplus;
