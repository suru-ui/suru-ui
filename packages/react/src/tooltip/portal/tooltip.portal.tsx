import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useTooltipContext } from "../root/tooltip.root.context.js";
import { TooltipPortalContext } from "./tooltip.portal.context.js";

/**
 * {@link TooltipPortal} が持つ状態です。
 */
export type TooltipPortalState = TooltipPortalContext;

export namespace TooltipPortalProps {
  export type Render = RenderProps<TooltipPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Tooltip.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TooltipPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Tooltip.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TooltipPortal} に渡す props です。
 */
export type TooltipPortalProps = TooltipPortalProps.Render &
  TooltipPortalProps.SuruUI &
  TooltipPortalProps.BaseUI &
  TooltipPortalProps.HTML;

export type ITooltipPortal = IComponent<TooltipPortalProps>;

/**
 * ツールチップを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const TooltipPortal: ITooltipPortal = function SuiTooltipPortal(props) {
  const ctx = useTooltipContext();
  const {
    style,
    render,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Tooltip.Portal
      {...otherProps}
      {...proxyRenderProps<Tooltip.Portal.State, TooltipPortalState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <TooltipPortalContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </TooltipPortalContext>
          ),
          className: cn<TooltipPortalState>(
            className,
            "sui_tooltip_portal",
            (state) => `sui_tooltip_portal-size_${state.size}`,
            (state) => `sui_tooltip_portal-radius_${state.radius}`,
            (state) => state.outlined && "sui_tooltip_portal-outlined",
          ),
        },
      )}
      data-scope={dataScope}
    />
  );
};

export { TooltipPortal as Portal };

export namespace Portal {
  export type State = TooltipPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipPortalProps.Render;

    export type SuruUI = TooltipPortalProps.SuruUI;

    export type BaseUI = TooltipPortalProps.BaseUI;

    export type HTML = TooltipPortalProps.HTML;
  }
}
