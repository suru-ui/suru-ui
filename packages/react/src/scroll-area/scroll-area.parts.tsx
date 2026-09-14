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
  export type Render = RenderProps<ScrollAreaRootState>;

  export type SuruUI = {
    /**
     * スクロールバーを常に表示するかどうかを指定します。
     *
     * `false` のときは、スクロール領域をホバーするかスクロールするまでスクロールバーを非表示にします。
     *
     * @default false
     */
    alwaysShowScrollbar?: boolean | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseScrollArea.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ScrollAreaRootProps:
      "overflowEdgeThreshold",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseScrollArea.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
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
    alwaysShowScrollbar = false,
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
        alwaysShowScrollbar && "sui_scroll_area-always_show_scrollbar",
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
  export type State = ScrollAreaRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ScrollAreaRootProps.Render;

    export type SuruUI = ScrollAreaRootProps.SuruUI;

    export type BaseUI = ScrollAreaRootProps.BaseUI;

    export type HTML = ScrollAreaRootProps.HTML;
  }
}

// Viewport
// --------

/**
 * {@link ScrollAreaViewport} が持つ状態です。
 */
export type ScrollAreaViewportState = BaseScrollArea.Viewport.State;

export namespace ScrollAreaViewportProps {
  export type Render = RenderProps<ScrollAreaViewportState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseScrollArea.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ScrollAreaViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseScrollArea.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
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
  export type State = ScrollAreaViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ScrollAreaViewportProps.Render;

    export type SuruUI = ScrollAreaViewportProps.SuruUI;

    export type BaseUI = ScrollAreaViewportProps.BaseUI;

    export type HTML = ScrollAreaViewportProps.HTML;
  }
}

// Content
// -------

/**
 * {@link ScrollAreaContent} が持つ状態です。
 */
export type ScrollAreaContentState = BaseScrollArea.Content.State;

export namespace ScrollAreaContentProps {
  export type Render = RenderProps<ScrollAreaContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseScrollArea.Content>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ScrollAreaContentProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseScrollArea.Content>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
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
  export type State = ScrollAreaContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ScrollAreaContentProps.Render;

    export type SuruUI = ScrollAreaContentProps.SuruUI;

    export type BaseUI = ScrollAreaContentProps.BaseUI;

    export type HTML = ScrollAreaContentProps.HTML;
  }
}

// Scrollbar
// ---------

/**
 * {@link ScrollAreaScrollbar} が持つ状態です。
 */
export type ScrollAreaScrollbarState = BaseScrollArea.Scrollbar.State;

export namespace ScrollAreaScrollbarProps {
  export type Render = RenderProps<ScrollAreaScrollbarState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseScrollArea.Scrollbar>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ScrollAreaScrollbarProps:
      "orientation" | "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseScrollArea.Scrollbar>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
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
    const { className, ...otherProps } = props;
    return (
      <BaseScrollArea.Scrollbar
        {...otherProps}
        className={cn(
          className,
          "sui_scroll_area_scrollbar",
          (state) => `sui_scroll_area_scrollbar-orientation_${state.orientation}`,
        )}
      />
    );
  };

export { ScrollAreaScrollbar as Scrollbar };

export namespace Scrollbar {
  export type State = ScrollAreaScrollbarState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ScrollAreaScrollbarProps.Render;

    export type SuruUI = ScrollAreaScrollbarProps.SuruUI;

    export type BaseUI = ScrollAreaScrollbarProps.BaseUI;

    export type HTML = ScrollAreaScrollbarProps.HTML;
  }
}

// Thumb
// -----

/**
 * {@link ScrollAreaThumb} が持つ状態です。
 */
export type ScrollAreaThumbState = BaseScrollArea.Thumb.State;

export namespace ScrollAreaThumbProps {
  export type Render = RenderProps<ScrollAreaThumbState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseScrollArea.Thumb>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ScrollAreaThumbProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseScrollArea.Thumb>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
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
  export type State = ScrollAreaThumbState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ScrollAreaThumbProps.Render;

    export type SuruUI = ScrollAreaThumbProps.SuruUI;

    export type BaseUI = ScrollAreaThumbProps.BaseUI;

    export type HTML = ScrollAreaThumbProps.HTML;
  }
}

// Corner
// ------

/**
 * {@link ScrollAreaCorner} が持つ状態です。
 */
export type ScrollAreaCornerState = BaseScrollArea.Corner.State;

export namespace ScrollAreaCornerProps {
  export type Render = RenderProps<ScrollAreaCornerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseScrollArea.Corner>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ScrollAreaCornerProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseScrollArea.Corner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
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
  export type State = ScrollAreaCornerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ScrollAreaCornerProps.Render;

    export type SuruUI = ScrollAreaCornerProps.SuruUI;

    export type BaseUI = ScrollAreaCornerProps.BaseUI;

    export type HTML = ScrollAreaCornerProps.HTML;
  }
}
