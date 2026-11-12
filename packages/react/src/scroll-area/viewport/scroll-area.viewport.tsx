import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link ScrollAreaViewport} が持つ状態です。
 */
export type ScrollAreaViewportState = BaseScrollArea.Viewport.State;

export namespace ScrollAreaViewportProps {
  export type Render = RenderProps<ScrollAreaViewportState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseScrollArea.Viewport>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ScrollAreaViewportProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseScrollArea.Viewport>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link ScrollAreaViewport} に渡す props です。
 */
export type ScrollAreaViewportProps = ScrollAreaViewportProps.Render &
  ScrollAreaViewportProps.SuruUI &
  ScrollAreaViewportProps.BaseUI &
  ScrollAreaViewportProps.HTML;

export type IScrollAreaViewport = IComponent<ScrollAreaViewportProps>;

/** コンテンツをクリップし、スクロール操作を受け付けるビューポート要素です。 */
export const ScrollAreaViewport: IScrollAreaViewport = (props) => {
  const { className, ...otherProps } = props;

  return (
    <BaseScrollArea.Viewport
      {...otherProps}
      className={cn<ScrollAreaViewportState>(
        className,
        "sui_scroll_area_viewport",
        (state) => state.scrolling && "sui_scroll_area_viewport-scrolling",
        (state) => state.cornerHidden && "sui_scroll_area_viewport-corner_hidden",
        (state) => state.hasOverflowX && "sui_scroll_area_viewport-has_overflow_x",
        (state) => state.hasOverflowY && "sui_scroll_area_viewport-has_overflow_y",
        (state) => state.overflowXStart && "sui_scroll_area_viewport-overflow_x_start",
        (state) => state.overflowXEnd && "sui_scroll_area_viewport-overflow_x_end",
        (state) => state.overflowYStart && "sui_scroll_area_viewport-overflow_y_start",
        (state) => state.overflowYEnd && "sui_scroll_area_viewport-overflow_y_end",
      )}
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
