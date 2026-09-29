import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link HoverCardContent} が持つ状態です。
 */
export type HoverCardContentState = PreviewCard.Popup.State;

export namespace HoverCardContentProps {
  export type Render = RenderProps<HoverCardContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardPopupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardContent} に渡す props です。
 */
export type HoverCardContentProps = HoverCardContentProps.Render &
  HoverCardContentProps.SuruUI &
  HoverCardContentProps.BaseUI &
  HoverCardContentProps.HTML;

export type IHoverCardContent = IComponent<HoverCardContentProps>;

/**
 * ホバーカードの内容を表示するポップアップ要素です。
 */
export const HoverCardContent: IHoverCardContent = function SuiHoverCardContent(props) {
  const { className, ...otherProps } = props;

  return (
    <PreviewCard.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_hover_card_content",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_hover_card_content-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { HoverCardContent as Content };

export namespace Content {
  export type State = HoverCardContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardContentProps.Render;

    export type SuruUI = HoverCardContentProps.SuruUI;

    export type BaseUI = HoverCardContentProps.BaseUI;

    export type HTML = HoverCardContentProps.HTML;
  }
}
