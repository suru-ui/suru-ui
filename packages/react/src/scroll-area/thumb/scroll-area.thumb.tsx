import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

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

export type IScrollAreaThumb = IComponent<ScrollAreaThumbProps>;

/**
 * スクロール位置とスクロール可能な範囲を示す、スクロールバー内のつまみ要素です。
 */
export const ScrollAreaThumb: IScrollAreaThumb = function SuiScrollAreaThumb(props) {
  const { className, ...otherProps } = props;
  return (
    <BaseScrollArea.Thumb
      {...otherProps}
      className={cn(
        className,
        "sui_scroll_area_thumb",
        (state) => `sui_scroll_area_thumb-orientation_${state.orientation}`,
        (state) => state.scrolling && "sui_scroll_area_thumb-scrolling",
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
