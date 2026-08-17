import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type AvatarRootProps,
  type AvatarRootState,
  type AvatarImageProps,
  type AvatarFallbackProps,
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
} from "./avatar.parts.jsx";

/**
 * {@link Avatar} の各パーツに渡すプロパティーです。
 */
export type AvatarSlotProps = {
  /**
   * {@link AvatarFallback} に渡すプロパティーです。
   */
  readonly fallback?: AvatarFallbackProps | undefined;

  /**
   * {@link AvatarImage} に渡すプロパティーです。
   */
  readonly image?: AvatarImageProps | undefined;
};

/**
 * {@link Avatar} の状態です。
 */
export type AvatarState = AvatarRootState;

/**
 * {@link Avatar} に渡すプロパティーです。
 */
export type AvatarProps = Omit<AvatarRootProps, "children"> &
  Pick<AvatarFallbackProps, "children"> &
  Pick<AvatarImageProps, "alt" | "src"> & {
    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: AvatarSlotProps | undefined;
  };

/**
 * 画像またはフォールバックコンテンツを持つアバターを表示するコンポーネントです。
 */
export const Avatar: IComponent<AvatarProps> = function SuiAvatar(props) {
  const {
    alt,
    src,
    children,
    slotProps: { image: imageProps, fallback: fallbackProps } = {},
    ...otherRootProps
  } = props;

  return (
    <AvatarRoot {...otherRootProps}>
      {("src" in props || !!imageProps) && <AvatarImage alt={alt} src={src} {...imageProps} />}
      {("children" in props || !!fallbackProps) && (
        <AvatarFallback {...fallbackProps}>{children}</AvatarFallback>
      )}
    </AvatarRoot>
  );
};

/**
 * {@link Avatar} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Avatar {
  /**
   * {@link AvatarState} です。
   */
  export type State = AvatarState;

  /**
   * {@link AvatarProps} です。
   */
  export type Props = AvatarProps;

  /**
   * {@link AvatarSlotProps} です。
   */
  export type SlotProps = AvatarSlotProps;
}
