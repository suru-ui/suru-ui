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
 * アバターの色です。
 */
export type AvatarRootColor = Color;

/**
 * アバターの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type AvatarRootRadius = "none" | Size | "full";

/**
 * アバターの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type AvatarRootSize = Size;

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
  color?: AvatarRootColor | undefined;

  /**
   * アバターの角丸を指定します。
   *
   * @default "full"
   */
  radius?: AvatarRootRadius | undefined;

  /**
   * アバターのサイズを指定します。
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
    />
  );
};

/**
 * {@link AvatarRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link AvatarRootState} です。
   */
  export type State = AvatarRootState;

  /**
   * {@link AvatarRootProps} です。
   */
  export type Props = AvatarRootProps;

  /**
   * {@link AvatarRootColor} です。
   */
  export type Color = AvatarRootColor;

  /**
   * {@link AvatarRootRadius} です。
   */
  export type Radius = AvatarRootRadius;

  /**
   * {@link AvatarRootSize} です。
   */
  export type Size = AvatarRootSize;
}

/**
 * {@link AvatarRoot} です。
 */
export const Root: IComponent<Root.Props> = AvatarRoot;

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
export const AvatarImage: IComponent<AvatarImageProps> = function SuiAvatarImage(props) {
  const { className, ...otherProps } = props;

  return <Avatar.Image {...otherProps} className={cn(className, "sui_avatar_image")} />;
};

/**
 * {@link AvatarImage} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Image {
  /**
   * {@link AvatarImageState} です。
   */
  export type State = AvatarImageState;

  /**
   * {@link AvatarImageProps} です。
   */
  export type Props = AvatarImageProps;
}

/**
 * {@link AvatarImage} です。
 */
export const Image: IComponent<Image.Props> = AvatarImage;

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
 */
export const AvatarFallback: IComponent<AvatarFallbackProps> = function SuiAvatarFallback(props) {
  const { className, ...otherProps } = props;

  return <Avatar.Fallback {...otherProps} className={cn(className, "sui_avatar_fallback")} />;
};

/**
 * {@link AvatarFallback} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Fallback {
  /**
   * {@link AvatarFallbackState} です。
   */
  export type State = AvatarFallbackState;

  /**
   * {@link AvatarFallbackProps} です。
   */
  export type Props = AvatarFallbackProps;
}

/**
 * {@link AvatarFallback} です。
 */
export const Fallback: IComponent<Fallback.Props> = AvatarFallback;
