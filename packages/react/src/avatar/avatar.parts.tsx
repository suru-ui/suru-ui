import { Avatar } from "@base-ui/react/avatar";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

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

/**
 * {@link AvatarRoot} に渡す props です。
 */
export type AvatarRootProps = React.ComponentProps<typeof Avatar.Root> & {
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

/**
 * アバターのルートコンポーネントです。
 */
export const AvatarRoot: IComponent<AvatarRootProps> = function SuiAvatarRoot(props) {
  const group = useAvatarGroupContext(true);
  const {
    size: sizeProp = "md",
    color = group?.color ?? "grey",
    radius = group?.radius ?? "full",
    className,
    ...otherProps
  } = props;
  const size = group?.size ?? sizeProp;

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
      data-scope=""
    />
  );
};

export { AvatarRoot as Root };

export namespace Root {
  /**
   * {@link AvatarRootState}
   */
  export type State = AvatarRootState;

  /**
   * {@link AvatarRootProps}
   */
  export type Props = AvatarRootProps;

  /**
   * {@link AvatarRootColor}
   */
  export type Color = AvatarRootColor;

  /**
   * {@link AvatarRootRadius}
   */
  export type Radius = AvatarRootRadius;

  /**
   * {@link AvatarRootSize}
   */
  export type Size = AvatarRootSize;
}

// Image
// -----

/**
 * {@link AvatarImage} が持つ状態です。
 */
export type AvatarImageState = Avatar.Image.State;

/**
 * {@link AvatarImage} に渡す props です。
 */
export type AvatarImageProps = React.ComponentProps<typeof Avatar.Image>;

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
  /**
   * {@link AvatarImageState}
   */
  export type State = AvatarImageState;

  /**
   * {@link AvatarImageProps}
   */
  export type Props = AvatarImageProps;
}

// Fallback
// --------

/**
 * {@link AvatarFallback} が持つ状態です。
 */
export type AvatarFallbackState = Avatar.Fallback.State;

/**
 * {@link AvatarFallback} に渡す props です。
 */
export type AvatarFallbackProps = React.ComponentProps<typeof Avatar.Fallback>;

/**
 * アバターのフォールバックを表示するコンポーネントです。
 */
export const AvatarFallback: IComponent<AvatarFallbackProps> = function SuiAvatarFallback(props) {
  const { className, ...otherProps } = props;

  return <Avatar.Fallback {...otherProps} className={cn(className, "sui_avatar_fallback")} />;
};

export { AvatarFallback as Fallback };

export namespace Fallback {
  /**
   * {@link AvatarFallbackState}
   */
  export type State = AvatarFallbackState;

  /**
   * {@link AvatarFallbackProps}
   */
  export type Props = AvatarFallbackProps;
}
