import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type ScrollAreaRootProps,
  type ScrollAreaRootState,
  type ScrollAreaThumbProps,
  type ScrollAreaCornerProps,
  type ScrollAreaContentProps,
  type ScrollAreaViewportProps,
  type ScrollAreaScrollbarProps,
  ScrollAreaRoot,
  ScrollAreaThumb,
  ScrollAreaCorner,
  ScrollAreaContent,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
} from "./scroll-area.parts.js";

// Types
// -----

/**
 * {@link ScrollArea} の各パーツに渡す props です。
 */
export type ScrollAreaSlotProps = {
  /**
   * {@link ScrollAreaContent} に渡す props です。
   */
  readonly content?: Omit<ScrollAreaContentProps, "children"> | undefined;

  /**
   * {@link ScrollAreaCorner} に渡す props です。
   */
  readonly corner?: ScrollAreaCornerProps | undefined;

  /**
   * 水平方向の {@link ScrollAreaScrollbar} に渡す props です。
   */
  readonly horizontalScrollbar?:
    | Omit<ScrollAreaScrollbarProps, "children" | "orientation">
    | undefined;

  /**
   * 水平方向の {@link ScrollAreaThumb} に渡す props です。
   */
  readonly horizontalThumb?: ScrollAreaThumbProps | undefined;

  /**
   * 垂直方向の {@link ScrollAreaScrollbar} に渡す props です。
   */
  readonly scrollbar?: Omit<ScrollAreaScrollbarProps, "children" | "orientation"> | undefined;

  /**
   * 垂直方向の {@link ScrollAreaThumb} に渡す props です。
   */
  readonly thumb?: ScrollAreaThumbProps | undefined;

  /**
   * {@link ScrollAreaViewport} に渡す props です。
   */
  readonly viewport?: Omit<ScrollAreaViewportProps, "children"> | undefined;
};

/**
 * {@link ScrollArea} が持つ状態です。
 */
export type ScrollAreaState = ScrollAreaRootState;

namespace ScrollAreaProps {
  export type Root = Omit<ScrollAreaRootProps, keyof ScrollArea>;

  export type ScrollArea = {
    /**
     * スクロール領域に表示する内容です。
     */
    children?: React.ReactNode | undefined;

    /**
     * 水平方向のスクロールバーを表示するかどうかを指定します。
     *
     * 垂直方向のスクロールバーは常に描画されます。
     *
     * @default false
     */
    horizontal?: boolean | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: ScrollAreaSlotProps | undefined;
  };
}

/**
 * {@link ScrollArea} に渡す props です。
 */
export type ScrollAreaProps = ScrollAreaProps.ScrollArea & ScrollAreaProps.Root;

export type IScrollArea = IComponent<ScrollAreaProps>;

// API
// ---

/**
 * {@link ScrollArea} を構成する各パーツの props を作成するための API です。
 */
export class ScrollAreaAPI {
  private readonly children: React.ReactNode;

  private readonly horizontal: boolean;

  private readonly rootProps: ScrollAreaProps.Root;

  private readonly slotProps: ScrollAreaSlotProps;

  /**
   * @param props {@link ScrollArea} の props です。
   * @internal
   */
  public constructor(props: ScrollAreaProps) {
    const { children, slotProps = {}, horizontal = false, ...rootProps } = props;
    this.children = children;
    this.horizontal = horizontal;
    this.rootProps = rootProps;
    this.slotProps = slotProps;
  }

  /**
   * {@link ScrollAreaContent} に渡す props を取得します。
   */
  public getContentProps(): ScrollAreaContentProps {
    const { content: props = {} } = this.slotProps;

    return {
      ...props,
      children: this.children,
    };
  }

  /**
   * {@link ScrollAreaCorner} に渡す props を取得します。
   */
  public getCornerProps(): ScrollAreaCornerProps {
    const { corner: props = {} } = this.slotProps;

    return props;
  }

  /**
   * 水平方向の {@link ScrollAreaScrollbar} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getHorizontalScrollbarProps(): Omit<ScrollAreaScrollbarProps, "children"> | null {
    if (!this.horizontal) {
      return null;
    }

    const { horizontalScrollbar: props = {} } = this.slotProps;

    return {
      ...props,
      orientation: "horizontal",
    };
  }

  /**
   * 水平方向の {@link ScrollAreaThumb} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getHorizontalThumbProps(): ScrollAreaThumbProps | null {
    if (!this.horizontal) {
      return null;
    }

    const { horizontalThumb: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ScrollAreaRoot} に渡す props を取得します。
   */
  public getRootProps(): ScrollAreaProps.Root {
    return this.rootProps;
  }

  /**
   * 垂直方向の {@link ScrollAreaScrollbar} に渡す props を取得します。
   */
  public getScrollbarProps(): Omit<ScrollAreaScrollbarProps, "children"> {
    const { scrollbar: props = {} } = this.slotProps;

    return {
      ...props,
      orientation: "vertical",
    };
  }

  /**
   * 垂直方向の {@link ScrollAreaThumb} に渡す props を取得します。
   */
  public getThumbProps(): ScrollAreaThumbProps {
    const { thumb: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ScrollAreaViewport} に渡す props を取得します。
   */
  public getViewportProps(): Omit<ScrollAreaViewportProps, "children"> {
    const { viewport: props = {} } = this.slotProps;

    return props;
  }
}

interface IUseScrollAreaAPI {
  /**
   * {@link ScrollAreaAPI} を作成します。
   *
   * @param props {@link ScrollArea} の props です。
   * @returns スクロール領域の API です
   */
  (props: ScrollAreaProps): ScrollAreaAPI;
}

/**
 * {@link ScrollAreaAPI} を作成するフックです。
 */
export const useScrollAreaAPI: IUseScrollAreaAPI = function useSuiScrollAreaAPI(props) {
  return new ScrollAreaAPI(props);
};

export { ScrollAreaAPI as API, useScrollAreaAPI as useAPI };

// Component
// ---------

/**
 * スクロール可能なコンテンツを表示するコンポーネントです。
 */
export const ScrollArea: IScrollArea = function SuiScrollArea(props) {
  const api = useScrollAreaAPI(props);
  const horizontalScrollbarProps = api.getHorizontalScrollbarProps();
  const horizontalThumbProps = api.getHorizontalThumbProps();

  return (
    <ScrollAreaRoot {...api.getRootProps()}>
      <ScrollAreaViewport {...api.getViewportProps()}>
        <ScrollAreaContent {...api.getContentProps()} />
      </ScrollAreaViewport>
      <ScrollAreaScrollbar {...api.getScrollbarProps()}>
        <ScrollAreaThumb {...api.getThumbProps()} />
      </ScrollAreaScrollbar>
      {horizontalScrollbarProps && (
        <ScrollAreaScrollbar {...horizontalScrollbarProps}>
          {horizontalThumbProps && <ScrollAreaThumb {...horizontalThumbProps} />}
        </ScrollAreaScrollbar>
      )}
      <ScrollAreaCorner {...api.getCornerProps()} />
    </ScrollAreaRoot>
  );
};

export namespace ScrollArea {
  export type State = ScrollAreaState;

  export type Props = ScrollAreaProps;

  export type SlotProps = ScrollAreaSlotProps;
}
