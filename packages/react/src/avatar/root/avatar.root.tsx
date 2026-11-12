import { Avatar } from "@base-ui/react/avatar";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import {
  type AvatarGroupContext,
  useAvatarGroupContext,
} from "../../avatar-group/root/avatar-group.root.context.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { AvatarRootContext } from "./avatar.root.context.js";

/** アバターの配色です。 */
export type AvatarRootColor = Color;

/**
 * アバターの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 * - `"circle"`: 完全な丸形
 */
export type AvatarRootRadius = "none" | Size | "full" | "circle";

/**
 * アバターの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AvatarRootSize = Size;

/**
 * {@link AvatarRoot} が持つ状態です。
 */
export type AvatarRootState = Override<AvatarGroupContext, Avatar.Root.State>;

export namespace AvatarRootProps {
  export type Render = RenderProps<AvatarRootState>;

  export type SuruUI = {
    /**
     * アバターの色を指定します。
     *
     * @default "grey"
     */
    color?: AvatarRootColor | undefined;

    /**
     * アバターの角丸を指定します。
     *
     * @default "full"
     */
    radius?: AvatarRootRadius | undefined;

    /**
     * アバターの大きさを指定します。
     *
     * @default "md"
     */
    size?: AvatarRootSize | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Avatar.Root>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AvatarRootProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Avatar.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AvatarRoot} に渡す props です。
 */
export type AvatarRootProps = AvatarRootProps.Render &
  AvatarRootProps.SuruUI &
  AvatarRootProps.BaseUI &
  AvatarRootProps.HTML;

export type IAvatarRoot = IComponent<AvatarRootProps>;

/**
 * アバターのルートコンポーネントです。
 *
 * 画像の読み込み状態を管理し、大きさ・配色・角丸を子パーツへ伝播します。
 */
export const AvatarRoot: IAvatarRoot = (props) => {
  const ctx = useAvatarGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp,
    style,
    radius: radiusProp,
    render,
    className,
    // @ts-expect-error data-scope は Base UI のコンポーネント型に含まれないため。
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const size = ctx?.size ?? sizeProp;
  const color = colorProp ?? ctx?.color ?? "grey";
  const radius = radiusProp ?? ctx?.radius ?? "full";
  const styleState = React.useMemo(
    () => ({
      size,
      color,
      radius,
      reverse: ctx?.reverse ?? false,
    }),
    [color, ctx, radius, size],
  );

  return (
    <Avatar.Root
      {...otherProps}
      {...proxyRenderProps<Avatar.Root.State, AvatarRootState>(
        (state) => ({
          ...styleState,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <AvatarRootContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </AvatarRootContext>
          ),
          className: cn<AvatarRootState>(
            className,
            "sui_avatar",
            (state) => `sui_avatar-size_${state.size}`,
            (state) => `sui_avatar-color_${state.color}`,
            (state) => `sui_avatar-radius_${state.radius}`,
            (state) => state.reverse && "sui_avatar-reverse",
            (state) => `sui_avatar-image_loading_status_${state.imageLoadingStatus}`,
          ),
        },
      )}
      data-scope={dataScope}
    />
  );
};

export { AvatarRoot as Root };
export namespace Root {
  export type State = AvatarRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AvatarRootProps.Render;

    export type SuruUI = AvatarRootProps.SuruUI;

    export type BaseUI = AvatarRootProps.BaseUI;

    export type HTML = AvatarRootProps.HTML;
  }

  export type Color = AvatarRootColor;

  export type Radius = AvatarRootRadius;

  export type Size = AvatarRootSize;
}
