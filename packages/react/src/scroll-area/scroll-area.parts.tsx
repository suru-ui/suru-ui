import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./scroll-area.css";

// Root
// ----

/**
 * {@link ScrollAreaRoot} が持つ状態です。
 */
export type ScrollAreaRootState = BaseScrollArea.Root.State;

/**
 * {@link ScrollAreaRoot} に渡す props です。
 */
export type ScrollAreaRootProps = React.ComponentProps<typeof BaseScrollArea.Root>;

/**
 * スクロール領域の各パーツをまとめるルート要素です。
 */
export const ScrollAreaRoot: IComponent<ScrollAreaRootProps> = function SuiScrollAreaRoot(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  return (
    <BaseScrollArea.Root
      {...otherProps}
      className={cn(
        className,
        "sui_scroll_area",
        (state) => state.scrolling && "sui_scroll_area-scrolling",
        (state) => state.hasOverflowX && "sui_scroll_area-has_overflow_x",
        (state) => state.hasOverflowY && "sui_scroll_area-has_overflow_y",
      )}
      data-scope={dataScope}
    />
  );
};

export { ScrollAreaRoot as Root };

export namespace Root {
  /**
   * {@link ScrollAreaRootState}
   */
  export type State = ScrollAreaRootState;

  /**
   * {@link ScrollAreaRootProps}
   */
  export type Props = ScrollAreaRootProps;
}

// Viewport
// --------

/**
 * {@link ScrollAreaViewport} が持つ状態です。
 */
export type ScrollAreaViewportState = BaseScrollArea.Viewport.State;

/**
 * {@link ScrollAreaViewport} に渡す props です。
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

export { ScrollAreaViewport as Viewport };

export namespace Viewport {
  /**
   * {@link ScrollAreaViewportState}
   */
  export type State = ScrollAreaViewportState;

  /**
   * {@link ScrollAreaViewportProps}
   */
  export type Props = ScrollAreaViewportProps;
}

// Content
// -------

/**
 * {@link ScrollAreaContent} が持つ状態です。
 */
export type ScrollAreaContentState = BaseScrollArea.Content.State;

/**
 * {@link ScrollAreaContent} に渡す props です。
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

export { ScrollAreaContent as Content };

export namespace Content {
  /**
   * {@link ScrollAreaContentState}
   */
  export type State = ScrollAreaContentState;

  /**
   * {@link ScrollAreaContentProps}
   */
  export type Props = ScrollAreaContentProps;
}

// Scrollbar
// ---------

/**
 * {@link ScrollAreaScrollbar} が持つ状態です。
 */
export type ScrollAreaScrollbarState = BaseScrollArea.Scrollbar.State;

/**
 * {@link ScrollAreaScrollbar} に渡す props です。
 */
export type ScrollAreaScrollbarProps = React.ComponentProps<typeof BaseScrollArea.Scrollbar>;

/**
 * スクロール可能な方向とスクロール位置を示すバー要素です。
 *
 * 子要素として {@link ScrollAreaThumb} を配置します。
 */
export const ScrollAreaScrollbar: IComponent<ScrollAreaScrollbarProps> =
  function SuiScrollAreaScrollbar(props) {
    const { className, orientation = "vertical", ...otherProps } = props;
    return (
      <BaseScrollArea.Scrollbar
        {...otherProps}
        className={cn(
          className,
          "sui_scroll_area_scrollbar",
          `sui_scroll_area_scrollbar-orientation_${orientation}`,
        )}
        orientation={orientation}
      />
    );
  };

export { ScrollAreaScrollbar as Scrollbar };

export namespace Scrollbar {
  /**
   * {@link ScrollAreaScrollbarState}
   */
  export type State = ScrollAreaScrollbarState;

  /**
   * {@link ScrollAreaScrollbarProps}
   */
  export type Props = ScrollAreaScrollbarProps;
}

// Thumb
// -----

/**
 * {@link ScrollAreaThumb} が持つ状態です。
 */
export type ScrollAreaThumbState = BaseScrollArea.Thumb.State;

/**
 * {@link ScrollAreaThumb} に渡す props です。
 */
export type ScrollAreaThumbProps = React.ComponentProps<typeof BaseScrollArea.Thumb>;

/**
 * スクロール位置とスクロール可能な範囲を示す、スクロールバー内のつまみ要素です。
 */
export const ScrollAreaThumb: IComponent<ScrollAreaThumbProps> = function SuiScrollAreaThumb(
  props,
) {
  const { className, ...otherProps } = props;
  return (
    <BaseScrollArea.Thumb
      {...otherProps}
      className={cn(
        className,
        "sui_scroll_area_thumb",
        (state) => `sui_scroll_area_thumb-orientation_${state.orientation}`,
      )}
    />
  );
};

export { ScrollAreaThumb as Thumb };

export namespace Thumb {
  /**
   * {@link ScrollAreaThumbState}
   */
  export type State = ScrollAreaThumbState;

  /**
   * {@link ScrollAreaThumbProps}
   */
  export type Props = ScrollAreaThumbProps;
}

// Corner
// ------

/**
 * {@link ScrollAreaCorner} が持つ状態です。
 */
export type ScrollAreaCornerState = BaseScrollArea.Corner.State;

/**
 * {@link ScrollAreaCorner} に渡す props です。
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

export { ScrollAreaCorner as Corner };

export namespace Corner {
  /**
   * {@link ScrollAreaCornerState}
   */
  export type State = ScrollAreaCornerState;

  /**
   * {@link ScrollAreaCornerProps}
   */
  export type Props = ScrollAreaCornerProps;
}
