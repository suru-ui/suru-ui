import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./scroll-area.css";

// Root
// ----

/**
 * {@link ScrollAreaRoot} の状態です。
 */
export type ScrollAreaRootState = BaseScrollArea.Root.State;

/**
 * {@link ScrollAreaRoot} に渡すプロパティーです。
 */
export type ScrollAreaRootProps = React.ComponentProps<typeof BaseScrollArea.Root>;

/**
 * スクロール領域の各パーツをまとめるルート要素です。
 */
export const ScrollAreaRoot: IComponent<ScrollAreaRootProps> = function SuiScrollAreaRoot(props) {
  const { className, ...otherProps } = props;
  return <BaseScrollArea.Root {...otherProps} className={cn(className, "sui_scroll_area")} />;
};

/**
 * {@link ScrollAreaRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ScrollAreaRootState} です。
   */
  export type State = ScrollAreaRootState;

  /**
   * {@link ScrollAreaRootProps} です。
   */
  export type Props = ScrollAreaRootProps;
}

/**
 * {@link ScrollAreaRoot} です。
 */
export const Root: IComponent<Root.Props> = ScrollAreaRoot;

// Viewport
// --------

/**
 * {@link ScrollAreaViewport} の状態です。
 */
export type ScrollAreaViewportState = BaseScrollArea.Viewport.State;

/**
 * {@link ScrollAreaViewport} に渡すプロパティーです。
 */
export type ScrollAreaViewportProps = React.ComponentProps<typeof BaseScrollArea.Viewport>;

/**
 * コンテンツをクリップし、スクロール操作を受け付けるビューポート要素です。
 */
export const ScrollAreaViewport: IComponent<ScrollAreaViewportProps> =
  function SuiScrollAreaViewport(props) {
    const { className, ...otherProps } = props;
    return (
      <BaseScrollArea.Viewport
        {...otherProps}
        className={cn(className, "sui_scroll_area_viewport")}
      />
    );
  };

/**
 * {@link ScrollAreaViewport} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Viewport {
  /**
   * {@link ScrollAreaViewportState} です。
   */
  export type State = ScrollAreaViewportState;

  /**
   * {@link ScrollAreaViewportProps} です。
   */
  export type Props = ScrollAreaViewportProps;
}

/**
 * {@link ScrollAreaViewport} です。
 */
export const Viewport: IComponent<Viewport.Props> = ScrollAreaViewport;

// Content
// -------

/**
 * {@link ScrollAreaContent} の状態です。
 */
export type ScrollAreaContentState = BaseScrollArea.Content.State;

/**
 * {@link ScrollAreaContent} に渡すプロパティーです。
 */
export type ScrollAreaContentProps = React.ComponentProps<typeof BaseScrollArea.Content>;

/**
 * ビューポート内でスクロールされるコンテンツを保持する要素です。
 */
export const ScrollAreaContent: IComponent<ScrollAreaContentProps> = function SuiScrollAreaContent(
  props,
) {
  const { className, ...otherProps } = props;
  return (
    <BaseScrollArea.Content {...otherProps} className={cn(className, "sui_scroll_area_content")} />
  );
};

/**
 * {@link ScrollAreaContent} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Content {
  /**
   * {@link ScrollAreaContentState} です。
   */
  export type State = ScrollAreaContentState;

  /**
   * {@link ScrollAreaContentProps} です。
   */
  export type Props = ScrollAreaContentProps;
}

/**
 * {@link ScrollAreaContent} です。
 */
export const Content: IComponent<Content.Props> = ScrollAreaContent;

// Scrollbar
// ---------

/**
 * {@link ScrollAreaScrollbar} の状態です。
 */
export type ScrollAreaScrollbarState = BaseScrollArea.Scrollbar.State;

/**
 * {@link ScrollAreaScrollbar} に渡すプロパティーです。
 */
export type ScrollAreaScrollbarProps = React.ComponentProps<typeof BaseScrollArea.Scrollbar> &
  ScrollAreaDataAttributes;

/**
 * スクロール可能な方向とスクロール位置を示すバー要素です。
 *
 * 子要素として {@link ScrollAreaThumb} を配置します。
 */
export const ScrollAreaScrollbar: IComponent<ScrollAreaScrollbarProps> =
  function SuiScrollAreaScrollbar(props) {
    const { className, ...otherProps } = props;
    return (
      <BaseScrollArea.Scrollbar
        {...otherProps}
        className={cn(className, "sui_scroll_area_scrollbar")}
      />
    );
  };

/**
 * {@link ScrollAreaScrollbar} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Scrollbar {
  /**
   * {@link ScrollAreaScrollbarState} です。
   */
  export type State = ScrollAreaScrollbarState;

  /**
   * {@link ScrollAreaScrollbarProps} です。
   */
  export type Props = ScrollAreaScrollbarProps;
}

/**
 * {@link ScrollAreaScrollbar} です。
 */
export const Scrollbar: IComponent<Scrollbar.Props> = ScrollAreaScrollbar;

// Thumb
// -----

/**
 * {@link ScrollAreaThumb} の状態です。
 */
export type ScrollAreaThumbState = BaseScrollArea.Thumb.State;

/**
 * {@link ScrollAreaThumb} に渡すプロパティーです。
 */
export type ScrollAreaThumbProps = React.ComponentProps<typeof BaseScrollArea.Thumb> &
  ScrollAreaDataAttributes;

/**
 * スクロール位置とスクロール可能な範囲を示す、スクロールバー内のつまみ要素です。
 */
export const ScrollAreaThumb: IComponent<ScrollAreaThumbProps> = function SuiScrollAreaThumb(
  props,
) {
  const { className, ...otherProps } = props;
  return (
    <BaseScrollArea.Thumb {...otherProps} className={cn(className, "sui_scroll_area_thumb")} />
  );
};

/**
 * {@link ScrollAreaThumb} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Thumb {
  /**
   * {@link ScrollAreaThumbState} です。
   */
  export type State = ScrollAreaThumbState;

  /**
   * {@link ScrollAreaThumbProps} です。
   */
  export type Props = ScrollAreaThumbProps;
}

/**
 * {@link ScrollAreaThumb} です。
 */
export const Thumb: IComponent<Thumb.Props> = ScrollAreaThumb;

type ScrollAreaDataAttributes = {
  [attribute: `data-${string}`]: string | undefined;
};

// Corner
// ------

/**
 * {@link ScrollAreaCorner} の状態です。
 */
export type ScrollAreaCornerState = BaseScrollArea.Corner.State;

/**
 * {@link ScrollAreaCorner} に渡すプロパティーです。
 */
export type ScrollAreaCornerProps = React.ComponentProps<typeof BaseScrollArea.Corner>;

/**
 * 水平スクロールバーと垂直スクロールバーの交差部分を埋める要素です。
 */
export const ScrollAreaCorner: IComponent<ScrollAreaCornerProps> = function SuiScrollAreaCorner(
  props,
) {
  const { className, ...otherProps } = props;
  return (
    <BaseScrollArea.Corner {...otherProps} className={cn(className, "sui_scroll_area_corner")} />
  );
};

/**
 * {@link ScrollAreaCorner} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Corner {
  /**
   * {@link ScrollAreaCornerState} です。
   */
  export type State = ScrollAreaCornerState;

  /**
   * {@link ScrollAreaCornerProps} です。
   */
  export type Props = ScrollAreaCornerProps;
}

/**
 * {@link ScrollAreaCorner} です。
 */
export const Corner: IComponent<Corner.Props> = ScrollAreaCorner;
