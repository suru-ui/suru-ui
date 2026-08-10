import * as React from "react";

import type { Component } from "../../types.js";
import * as ScrollAreaParts from "./scroll-area.parts.jsx";

/**
 * {@link ScrollArea} の各パーツに渡すプロパティーです。
 */
export type ScrollAreaSlotProps = {
  /**
   * {@link ScrollAreaParts.Viewport|Viewport} に渡すプロパティーです。
   */
  readonly viewport?: ScrollAreaParts.Viewport.Props | undefined;

  /**
   * {@link ScrollAreaParts.Content|Content} に渡すプロパティーです。
   */
  readonly content?: ScrollAreaParts.Content.Props | undefined;

  /**
   * {@link ScrollAreaParts.Scrollbar|Scrollbar} に渡すプロパティーです。
   */
  readonly scrollbar?: ScrollAreaParts.Scrollbar.Props | undefined;

  /**
   * 水平方向の {@link ScrollAreaParts.Scrollbar|Scrollbar} に渡すプロパティーです。
   */
  readonly horizontalScrollbar?: ScrollAreaParts.Scrollbar.Props | undefined;

  /**
   * {@link ScrollAreaParts.Thumb|Thumb} に渡すプロパティーです。
   */
  readonly thumb?: ScrollAreaParts.Thumb.Props | undefined;

  /**
   * 水平方向の {@link ScrollAreaParts.Thumb|Thumb} に渡すプロパティーです。
   */
  readonly horizontalThumb?: ScrollAreaParts.Thumb.Props | undefined;

  /**
   * {@link ScrollAreaParts.Corner|Corner} に渡すプロパティーです。
   */
  readonly corner?: ScrollAreaParts.Corner.Props | undefined;
};

/**
 * {@link ScrollArea} コンポーネントのプロパティーです。
 */
export type ScrollAreaProps = ScrollAreaParts.Root.Props & {
  /**
   * スクロール領域に表示するコンテンツです。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?: ScrollAreaSlotProps | undefined;

  /**
   * 水平方向のスクロールバーを表示するかどうかを指定します。
   *
   * @default false
   */
  horizontal?: boolean | undefined;
};

/**
 * スクロール可能なコンテンツを表示するコンポーネントです。
 *
 * @example
 * ```tsx
 * <ScrollArea style={{ maxHeight: 240 }}>長いコンテンツ</ScrollArea>
 * ```
 */
export const ScrollArea: Component<ScrollAreaProps> = function SuiScrollArea(props) {
  const {
    children,
    horizontal = false,
    slotProps: {
      viewport: viewportProps,
      content: contentProps,
      scrollbar: scrollbarProps,
      horizontalScrollbar: horizontalScrollbarProps,
      thumb: thumbProps,
      horizontalThumb: horizontalThumbProps,
      corner: cornerProps,
    } = {},
    ...rootProps
  } = props;

  return (
    <ScrollAreaParts.Root {...rootProps}>
      <ScrollAreaParts.Viewport {...viewportProps}>
        <ScrollAreaParts.Content {...contentProps}>{children}</ScrollAreaParts.Content>
      </ScrollAreaParts.Viewport>
      <ScrollAreaParts.Scrollbar {...scrollbarProps}>
        <ScrollAreaParts.Thumb {...thumbProps} />
      </ScrollAreaParts.Scrollbar>
      {horizontal && (
        <ScrollAreaParts.Scrollbar {...horizontalScrollbarProps} orientation="horizontal">
          <ScrollAreaParts.Thumb {...horizontalThumbProps} />
        </ScrollAreaParts.Scrollbar>
      )}
      <ScrollAreaParts.Corner {...cornerProps} />
    </ScrollAreaParts.Root>
  );
};
