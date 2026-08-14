import * as React from "react";

import type { Component } from "../../types.js";
import * as AvatarParts from "./avatar.parts.jsx";

/**
 * {@link Avatar} の各パーツに渡すプロパティーです。
 */
export type AvatarSlotProps = {
  /**
   * {@link AvatarParts.Image|Image} に渡すプロパティーです。
   */
  readonly image?: AvatarParts.Image.Props | undefined;

  /**
   * {@link AvatarParts.Fallback|Fallback} に渡すプロパティーです。
   */
  readonly fallback?: AvatarParts.Fallback.Props | undefined;
};

/**
 * {@link Avatar} コンポーネントのプロパティーです。
 */
export type AvatarProps = Omit<AvatarParts.Root.Props, "children"> &
  Pick<AvatarParts.Fallback.Props, "children"> &
  Pick<AvatarParts.Image.Props, "alt" | "src"> & {
    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: AvatarSlotProps | undefined;
  };

/**
 * 画像またはフォールバックコンテンツを持つアバターを表示するコンポーネントです。
 *
 * @example
 * ```tsx
 * <Avatar src="/avatar.jpg" alt="太郎">太</Avatar>
 * ```
 */
export const Avatar: Component<AvatarProps> = function SuiAvatar(props) {
  const {
    alt,
    src,
    children,
    slotProps: { image: imageProps, fallback: fallbackProps } = {},
    ...otherRootProps
  } = props;

  return (
    <AvatarParts.Root {...otherRootProps}>
      {("alt" in props || "src" in props || !!imageProps) && (
        <AvatarParts.Image alt={alt} src={src} {...imageProps} />
      )}
      {("children" in props || !!fallbackProps) && (
        <AvatarParts.Fallback {...fallbackProps}>{children}</AvatarParts.Fallback>
      )}
    </AvatarParts.Root>
  );
};
