import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link HoverCardViewport} が持つ状態です。
 */
export type HoverCardViewportState = PreviewCard.Viewport.State;

export namespace HoverCardViewportProps {
  export type Render = RenderProps<HoverCardViewportState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardViewport} に渡す props です。
 */
export type HoverCardViewportProps = HoverCardViewportProps.Render &
  HoverCardViewportProps.SuruUI &
  HoverCardViewportProps.BaseUI &
  HoverCardViewportProps.HTML;

/**
 * 複数のトリガー間で内容を切り替えるときのアニメーション領域です。
 *
 * 1 つのホバーカードを複数のトリガーで共有し、内容をトリガーごとに変える場合に使います。
 */
export const HoverCardViewport: IComponent<HoverCardViewportProps> = function SuiHoverCardViewport(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <PreviewCard.Viewport {...otherProps} className={cn(className, "sui_hover_card_viewport")} />
  );
};

export { HoverCardViewport as Viewport };

export namespace Viewport {
  export type State = HoverCardViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardViewportProps.Render;

    export type SuruUI = HoverCardViewportProps.SuruUI;

    export type BaseUI = HoverCardViewportProps.BaseUI;

    export type HTML = HoverCardViewportProps.HTML;
  }
}
