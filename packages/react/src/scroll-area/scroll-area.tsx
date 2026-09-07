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
} from "./scroll-area.parts.jsx";

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
  readonly horizontalScrollbar?: Omit<ScrollAreaScrollbarProps, "orientation"> | undefined;

  /**
   * 水平方向の {@link ScrollAreaThumb} に渡す props です。
   */
  readonly horizontalThumb?: ScrollAreaThumbProps | undefined;

  /**
   * {@link ScrollAreaScrollbar} に渡す props です。
   */
  readonly scrollbar?: Omit<ScrollAreaScrollbarProps, "orientation"> | undefined;

  /**
   * {@link ScrollAreaThumb} に渡す props です。
   */
  readonly thumb?: ScrollAreaThumbProps | undefined;

  /**
   * {@link ScrollAreaViewport} に渡す props です。
   */
  readonly viewport?: ScrollAreaViewportProps | undefined;
};

/**
 * {@link ScrollArea} が持つ状態です。
 */
export type ScrollAreaState = ScrollAreaRootState;

/**
 * {@link ScrollArea} に渡す props です。
 */
export type ScrollAreaProps = Omit<ScrollAreaRootProps, "children"> &
  Pick<ScrollAreaContentProps, "children"> & {
    /**
     * 水平方向のスクロールバーを表示するかどうかを指定します。
     *
     * @default false
     */
    horizontal?: boolean | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     *
     * 各パーツの props が優先されます。
     */
    slotProps?: ScrollAreaSlotProps | undefined;
  };

// API
// ---

/**
 * {@link ScrollArea} を構成する各パーツの props を作成するための API です。
 */
export interface ScrollAreaAPI {
  /**
   * {@link ScrollAreaContent} に渡す props を取得します。
   */
  getContentProps(): ScrollAreaContentProps;

  /**
   * {@link ScrollAreaCorner} に渡す props を取得します。
   */
  getCornerProps(): ScrollAreaCornerProps;

  /**
   * 水平方向の {@link ScrollAreaScrollbar} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getHorizontalScrollbarProps(): ScrollAreaScrollbarProps | null;

  /**
   * 水平方向の {@link ScrollAreaThumb} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getHorizontalThumbProps(): ScrollAreaThumbProps | null;

  /**
   * {@link ScrollAreaRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<ScrollAreaRootProps, "children">;

  /**
   * {@link ScrollAreaScrollbar} に渡す props を取得します。
   */
  getScrollbarProps(): ScrollAreaScrollbarProps;

  /**
   * {@link ScrollAreaThumb} に渡す props を取得します。
   */
  getThumbProps(): ScrollAreaThumbProps;

  /**
   * {@link ScrollAreaViewport} に渡す props を取得します。
   */
  getViewportProps(): ScrollAreaViewportProps;
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
  const {
    children,
    horizontal = false,
    slotProps: {
      thumb: thumbProps = {},
      corner: cornerProps = {},
      content: contentProps = {},
      viewport: viewportProps = {},
      scrollbar: scrollbarProps = {},
      horizontalThumb: horizontalThumbProps = {},
      horizontalScrollbar: horizontalScrollbarProps = {},
    } = {},
    ...otherRootProps
  } = props;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getThumbProps() {
      return thumbProps;
    },
    getCornerProps() {
      return cornerProps;
    },
    getContentProps() {
      return {
        ...contentProps,
        children,
      };
    },
    getScrollbarProps() {
      return {
        ...scrollbarProps,
        orientation: "vertical",
      };
    },
    getViewportProps() {
      return viewportProps;
    },
    getHorizontalThumbProps() {
      return horizontal ? horizontalThumbProps : null;
    },
    getHorizontalScrollbarProps() {
      return horizontal ? { ...horizontalScrollbarProps, orientation: "horizontal" } : null;
    },
  };
};

export { type ScrollAreaAPI as API, useScrollAreaAPI as useAPI };

// Component
// ---------

/**
 * スクロール可能なコンテンツを表示するコンポーネントです。
 */
export const ScrollArea: IComponent<ScrollAreaProps> = function SuiScrollArea(
  props: ScrollAreaProps,
) {
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
  /**
   * {@link ScrollAreaState}
   */
  export type State = ScrollAreaState;

  /**
   * {@link ScrollAreaProps}
   */
  export type Props = ScrollAreaProps;

  /**
   * {@link ScrollAreaSlotProps}
   */
  export type SlotProps = ScrollAreaSlotProps;
}
