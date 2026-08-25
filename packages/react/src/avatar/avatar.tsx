import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type AvatarRootSize,
  type AvatarRootColor,
  type AvatarRootProps,
  type AvatarRootState,
  type AvatarImageProps,
  type AvatarRootRadius,
  type AvatarFallbackProps,
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
} from "./avatar.parts.jsx";

/**
 * {@link AvatarRootColor} です。
 */
export type AvatarColor = AvatarRootColor;

/**
 * {@link AvatarRootRadius} です。
 */
export type AvatarRadius = AvatarRootRadius;

/**
 * {@link AvatarRootSize} です。
 */
export type AvatarSize = AvatarRootSize;

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
 * {@link Avatar} の各パーツに渡すプロパティーです。
 */
export type AvatarPartsProps = {
  /**
   * {@link AvatarFallback} に渡すプロパティーです。
   *
   * これを表示しないときは null になります。
   */
  readonly fallback: AvatarFallbackProps | null;

  /**
   * {@link AvatarImage} に渡すプロパティーです。
   *
   * これを表示しないときは null になります。
   */
  readonly image: AvatarImageProps | null;

  /**
   * {@link AvatarRoot} に渡すプロパティーです。
   */
  readonly root: AvatarRootProps;
};

/**
 * {@link Avatar} の状態です。
 */
export type AvatarState = AvatarRootState;

/**
 * {@link Avatar} コンポーネントのプロパティーです。
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
 * {@link Avatar} の各パーツに渡すプロパティーを作るフックです。
 */
export function useAvatar(props: AvatarProps): AvatarPartsProps {
  const {
    alt,
    src,
    children,
    slotProps: { image: imageProps, fallback: fallbackProps } = {},
    ...otherRootProps
  } = props;

  return {
    root: otherRootProps,
    image:
      "src" in props || !!imageProps
        ? {
            alt,
            src,
            ...imageProps,
          }
        : null,
    fallback:
      "children" in props || !!fallbackProps
        ? {
            children,
            ...fallbackProps,
          }
        : null,
  };
}

/**
 * 画像またはフォールバックコンテンツを持つアバターを表示するコンポーネントです。
 */
export const Avatar: IComponent<AvatarProps> = function SuiAvatar(props) {
  const partsProps = useAvatar(props);

  return (
    <AvatarRoot {...partsProps.root}>
      {partsProps.image && <AvatarImage {...partsProps.image} />}
      {partsProps.fallback && <AvatarFallback {...partsProps.fallback} />}
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

  /**
   * {@link AvatarColor} です。
   */
  export type Color = AvatarColor;

  /**
   * {@link AvatarRadius} です。
   */
  export type Radius = AvatarRadius;

  /**
   * {@link AvatarSize} です。
   */
  export type Size = AvatarSize;
}
