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
} from "./avatar.parts.js";

// Types
// -----

export type AvatarColor = AvatarRootColor;

export type AvatarRadius = AvatarRootRadius;

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

namespace AvatarProps {
  export type Avatar = {
    /**
     * 画像の代替テキストです。
     *
     * 画像を表示するときにだけ使われます。
     */
    alt?: AvatarImageProps["alt"] | undefined;

    /**
     * 画像を表示できないときに代わりに表示する内容です。
     */
    children?: AvatarFallbackProps["children"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: AvatarSlotProps | undefined;

    /**
     * 表示する画像の URL です。
     *
     * 省略するとフォールバックだけを表示します。
     */
    src?: AvatarImageProps["src"] | undefined;
  };

  export type Root = Omit<AvatarRootProps, keyof Avatar>;
}

/**
 * {@link Avatar} に渡す props です。
 */
export type AvatarProps = AvatarProps.Avatar & AvatarProps.Root;

// API
// ---

/**
 * {@link Avatar} を構成する各パーツの props を作成するための API です。
 */
export class AvatarAPI {
  private readonly avatarProps: Required<Omit<AvatarProps.Avatar, "slotProps">>;

  private readonly slotProps: AvatarSlotProps;

  private readonly rootProps: AvatarProps.Root;

  /**
   * @param props {@link Avatar} の props です。
   * @internal
   */
  public constructor(props: AvatarProps) {
    const { alt, src, children, slotProps = {}, ...rootProps } = props;
    this.avatarProps = { alt, src, children };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * {@link AvatarFallback} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getFallbackProps(): AvatarFallbackProps | null {
    const { fallback: props = {} } = this.slotProps;
    const { children } = this.avatarProps;

    if (isLikelyVisibleNode(children)) {
      return {
        ...props,
        children,
      };
    }

    return null;
  }

  /**
   * {@link AvatarImage} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getImageProps(): AvatarImageProps | null {
    const { image: props = {} } = this.slotProps;
    const { alt, src } = this.avatarProps;

    if (isLikelyVisibleNode(src)) {
      return {
        ...props,
        alt,
        src,
      };
    }

    return null;
  }

  /**
   * {@link AvatarRoot} に渡す props を取得します。
   */
  public getRootProps(): AvatarProps.Root {
    return this.rootProps;
  }
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
  return new AvatarAPI(props);
};

export { AvatarAPI as API, useAvatarAPI as useAPI };

// Component
// ---------

/**
 * 画像またはフォールバックコンテンツを持つアバターを表示するコンポーネントです。
 */
export const Avatar: IComponent<AvatarProps> = function SuiAvatar(props) {
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
  export type State = AvatarState;

  export type Props = AvatarProps;

  export type SlotProps = AvatarSlotProps;

  export type Color = AvatarColor;

  export type Radius = AvatarRadius;

  export type Size = AvatarSize;
}
