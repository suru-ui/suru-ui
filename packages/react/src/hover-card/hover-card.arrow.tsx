import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link HoverCardArrow} が持つ状態です。
 */
export type HoverCardArrowState = PreviewCard.Arrow.State;

export namespace HoverCardArrowProps {
  export type Render = RenderProps<HoverCardArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardArrow} に渡す props です。
 */
export type HoverCardArrowProps = HoverCardArrowProps.Render &
  HoverCardArrowProps.SuruUI &
  HoverCardArrowProps.BaseUI &
  HoverCardArrowProps.HTML;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const HoverCardArrow: IComponent<HoverCardArrowProps> = function SuiHoverCardArrow(props) {
  const { className, ...otherProps } = props;

  return (
    <PreviewCard.Arrow
      {...otherProps}
      className={cn(
        className,
        "sui_hover_card_arrow",
        (state) => `sui_hover_card_arrow-side_${state.side}`,
      )}
    />
  );
};

export { HoverCardArrow as Arrow };

export namespace Arrow {
  export type State = HoverCardArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardArrowProps.Render;

    export type SuruUI = HoverCardArrowProps.SuruUI;

    export type BaseUI = HoverCardArrowProps.BaseUI;

    export type HTML = HoverCardArrowProps.HTML;
  }
}
