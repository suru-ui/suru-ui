import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useTooltipContext } from "./tooltip.context.js";

/**
 * {@link TooltipPortal} が持つ状態です。
 */
export type TooltipPortalState = Tooltip.Portal.State;

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

/**
 * ツールチップを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const TooltipPortal: IComponent<TooltipPortalProps> = function SuiTooltipPortal(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = useTooltipContext(true);
  const size = ctx?.size ?? "md";
  const radius = ctx?.radius ?? "md";
  const outlined = ctx?.outlined ?? false;

  return (
    <Tooltip.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_tooltip_portal",
        `sui_tooltip_portal-size_${size}`,
        `sui_tooltip_portal-radius_${radius}`,
        outlined && "sui_tooltip_portal-outlined",
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
