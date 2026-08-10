import { Avatar } from "@base-ui/react/avatar";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./avatar.css";

// Root
// ----

/**
 * アバターのルート要素の状態です。
 */
export type AvatarRootState = Avatar.Root.State;

/**
 * アバターのルート要素に渡すプロパティーです。
 */
export type AvatarRootProps = React.ComponentProps<typeof Avatar.Root> & {
  /**
   * アバターのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * フォールバックの背景色を指定します。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * アバターの角丸を指定します。
   *
   * @default "full"
   */
  radius?: "none" | "rounded" | "full" | undefined;
};

/**
 * アバターのルート要素です。
 *
 * @example
 * ```tsx
 * <AvatarParts.Root>
 *   <AvatarParts.Image src="/avatar.jpg" alt="太郎" />
 *   <AvatarParts.Fallback>太</AvatarParts.Fallback>
 * </AvatarParts.Root>
 * ```
 */
export const AvatarRoot: Component<AvatarRootProps> = function SuiAvatarRoot(props) {
  const { size = "md", color = "grey", radius = "full", className, ...otherProps } = props;

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
    />
  );
};

export namespace Root {
  /**
   * {@link AvatarRoot} の状態型です。
   */
  export type State = AvatarRootState;
  /**
   * {@link AvatarRoot} のプロパティー型です。
   */
  export type Props = AvatarRootProps;
}

export const Root: Component<Root.Props> = AvatarRoot;

// Image
// -----

/**
 * アバター画像の状態です。
 */
export type AvatarImageState = Avatar.Image.State;

/**
 * アバター画像に渡すプロパティーです。
 */
export type AvatarImageProps = React.ComponentProps<typeof Avatar.Image>;

/**
 * アバターの画像要素です。
 *
 * 画像の読み込みに失敗すると、Base UI が Fallback を表示します。
 */
export const AvatarImage: Component<AvatarImageProps> = function SuiAvatarImage(props) {
  const { className, ...otherProps } = props;

  return <Avatar.Image {...otherProps} className={cn(className, "sui_avatar_image")} />;
};

export namespace Image {
  /**
   * {@link AvatarImage} の状態型です。
   */
  export type State = AvatarImageState;
  /**
   * {@link AvatarImage} のプロパティー型です。
   */
  export type Props = AvatarImageProps;
}

export const Image: Component<Image.Props> = AvatarImage;

// Fallback
// --------

/**
 * アバターフォールバックの状態です。
 */
export type AvatarFallbackState = Avatar.Fallback.State;

/**
 * アバターフォールバックに渡すプロパティーです。
 */
export type AvatarFallbackProps = React.ComponentProps<typeof Avatar.Fallback>;

/**
 * 画像を表示できないときのアバターフォールバック要素です。
 *
 * @example
 * ```tsx
 * <AvatarParts.Fallback>太</AvatarParts.Fallback>
 * ```
 */
export const AvatarFallback: Component<AvatarFallbackProps> = function SuiAvatarFallback(props) {
  const { className, ...otherProps } = props;

  return <Avatar.Fallback {...otherProps} className={cn(className, "sui_avatar_fallback")} />;
};

export namespace Fallback {
  /**
   * {@link AvatarFallback} の状態型です。
   */
  export type State = AvatarFallbackState;
  /**
   * {@link AvatarFallback} のプロパティー型です。
   */
  export type Props = AvatarFallbackProps;
}

export const Fallback: Component<Fallback.Props> = AvatarFallback;
