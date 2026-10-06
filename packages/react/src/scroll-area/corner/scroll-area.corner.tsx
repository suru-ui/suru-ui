import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link ScrollAreaCorner} が持つ状態です。
 */
export type ScrollAreaCornerState = BaseScrollArea.Corner.State;

export namespace ScrollAreaCornerProps {
  export type Render = RenderProps<ScrollAreaCornerState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseScrollArea.Corner>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ScrollAreaCornerProps より:
      never
    >,
    keyof Render | keyof SuruUI
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

export type IScrollAreaCorner = IComponent<ScrollAreaCornerProps>;

/**
 * 水平スクロールバーと垂直スクロールバーの交差部分を埋める要素です。
 */
export const ScrollAreaCorner: IScrollAreaCorner = function SuiScrollAreaCorner(props) {
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
