import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link ScrollAreaContent} が持つ状態です。
 */
export type ScrollAreaContentState = BaseScrollArea.Content.State;

export namespace ScrollAreaContentProps {
  export type Render = RenderProps<ScrollAreaContentState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseScrollArea.Content>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ScrollAreaContentProps より:
      never
    >,
    keyof Render | keyof SuruUI
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

export type IScrollAreaContent = IComponent<ScrollAreaContentProps>;

/**
 * ビューポート内でスクロールされるコンテンツを保持する要素です。
 */
export const ScrollAreaContent: IScrollAreaContent = function SuiScrollAreaContent(props) {
  const { className, ...otherProps } = props;
  return (
    <BaseScrollArea.Content
      {...otherProps}
      className={cn<ScrollAreaContentState>(
        className,
        "sui_scroll_area_content",
        (state) => state.scrolling && "sui_scroll_area_content-scrolling",
        (state) => state.cornerHidden && "sui_scroll_area_content-corner_hidden",
        (state) => state.hasOverflowX && "sui_scroll_area_content-has_overflow_x",
        (state) => state.hasOverflowY && "sui_scroll_area_content-has_overflow_y",
        (state) => state.overflowXStart && "sui_scroll_area_content-overflow_x_start",
        (state) => state.overflowXEnd && "sui_scroll_area_content-overflow_x_end",
        (state) => state.overflowYStart && "sui_scroll_area_content-overflow_y_start",
        (state) => state.overflowYEnd && "sui_scroll_area_content-overflow_y_end",
      )}
    />
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
