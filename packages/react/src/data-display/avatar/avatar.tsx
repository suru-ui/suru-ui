import * as React from "react";

import type { Component } from "../../types.js";
import * as AvatarParts from "./avatar.parts.jsx";

/**
 * アバターを表示するコンポーネントのプロパティーです。
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
        readonly image?: AvatarParts.Image.Props | undefined;
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
    children,
    src,
    alt,
    slotProps: { image: imageProps, fallback: fallbackProps } = {},
    ...rootProps
  } = props;

  return (
    <AvatarParts.Root {...rootProps}>
      {src !== undefined || imageProps !== undefined ? (
        <AvatarParts.Image
          {...imageProps}
          src={src ?? imageProps?.src}
          alt={alt ?? imageProps?.alt}
        />
      ) : null}
      {children !== undefined || fallbackProps !== undefined ? (
        <AvatarParts.Fallback {...fallbackProps}>{children}</AvatarParts.Fallback>
      ) : null}
    </AvatarParts.Root>
  );
};
