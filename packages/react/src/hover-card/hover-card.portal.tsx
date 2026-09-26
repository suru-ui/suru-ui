import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useHoverCardContext } from "./hover-card.context.js";

/**
 * {@link HoverCardPortal} が持つ状態です。
 */
export type HoverCardPortalState = PreviewCard.Portal.State;

export namespace HoverCardPortalProps {
  export type Render = RenderProps<HoverCardPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardPortal} に渡す props です。
 */
export type HoverCardPortalProps = HoverCardPortalProps.Render &
  HoverCardPortalProps.SuruUI &
  HoverCardPortalProps.BaseUI &
  HoverCardPortalProps.HTML;

/**
 * ホバーカードを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const HoverCardPortal: IComponent<HoverCardPortalProps> = function SuiHoverCardPortal(
  props,
) {
  const ctx = useHoverCardContext();
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <PreviewCard.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_hover_card_portal",
        `sui_hover_card_portal-size_${ctx.size}`,
        `sui_hover_card_portal-radius_${ctx.radius}`,
        ctx.outlined && "sui_hover_card_portal-outlined",
      )}
      data-scope={dataScope}
    />
  );
};

export { HoverCardPortal as Portal };

export namespace Portal {
  export type State = HoverCardPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardPortalProps.Render;

    export type SuruUI = HoverCardPortalProps.SuruUI;

    export type BaseUI = HoverCardPortalProps.BaseUI;

    export type HTML = HoverCardPortalProps.HTML;
  }
}
