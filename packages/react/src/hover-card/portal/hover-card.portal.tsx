import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type HoverCardContext, useHoverCardContext } from "../root/hover-card.root.context.js";

/**
 * {@link HoverCardPortal} が持つ状態です。
 */
export type HoverCardPortalState = Override<HoverCardContext, PreviewCard.Portal.State>;

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

export type IHoverCardPortal = IComponent<HoverCardPortalProps>;

/**
 * ホバーカードを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const HoverCardPortal: IHoverCardPortal = function SuiHoverCardPortal(props) {
  const ctx = useHoverCardContext();
  const {
    style,
    render,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <PreviewCard.Portal
      {...otherProps}
      {...proxyRenderProps<PreviewCard.Portal.State, HoverCardPortalState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<HoverCardPortalState>(
            className,
            "sui_hover_card_portal",
            (state) => `sui_hover_card_portal-size_${state.size}`,
            (state) => `sui_hover_card_portal-radius_${state.radius}`,
            (state) => state.outlined && "sui_hover_card_portal-outlined",
          ),
        },
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
