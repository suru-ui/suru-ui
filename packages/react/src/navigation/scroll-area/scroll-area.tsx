import * as React from "react";

import type { IComponent } from "../../types.js";
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

/**
 * {@link ScrollArea} の各パーツに渡すプロパティーです。
 *
 * 各パーツの指定値は、パーツに渡される既定のプロパティーより優先されます。
 */
export type ScrollAreaSlotProps = {
  /**
   * {@link ScrollAreaContent|Content} に渡すプロパティーです。
   */
  readonly content?: ScrollAreaContentProps | undefined;

  /**
   * {@link ScrollAreaCorner|Corner} に渡すプロパティーです。
   */
  readonly corner?: ScrollAreaCornerProps | undefined;

  /**
   * 水平方向の {@link ScrollAreaScrollbar|Scrollbar} に渡すプロパティーです。
   */
  readonly horizontalScrollbar?: ScrollAreaScrollbarProps | undefined;

  /**
   * 水平方向の {@link ScrollAreaThumb|Thumb} に渡すプロパティーです。
   */
  readonly horizontalThumb?: ScrollAreaThumbProps | undefined;

  /**
   * {@link ScrollAreaScrollbar|Scrollbar} に渡すプロパティーです。
   */
  readonly scrollbar?: ScrollAreaScrollbarProps | undefined;

  /**
   * {@link ScrollAreaThumb|Thumb} に渡すプロパティーです。
   */
  readonly thumb?: ScrollAreaThumbProps | undefined;

  /**
   * {@link ScrollAreaViewport|Viewport} に渡すプロパティーです。
   */
  readonly viewport?: ScrollAreaViewportProps | undefined;
};

/**
 * {@link ScrollArea} の状態です。
 */
export type ScrollAreaState = ScrollAreaRootState;

/**
 * {@link ScrollArea} コンポーネントのプロパティーです。
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
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     */
    slotProps?: ScrollAreaSlotProps | undefined;
  };

/**
 * スクロール可能なコンテンツを表示するコンポーネントです。
 */
export const ScrollArea: IComponent<ScrollAreaProps> = function SuiScrollArea(props) {
  const {
    children,
    slotProps: {
      thumb: thumbProps,
      corner: cornerProps,
      content: contentProps,
      viewport: viewportProps,
      scrollbar: scrollbarProps,
      horizontalThumb: horizontalThumbProps,
      horizontalScrollbar: horizontalScrollbarProps,
    } = {},
    horizontal = false,
    ...rootProps
  } = props;

  return (
    <ScrollAreaRoot {...rootProps}>
      <ScrollAreaViewport {...viewportProps}>
        <ScrollAreaContent {...contentProps}>{children}</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar {...scrollbarProps}>
        <ScrollAreaThumb {...thumbProps} />
      </ScrollAreaScrollbar>
      {horizontal && (
        <ScrollAreaScrollbar {...horizontalScrollbarProps} orientation="horizontal">
          <ScrollAreaThumb {...horizontalThumbProps} />
        </ScrollAreaScrollbar>
      )}
      <ScrollAreaCorner {...cornerProps} />
    </ScrollAreaRoot>
  );
};

/**
 * {@link ScrollArea} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ScrollArea {
  /**
   * {@link ScrollAreaState} です。
   */
  export type State = ScrollAreaState;

  /**
   * {@link ScrollAreaProps} です。
   */
  export type Props = ScrollAreaProps;

  /**
   * {@link ScrollAreaSlotProps} です。
   */
  export type SlotProps = ScrollAreaSlotProps;
}
