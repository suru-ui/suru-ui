import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { usePopoverContext } from "./popover.context.js";

/**
 * {@link PopoverPortal} が持つ状態です。
 */
export type PopoverPortalState = Popover.Portal.State;

export namespace PopoverPortalProps {
  export type Render = RenderProps<PopoverPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverPortal} に渡す props です。
 */
export type PopoverPortalProps = PopoverPortalProps.Render &
  PopoverPortalProps.SuruUI &
  PopoverPortalProps.BaseUI &
  PopoverPortalProps.HTML;

/**
 * ポップオーバーを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const PopoverPortal: IComponent<PopoverPortalProps> = function SuiPopoverPortal(props) {
  const { size, radius, outlined } = usePopoverContext();
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Popover.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_popover_portal",
        `sui_popover_portal-size_${size}`,
        `sui_popover_portal-radius_${radius}`,
        outlined && "sui_popover_portal-outlined",
      )}
      data-scope={dataScope}
    />
  );
};

export { PopoverPortal as Portal };

export namespace Portal {
  export type State = PopoverPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverPortalProps.Render;

    export type SuruUI = PopoverPortalProps.SuruUI;

    export type BaseUI = PopoverPortalProps.BaseUI;

    export type HTML = PopoverPortalProps.HTML;
  }
}
