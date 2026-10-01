import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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

export type IScrollAreaRoot = IComponent<ScrollAreaRootProps>;

/**
 * スクロール領域の各パーツをまとめるルート要素です。
 */
export const ScrollAreaRoot: IScrollAreaRoot = function SuiScrollAreaRoot(props) {
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
        (state) => state.cornerHidden && "sui_scroll_area-corner_hidden",
        (state) => state.overflowXStart && "sui_scroll_area-overflow_x_start",
        (state) => state.overflowXEnd && "sui_scroll_area-overflow_x_end",
        (state) => state.overflowYStart && "sui_scroll_area-overflow_y_start",
        (state) => state.overflowYEnd && "sui_scroll_area-overflow_y_end",
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
