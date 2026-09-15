import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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
