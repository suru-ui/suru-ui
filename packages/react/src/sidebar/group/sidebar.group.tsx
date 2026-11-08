import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import type { IComponent } from "../../types.js";
import { type SidebarContextState, useSidebarContext } from "../root/sidebar.root.context.js";

/**
 * {@link SidebarGroup} の状態です。
 */
export type SidebarGroupState = SidebarContextState;

export namespace SidebarGroupProps {
  export type Render = RenderProps<SidebarGroupState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarGroup} に渡す props です。
 */
export type SidebarGroupProps = SidebarGroupProps.Render &
  SidebarGroupProps.SuruUI &
  SidebarGroupProps.BaseUI &
  SidebarGroupProps.HTML;

export type ISidebarGroup = IComponent<SidebarGroupProps>;

/**
 * サイドバー内のセクションです。
 *
 * 子要素には {@link SidebarGroupLabel} と {@link SidebarGroupContent} を配置します。
 */
export const SidebarGroup: ISidebarGroup = function SuiSidebarGroup(props) {
  const ctx = useSidebarContext();

  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_group",
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });
};

export { SidebarGroup as Group };

export namespace Group {
  export type State = SidebarGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarGroupProps.Render;

    export type SuruUI = SidebarGroupProps.SuruUI;

    export type BaseUI = SidebarGroupProps.BaseUI;

    export type HTML = SidebarGroupProps.HTML;
  }
}
