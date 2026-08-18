import { Avatar } from "@base-ui/react/avatar";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAvatarGroupContext } from "../avatar-group/avatar-group.parts.jsx";

import "./avatar.css";

// Types
// -----

/**
 * アバターの色です。
 */
export type AvatarColor = Color;

/**
 * アバターの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type AvatarRadius = "none" | Size | "full";

/**
 * アバターの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type AvatarSize = Size;

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
  color?: AvatarColor | undefined;

  /**
   * アバターの角丸を指定します。
   *
   * @default "full"
   */
  radius?: AvatarRadius | undefined;

  /**
   * アバターのサイズを指定します。
   *
   * @default "md"
   */
  size?: AvatarSize | undefined;
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
export const Fallback: IComponent<Fallback.Props> = AvatarFallback;
