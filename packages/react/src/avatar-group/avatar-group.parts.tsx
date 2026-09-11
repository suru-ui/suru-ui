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
 * アバターの配色です。
 */
export type AvatarGroupContextColor = Color;

/**
 * アバターの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 完全な丸形
 */
export type AvatarGroupContextRadius = "none" | Size | "full";

/**
 * アバターの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AvatarGroupContextSize = Size;

/**
 * {@link AvatarGroupRoot} が子パーツへ提供するコンテキストです。
 */
export type AvatarGroupContext = {
  /**
   * アバターの背景配色です。
   */
  readonly color: AvatarGroupContextColor;

  /**
   * アバターの角丸です。
   */
  readonly radius: AvatarGroupContextRadius;

  /**
   * アバターの大きさです。
   */
  readonly size: AvatarGroupContextSize;
};

/**
 * アバターグループのスタイルを子要素へ伝播するコンテキストです。
 */
export const AvatarGroupContext: React.Context<AvatarGroupContext | null> =
  React.createContext<AvatarGroupContext | null>(null);

function useSuiAvatarGroupContext(optional?: false): AvatarGroupContext;
function useSuiAvatarGroupContext(optional?: boolean): AvatarGroupContext | null;
function useSuiAvatarGroupContext(optional?: boolean): AvatarGroupContext | null {
  const ctx = React.use(AvatarGroupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "AvatarGroupContext",
      providerName: "AvatarGroupRoot",
    });
  }

  return ctx;
}

/**
 * {@link AvatarGroupContext} を読み取るフックです。
 */
export const useAvatarGroupContext: IUseContext<AvatarGroupContext> = useSuiAvatarGroupContext;

export { AvatarGroupContext as Context, useAvatarGroupContext as useContext };

export namespace Context {
  export type Color = AvatarGroupContextColor;

  export type Radius = AvatarGroupContextRadius;

  export type Size = AvatarGroupContextSize;
}

// Root
// ----

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
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;

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
     * アバターの大きさを上書きします。
     *
     * @default "md"
     */
    size?: AvatarGroupRootSize | undefined;
  };
}

/**
 * {@link AvatarGroupRoot} に渡す props です。
 */
export type AvatarGroupRootProps = AvatarGroupRootProps.Render &
  AvatarGroupRootProps.SuruUI &
  AvatarGroupRootProps.HTML;

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

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type HTML = AvatarGroupRootProps.HTML;

    export type Render = AvatarGroupRootProps.Render;

    export type SuruUI = AvatarGroupRootProps.SuruUI;
  }

  export type Color = AvatarGroupRootColor;

  export type Radius = AvatarGroupRootRadius;

  export type Size = AvatarGroupRootSize;
}

// Surplus
// -------

/**
 * {@link AvatarGroupSurplus} が持つ状態です。
 */
export type AvatarGroupSurplusState = AvatarRootState;

export namespace AvatarGroupSurplusProps {
  export type BaseUI = Omit<AvatarRootProps, keyof Render>;

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof AvatarRootProps>;

  export type Render = RenderProps<AvatarGroupSurplusState>;

  export type SuruUI = {};
}

/**
 * {@link AvatarGroupSurplus} に渡す props です。
 */
export type AvatarGroupSurplusProps = AvatarGroupSurplusProps.Render &
  AvatarGroupSurplusProps.SuruUI &
  AvatarGroupSurplusProps.BaseUI &
  AvatarGroupSurplusProps.HTML;

/**
 * 余剰分のアバターの数などを表示するコンポーネントです。
 */
export const AvatarGroupSurplus: IComponent<AvatarGroupSurplusProps> =
  function SuiAvatarGroupSurplus(props) {
    const { color = "grey", className, ...otherProps } = props;

    return <AvatarRoot {...otherProps} color={color} className={className} />;
  };

export { AvatarGroupSurplus as Surplus };

export namespace Surplus {
  export type State = AvatarGroupSurplusState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = AvatarGroupSurplusProps.BaseUI;

    export type HTML = AvatarGroupSurplusProps.HTML;

    export type Render = AvatarGroupSurplusProps.Render;

    export type SuruUI = AvatarGroupSurplusProps.SuruUI;
  }
}
