import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./scroll-area.css";

// Root
// ----

/**
 * {@link ScrollAreaRoot} が持つ状態です。
 */
export type ScrollAreaRootState = BaseScrollArea.Root.State;

export namespace ScrollAreaRootProps {
  export type BaseUI = Omit<React.ComponentProps<typeof BaseScrollArea.Root>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof BaseScrollArea.Root>
  >;

  export type Render = RenderProps<ScrollAreaRootState>;

  export type SuruUI = {};
}

/**
 * {@link ScrollAreaRoot} に渡す props です。
 */
export type ScrollAreaRootProps = ScrollAreaRootProps.Render &
  ScrollAreaRootProps.SuruUI &
  ScrollAreaRootProps.BaseUI &
  ScrollAreaRootProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ScrollAreaRootProps.BaseUI;
    export type HTML = ScrollAreaRootProps.HTML;
    export type Render = ScrollAreaRootProps.Render;
    export type SuruUI = ScrollAreaRootProps.SuruUI;
  }
}

// Viewport
// --------

/**
 * {@link ScrollAreaViewport} が持つ状態です。
 */
export type ScrollAreaViewportState = BaseScrollArea.Viewport.State;

export namespace ScrollAreaViewportProps {
  export type BaseUI = Omit<React.ComponentProps<typeof BaseScrollArea.Viewport>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof BaseScrollArea.Viewport>
  >;

  export type Render = RenderProps<ScrollAreaViewportState>;

  export type SuruUI = {};
}

/**
 * {@link ScrollAreaViewport} に渡す props です。
 */
export type ScrollAreaViewportProps = ScrollAreaViewportProps.Render &
  ScrollAreaViewportProps.SuruUI &
  ScrollAreaViewportProps.BaseUI &
  ScrollAreaViewportProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ScrollAreaViewportProps.BaseUI;
    export type HTML = ScrollAreaViewportProps.HTML;
    export type Render = ScrollAreaViewportProps.Render;
    export type SuruUI = ScrollAreaViewportProps.SuruUI;
  }
}

// Content
// -------

/**
 * {@link ScrollAreaContent} が持つ状態です。
 */
export type ScrollAreaContentState = BaseScrollArea.Content.State;

export namespace ScrollAreaContentProps {
  export type BaseUI = Omit<React.ComponentProps<typeof BaseScrollArea.Content>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof BaseScrollArea.Content>
  >;

  export type Render = RenderProps<ScrollAreaContentState>;

  export type SuruUI = {};
}

/**
 * {@link ScrollAreaContent} に渡す props です。
 */
export type ScrollAreaContentProps = ScrollAreaContentProps.Render &
  ScrollAreaContentProps.SuruUI &
  ScrollAreaContentProps.BaseUI &
  ScrollAreaContentProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ScrollAreaContentProps.BaseUI;
    export type HTML = ScrollAreaContentProps.HTML;
    export type Render = ScrollAreaContentProps.Render;
    export type SuruUI = ScrollAreaContentProps.SuruUI;
  }
}

// Scrollbar
// ---------

/**
 * {@link ScrollAreaScrollbar} が持つ状態です。
 */
export type ScrollAreaScrollbarState = BaseScrollArea.Scrollbar.State;

export namespace ScrollAreaScrollbarProps {
  export type BaseUI = Omit<React.ComponentProps<typeof BaseScrollArea.Scrollbar>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof BaseScrollArea.Scrollbar>
  >;

  export type Render = RenderProps<ScrollAreaScrollbarState>;

  export type SuruUI = {};
}

/**
 * {@link ScrollAreaScrollbar} に渡す props です。
 */
export type ScrollAreaScrollbarProps = ScrollAreaScrollbarProps.Render &
  ScrollAreaScrollbarProps.SuruUI &
  ScrollAreaScrollbarProps.BaseUI &
  ScrollAreaScrollbarProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ScrollAreaScrollbarProps.BaseUI;
    export type HTML = ScrollAreaScrollbarProps.HTML;
    export type Render = ScrollAreaScrollbarProps.Render;
    export type SuruUI = ScrollAreaScrollbarProps.SuruUI;
  }
}

// Thumb
// -----

/**
 * {@link ScrollAreaThumb} が持つ状態です。
 */
export type ScrollAreaThumbState = BaseScrollArea.Thumb.State;

export namespace ScrollAreaThumbProps {
  export type BaseUI = Omit<React.ComponentProps<typeof BaseScrollArea.Thumb>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof BaseScrollArea.Thumb>
  >;

  export type Render = RenderProps<ScrollAreaThumbState>;

  export type SuruUI = {};
}

/**
 * {@link ScrollAreaThumb} に渡す props です。
 */
export type ScrollAreaThumbProps = ScrollAreaThumbProps.Render &
  ScrollAreaThumbProps.SuruUI &
  ScrollAreaThumbProps.BaseUI &
  ScrollAreaThumbProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ScrollAreaThumbProps.BaseUI;
    export type HTML = ScrollAreaThumbProps.HTML;
    export type Render = ScrollAreaThumbProps.Render;
    export type SuruUI = ScrollAreaThumbProps.SuruUI;
  }
}

// Corner
// ------

/**
 * {@link ScrollAreaCorner} が持つ状態です。
 */
export type ScrollAreaCornerState = BaseScrollArea.Corner.State;

export namespace ScrollAreaCornerProps {
  export type BaseUI = Omit<React.ComponentProps<typeof BaseScrollArea.Corner>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof BaseScrollArea.Corner>
  >;

  export type Render = RenderProps<ScrollAreaCornerState>;

  export type SuruUI = {};
}

/**
 * {@link ScrollAreaCorner} に渡す props です。
 */
export type ScrollAreaCornerProps = ScrollAreaCornerProps.Render &
  ScrollAreaCornerProps.SuruUI &
  ScrollAreaCornerProps.BaseUI &
  ScrollAreaCornerProps.HTML;

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
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ScrollAreaCornerProps.BaseUI;
    export type HTML = ScrollAreaCornerProps.HTML;
    export type Render = ScrollAreaCornerProps.Render;
    export type SuruUI = ScrollAreaCornerProps.SuruUI;
  }
}
