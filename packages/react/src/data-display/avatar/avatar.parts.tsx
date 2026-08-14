import { Avatar } from "@base-ui/react/avatar";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";
import { useAvatarGroupContext } from "../avatar-group/avatar-group.parts.jsx";

import "./avatar.css";

// Root
// ----

/**
 * {@link AvatarRoot} の状態です。
 */
export type AvatarRootState = Avatar.Root.State;

/**
 * {@link AvatarRoot} に渡すプロパティーです。
 */
export type AvatarRootProps = React.ComponentProps<typeof Avatar.Root> & {
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
  radius?: "none" | Size | "full" | undefined;

  /**
   * アバターのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;
};

/**
 * アバターのルートコンポーネントです。
 *
 * @example
 * ```tsx
 * <AvatarRoot>
 *   <AvatarImage src="/avatar.jpg" alt="太郎" />
 *   <AvatarFallback>太</AvatarFallback>
 * </AvatarRoot>
 * ```
 */
export const AvatarRoot: Component<AvatarRootProps> = function SuiAvatarRoot(props) {
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
    />
  );
};

/**
 * {@link AvatarRoot} の状態とプロパティーをまとめた型名前空間です。
 */
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

/**
 * {@link AvatarRoot} です。
 */
export const Root: Component<Root.Props> = AvatarRoot;

// Image
// -----

/**
 * {@link AvatarImage} の状態です。
 */
export type AvatarImageState = Avatar.Image.State;

/**
 * {@link AvatarImage} に渡すプロパティーです。
 */
export type AvatarImageProps = React.ComponentProps<typeof Avatar.Image>;

/**
 * アバターの画像コンポーネントです。
 *
 * 画像の読み込みに失敗すると、{@link AvatarFallback} を表示します。
 */
export const AvatarImage: Component<AvatarImageProps> = function SuiAvatarImage(props) {
  const { className, ...otherProps } = props;

  return <Avatar.Image {...otherProps} className={cn(className, "sui_avatar_image")} />;
};

/**
 * {@link AvatarImage} の状態とプロパティーをまとめた型名前空間です。
 */
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

/**
 * {@link AvatarImage} です。
 */
export const Image: Component<Image.Props> = AvatarImage;

// Fallback
// --------

/**
 * {@link AvatarFallback} の状態です。
 */
export type AvatarFallbackState = Avatar.Fallback.State;

/**
 * {@link AvatarFallback} に渡すプロパティーです。
 */
export type AvatarFallbackProps = React.ComponentProps<typeof Avatar.Fallback>;

/**
 * 画像を表示できないときのアバターフォールバックコンポーネントです。
 *
 * @example
 * ```tsx
 * <AvatarFallback>太</AvatarFallback>
 * ```
 */
export const AvatarFallback: Component<AvatarFallbackProps> = function SuiAvatarFallback(props) {
  const { className, ...otherProps } = props;

  return <Avatar.Fallback {...otherProps} className={cn(className, "sui_avatar_fallback")} />;
};

/**
 * {@link AvatarFallback} の状態とプロパティーをまとめた型名前空間です。
 */
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

/**
 * {@link AvatarFallback} です。
 */
export const Fallback: Component<Fallback.Props> = AvatarFallback;
