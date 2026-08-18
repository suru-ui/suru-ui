import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./scroll-area.css";

// Types
// -----

// Root
// ----

/**
 * スクロール領域のルート要素の状態です。
 */
export type ScrollAreaRootState = BaseScrollArea.Root.State;

/**
 * スクロール領域のルート要素に渡すプロパティーです。
 */
export type ScrollAreaRootProps = React.ComponentProps<typeof BaseScrollArea.Root>;

/**
 * スクロール領域の各パーツをまとめるルート要素です。
 */
export const ScrollAreaRoot: IComponent<ScrollAreaRootProps> = function SuiScrollAreaRoot(props) {
  const { className, ...otherProps } = props;
  return <BaseScrollArea.Root {...otherProps} className={cn(className, "sui_scroll_area")} />;
};

export namespace Root {
  /**
   * {@link ScrollAreaRoot} の状態型です。
   */
  export type State = ScrollAreaRootState;

  /**
   * {@link ScrollAreaRoot} のプロパティー型です。
   */
  export type Props = ScrollAreaRootProps;
}

/**
 * {@link ScrollAreaRoot} の別名です。
 */
export const Root: IComponent<Root.Props> = ScrollAreaRoot;

// Viewport
// --------

/**
 * スクロール可能な領域を提供するビューポート要素の状態です。
 */
export type ScrollAreaViewportState = BaseScrollArea.Viewport.State;

/**
 * スクロール可能な領域を提供するビューポート要素に渡すプロパティーです。
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

export namespace Viewport {
  /**
   * {@link ScrollAreaViewport} の状態型です。
   */
  export type State = ScrollAreaViewportState;

  /**
   * {@link ScrollAreaViewport} のプロパティー型です。
   */
  export type Props = ScrollAreaViewportProps;
}

/**
 * {@link ScrollAreaViewport} の別名です。
 */
export const Viewport: IComponent<Viewport.Props> = ScrollAreaViewport;

// Content
// -------

/**
 * スクロール領域内に表示するコンテンツ要素の状態です。
 */
export type ScrollAreaContentState = BaseScrollArea.Content.State;

/**
 * スクロール領域内に表示するコンテンツ要素に渡すプロパティーです。
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

export namespace Content {
  /**
   * {@link ScrollAreaContent} の状態型です。
   */
  export type State = ScrollAreaContentState;

  /**
   * {@link ScrollAreaContent} のプロパティー型です。
   */
  export type Props = ScrollAreaContentProps;
}

/**
 * {@link ScrollAreaContent} の別名です。
 */
export const Content: IComponent<Content.Props> = ScrollAreaContent;

// Scrollbar
// ---------

/**
 * スクロールバー要素の状態です。
 */
export type ScrollAreaScrollbarState = BaseScrollArea.Scrollbar.State;

/**
 * スクロールバー要素に渡すプロパティーです。
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

export namespace Scrollbar {
  /**
   * {@link ScrollAreaScrollbar} の状態型です。
   */
  export type State = ScrollAreaScrollbarState;

  /**
   * {@link ScrollAreaScrollbar} のプロパティー型です。
   */
  export type Props = ScrollAreaScrollbarProps;
}

/**
 * {@link ScrollAreaScrollbar} の別名です。
 */
export const Scrollbar: IComponent<Scrollbar.Props> = ScrollAreaScrollbar;

// Thumb
// -----

/**
 * スクロールバー内のつまみ要素の状態です。
 */
export type ScrollAreaThumbState = BaseScrollArea.Thumb.State;

/**
 * スクロールバー内のつまみ要素に渡すプロパティーです。
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

export namespace Thumb {
  /**
   * {@link ScrollAreaThumb} の状態型です。
   */
  export type State = ScrollAreaThumbState;

  /**
   * {@link ScrollAreaThumb} のプロパティー型です。
   */
  export type Props = ScrollAreaThumbProps;
}

/**
 * {@link ScrollAreaThumb} の別名です。
 */
export const Thumb: IComponent<Thumb.Props> = ScrollAreaThumb;

type ScrollAreaDataAttributes = {
  [attribute: `data-${string}`]: string | undefined;
};

// Corner
// ------

/**
 * 水平スクロールバーと垂直スクロールバーが交差する角の状態です。
 */
export type ScrollAreaCornerState = BaseScrollArea.Corner.State;

/**
 * 水平スクロールバーと垂直スクロールバーが交差する角に渡すプロパティーです。
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

export namespace Corner {
  /**
   * {@link ScrollAreaCorner} の状態型です。
   */
  export type State = ScrollAreaCornerState;

  /**
   * {@link ScrollAreaCorner} のプロパティー型です。
   */
  export type Props = ScrollAreaCornerProps;
}

/**
 * {@link ScrollAreaCorner} の別名です。
 */
export const Corner: IComponent<Corner.Props> = ScrollAreaCorner;
