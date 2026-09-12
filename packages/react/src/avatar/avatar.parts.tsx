import { Avatar } from "@base-ui/react/avatar";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import { useAvatarGroupContext } from "../avatar-group/avatar-group.parts.jsx";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./avatar.css";

// Root
// ----

/**
 * アバターの配色です。
 */
export type AvatarRootColor = Color;

/**
 * アバターの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 完全な丸形
 */
export type AvatarRootRadius = "none" | Size | "full";

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
export type AvatarRootState = Avatar.Root.State;

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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Avatar.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AvatarRootProps:
      never,
      keyof Render | keyof SuruUI
    >
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

/**
 * アバターのルートコンポーネントです。
 */
export const AvatarRoot: IComponent<AvatarRootProps> = function SuiAvatarRoot(props) {
  const group = useAvatarGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp,
    radius: radiusProp,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const size = group?.size ?? sizeProp;
  const color = colorProp ?? group?.color ?? "grey";
  const radius = radiusProp ?? group?.radius ?? "full";

  return (
    <Avatar.Root
      {...otherProps}
      className={cn(
        className,
        "sui_avatar",
        `sui_avatar-size_${size}`,
        `sui_avatar-color_${color}`,
        `sui_avatar-radius_${radius}`,
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

// Image
// -----

/**
 * {@link AvatarImage} が持つ状態です。
 */
export type AvatarImageState = Avatar.Image.State;

export namespace AvatarImageProps {
  export type Render = RenderProps<AvatarImageState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Avatar.Image>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AvatarImageProps:
      "onLoadingStatusChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Avatar.Image>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AvatarImage} に渡す props です。
 */
export type AvatarImageProps = AvatarImageProps.Render &
  AvatarImageProps.SuruUI &
  AvatarImageProps.BaseUI &
  AvatarImageProps.HTML;

/**
 * アバターの画像コンポーネントです。
 *
 * 画像の読み込みに失敗すると、{@link AvatarFallback} を表示します。
 */
export const AvatarImage: IComponent<AvatarImageProps> = function SuiAvatarImage(props) {
  const { className, ...otherProps } = props;

  return <Avatar.Image {...otherProps} className={cn(className, "sui_avatar_image")} />;
};

export { AvatarImage as Image };

export namespace Image {
  export type State = AvatarImageState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AvatarImageProps.Render;

    export type SuruUI = AvatarImageProps.SuruUI;

    export type BaseUI = AvatarImageProps.BaseUI;

    export type HTML = AvatarImageProps.HTML;
  }
}

// Fallback
// --------

/**
 * {@link AvatarFallback} が持つ状態です。
 */
export type AvatarFallbackState = Avatar.Fallback.State;

export namespace AvatarFallbackProps {
  export type Render = RenderProps<AvatarFallbackState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Avatar.Fallback>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AvatarFallbackProps:
      "delay",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Avatar.Fallback>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AvatarFallback} に渡す props です。
 */
export type AvatarFallbackProps = AvatarFallbackProps.Render &
  AvatarFallbackProps.SuruUI &
  AvatarFallbackProps.BaseUI &
  AvatarFallbackProps.HTML;

/**
 * アバターのフォールバックを表示するコンポーネントです。
 */
export const AvatarFallback: IComponent<AvatarFallbackProps> = function SuiAvatarFallback(props) {
  const { className, ...otherProps } = props;

  return <Avatar.Fallback {...otherProps} className={cn(className, "sui_avatar_fallback")} />;
};

export { AvatarFallback as Fallback };

export namespace Fallback {
  export type State = AvatarFallbackState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AvatarFallbackProps.Render;

    export type SuruUI = AvatarFallbackProps.SuruUI;

    export type BaseUI = AvatarFallbackProps.BaseUI;

    export type HTML = AvatarFallbackProps.HTML;
  }
}
