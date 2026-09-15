import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link SidebarContent} の状態です。
 */
export type SidebarContentState = {};

export namespace SidebarContentProps {
  export type Render = RenderProps<SidebarContentState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarContent} に渡す props です。
 */
export type SidebarContentProps = SidebarContentProps.Render &
  SidebarContentProps.SuruUI &
  SidebarContentProps.BaseUI &
  SidebarContentProps.HTML;

/**
 * サイドバーのスクロール領域です。
 *
 * {@link SidebarGroup} などの内容を配置します。
 */
export const SidebarContent: IComponent<SidebarContentProps> = function SuiSidebarContent(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_content",
      },
    ],
    defaultTagName: "div",
  });
};

export { SidebarContent as Content };

export namespace Content {
  export type State = SidebarContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarContentProps.Render;

    export type SuruUI = SidebarContentProps.SuruUI;

    export type BaseUI = SidebarContentProps.BaseUI;

    export type HTML = SidebarContentProps.HTML;
  }
}
