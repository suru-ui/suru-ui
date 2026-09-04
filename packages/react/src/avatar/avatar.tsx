import isLikelyVisibleNode from "../_is-likely-visible-node.js";
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

// Types
// -----

/**
 * {@link AvatarRootColor}
 */
export type AvatarColor = AvatarRootColor;

/**
 * {@link AvatarRootRadius}
 */
export type AvatarRadius = AvatarRootRadius;

/**
 * {@link AvatarRootSize}
 */
export type AvatarSize = AvatarRootSize;

/**
 * {@link Avatar} の各パーツに渡す props です。
 */
export type AvatarSlotProps = {
  /**
   * {@link AvatarFallback} に渡す props です。
   */
  readonly fallback?: Omit<AvatarFallbackProps, "children"> | undefined;

  /**
   * {@link AvatarImage} に渡す props です。
   */
  readonly image?: Omit<AvatarImageProps, "alt" | "src"> | undefined;
};

/**
 * {@link Avatar} が持つ状態です。
 */
export type AvatarState = AvatarRootState;

/**
 * {@link Avatar} に渡す props です。
 */
export type AvatarProps = Omit<AvatarRootProps, "children"> &
  Pick<AvatarFallbackProps, "children"> & {
    /**
     * 画像の代替テキストです。
     */
    alt?: AvatarImageProps["alt"];

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     *
     * 各パーツの props が優先されます。
     */
    slotProps?: AvatarSlotProps | undefined;

    /**
     * 表示する画像の URL です。
     */
    src?: AvatarImageProps["src"];
  };

// API
// ---

/**
 * {@link Avatar} を構成する各パーツの props を作成するための API です。
 */
export interface AvatarAPI {
  /**
   * {@link AvatarFallback} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getFallbackProps(): AvatarFallbackProps | null;

  /**
   * {@link AvatarImage} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getImageProps(): AvatarImageProps | null;

  /**
   * {@link AvatarRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<AvatarRootProps, "children">;
}

interface IUseAvatarAPI {
  /**
   * {@link AvatarAPI} を作成します。
   *
   * @param props {@link Avatar} の props です。
   * @returns アバターの API です
   */
  (props: AvatarProps): AvatarAPI;
}

/**
 * {@link AvatarAPI} を作成するフックです。
 */
export const useAvatarAPI: IUseAvatarAPI = function useSuiAvatarAPI(props) {
  const {
    alt,
    src,
    children,
    slotProps: { image: imageProps = {}, fallback: fallbackProps = {} } = {},
    ...otherRootProps
  } = props;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getImageProps() {
      return isLikelyVisibleNode(src) ? { ...imageProps, alt, src } : null;
    },
    getFallbackProps() {
      return isLikelyVisibleNode(children) ? { ...fallbackProps, children } : null;
    },
  };
};

export { type AvatarAPI as API, useAvatarAPI as useAPI };

// Component
// ---------

/**
 * 画像またはフォールバックコンテンツを持つアバターを表示するコンポーネントです。
 */
export const Avatar: IComponent<AvatarProps> = function SuiAvatar(props: AvatarProps) {
  const api = useAvatarAPI(props);
  const imageProps = api.getImageProps();
  const fallbackProps = api.getFallbackProps();

  return (
    <AvatarRoot {...api.getRootProps()}>
      {imageProps && <AvatarImage {...imageProps} />}
      {fallbackProps && <AvatarFallback {...fallbackProps} />}
    </AvatarRoot>
  );
};

export namespace Avatar {
  /**
   * {@link AvatarState}
   */
  export type State = AvatarState;

  /**
   * {@link AvatarProps}
   */
  export type Props = AvatarProps;

  /**
   * {@link AvatarSlotProps}
   */
  export type SlotProps = AvatarSlotProps;

  /**
   * {@link AvatarColor}
   */
  export type Color = AvatarColor;

  /**
   * {@link AvatarRadius}
   */
  export type Radius = AvatarRadius;

  /**
   * {@link AvatarSize}
   */
  export type Size = AvatarSize;
}
