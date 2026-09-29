import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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

export type IScrollAreaContent = IComponent<ScrollAreaContentProps>;

/**
 * ビューポート内でスクロールされるコンテンツを保持する要素です。
 */
export const ScrollAreaContent: IScrollAreaContent = function SuiScrollAreaContent(props) {
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
