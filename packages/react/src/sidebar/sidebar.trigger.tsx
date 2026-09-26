import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import { SidebarIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { type SidebarOpenState, useSidebarContext } from "./sidebar.context.js";

/**
 * {@link SidebarTrigger} の状態です。
 */
export type SidebarTriggerState = {
  /**
   * サイドバーを無効にするかどうかです。
   */
  readonly disabled: boolean;

  /**
   * サイドバーの開閉状態です。
   */
  readonly state: SidebarOpenState;
};

export namespace SidebarTriggerProps {
  export type Render = RenderProps<SidebarTriggerState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"button", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarTrigger} に渡す props です。
 */
export type SidebarTriggerProps = SidebarTriggerProps.Render &
  SidebarTriggerProps.SuruUI &
  SidebarTriggerProps.BaseUI &
  SidebarTriggerProps.HTML;

/**
 * サイドバーの開閉を切り替えるボタンです。
 *
 * 子要素を省略すると既定のアイコンが表示されます。
 */
export const SidebarTrigger: IComponent<SidebarTriggerProps> = function SuiSidebarTrigger(props) {
  const ctx = useSidebarContext();
  const {
    type = "button",
    onClick,
    children,
    disabled,
    "aria-label": ariaLabelProp,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherButtonProps
  } = props;
  const triggerDisabled = disabled ?? ctx.collapsible === "none";
  const ariaLabel =
    ariaLabelProp ?? (children === undefined ? "サイドバーを切り替える" : undefined);
  const handleOnClick: NonNullable<SidebarTriggerProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !triggerDisabled) {
      ctx.toggle();
    }
  };
  const renderState = React.useMemo<SidebarTriggerState>(
    () => ({ state: ctx.state, disabled: triggerDisabled }),
    [ctx.state, triggerDisabled],
  );

  return useRender({
    props: [
      otherButtonProps,
      {
        type,
        onClick: handleOnClick,
        children: children ?? <SidebarIcon />,
        disabled: triggerDisabled || undefined,
        className: cn<SidebarTriggerState>(
          "sui_sidebar_trigger",
          (state) => `sui_sidebar_trigger-${state.state}`,
          (state) => state.disabled && "sui_sidebar_trigger-disabled",
        ),
        "aria-label": ariaLabel,
        "aria-expanded": ctx.open,
        "data-scope": dataScope,
      },
    ],
    state: renderState,
    defaultTagName: "button",
  });
};

export { SidebarTrigger as Trigger };

export namespace Trigger {
  export type State = SidebarTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarTriggerProps.Render;

    export type SuruUI = SidebarTriggerProps.SuruUI;

    export type BaseUI = SidebarTriggerProps.BaseUI;

    export type HTML = SidebarTriggerProps.HTML;
  }
}
