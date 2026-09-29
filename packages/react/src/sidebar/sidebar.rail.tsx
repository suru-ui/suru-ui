import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { type SidebarOpenState, useSidebarContext } from "./sidebar.context.js";

/**
 * {@link SidebarRail} の状態です。
 */
export type SidebarRailState = {
  /**
   * サイドバーを無効にするかどうかです。
   */
  readonly disabled: boolean;

  /**
   * サイドバーの開閉状態です。
   */
  readonly state: SidebarOpenState;
};

export namespace SidebarRailProps {
  export type Render = RenderProps<SidebarRailState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"button", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarRail} に渡す props です。
 */
export type SidebarRailProps = SidebarRailProps.Render &
  SidebarRailProps.SuruUI &
  SidebarRailProps.BaseUI &
  SidebarRailProps.HTML;

export type ISidebarRail = IComponent<SidebarRailProps>;

/**
 * サイドバーの内側の端で開閉を切り替える細い帯です。
 *
 * {@link SidebarRoot} の内側に配置します。折りたたみ不可のサイドバーでは表示されません。
 */
export const SidebarRail: ISidebarRail = function SuiSidebarRail(props) {
  const ctx = useSidebarContext();
  const {
    type = "button",
    onClick,
    children,
    disabled = false,
    "aria-label": ariaLabel = "サイドバーを切り替える",
    ...otherButtonProps
  } = props;
  const handleOnClick: NonNullable<SidebarRailProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !disabled && ctx.collapsible !== "none") {
      ctx.toggle();
    }
  };
  const renderState = React.useMemo<SidebarRailState>(
    () => ({ state: ctx.state, disabled }),
    [ctx.state, disabled],
  );

  if (ctx.collapsible === "none") {
    return null;
  }

  return useRender({
    props: [
      otherButtonProps,
      {
        type,
        onClick: handleOnClick,
        children,
        disabled,
        className: cn<SidebarRailState>(
          "sui_sidebar_rail",
          (state) => state.state === "expanded" && "sui_sidebar_rail-expanded",
          (state) => state.state === "collapsed" && "sui_sidebar_rail-collapsed",
          (state) => state.disabled && "sui_sidebar_rail-disabled",
        ),
        "aria-label": ariaLabel,
        "aria-expanded": ctx.open,
      },
    ],
    state: renderState,
    defaultTagName: "button",
  });
};

export { SidebarRail as Rail };

export namespace Rail {
  export type State = SidebarRailState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarRailProps.Render;

    export type SuruUI = SidebarRailProps.SuruUI;

    export type BaseUI = SidebarRailProps.BaseUI;

    export type HTML = SidebarRailProps.HTML;
  }
}
