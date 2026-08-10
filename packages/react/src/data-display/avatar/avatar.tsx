import * as React from "react";

import type { Component } from "../../types.js";
import * as AvatarParts from "./avatar.parts.jsx";

/**
 * {@link Avatar} コンポーネントのプロパティーです。
 */
export type AvatarProps = AvatarParts.Root.Props & {
  /**
   * フォールバックに表示するコンテンツです。
   */
  children?: React.ReactNode | undefined;

  /**
   * 画像の URL です。
   */
  src?: string | undefined;

  /**
   * 画像の代替テキストです。
   */
  alt?: string | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?:
    | {
        /**
         * {@link AvatarParts.Image|Image} に渡すプロパティーです。
         */
        readonly image?: AvatarParts.Image.Props | undefined;

        /**
         * {@link AvatarParts.Fallback|Fallback} に渡すプロパティーです。
         */
        readonly fallback?: AvatarParts.Fallback.Props | undefined;
      }
    | undefined;
};

/**
 * 画像またはフォールバックコンテンツを持つアバターを表示します。
 *
 * @example
 * ```tsx
 * <Avatar src="/avatar.jpg" alt="太郎">太</Avatar>
 * ```
 */
export const Avatar: Component<AvatarProps> = function SuiAvatar(props) {
  const {
    src,
    alt,
    children,
    slotProps: { image: imageProps, fallback: fallbackProps } = {},
    ...rootProps
  } = props;

  return (
    <AvatarParts.Root {...rootProps}>
      {src !== undefined || imageProps !== undefined ? (
        <AvatarParts.Image
          {...imageProps}
          src={imageProps?.src ?? src}
          alt={imageProps?.alt ?? alt}
        />
      ) : null}
      {children !== undefined || fallbackProps !== undefined ? (
        <AvatarParts.Fallback {...fallbackProps}>{children}</AvatarParts.Fallback>
      ) : null}
    </AvatarParts.Root>
  );
};
