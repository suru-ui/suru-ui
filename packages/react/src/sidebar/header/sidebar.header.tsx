import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import type { IComponent } from "../../types.js";

/**
 * {@link SidebarHeader} の状態です。
 */
export type SidebarHeaderState = {};

export namespace SidebarHeaderProps {
  export type Render = RenderProps<SidebarHeaderState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarHeader} に渡す props です。
 */
export type SidebarHeaderProps = SidebarHeaderProps.Render &
  SidebarHeaderProps.SuruUI &
  SidebarHeaderProps.BaseUI &
  SidebarHeaderProps.HTML;

export type ISidebarHeader = IComponent<SidebarHeaderProps>;

/**
 * サイドバー上部に固定される領域です。
 *
 * ブランドやワークスペースの切り替えなどを配置します。
 */
export const SidebarHeader: ISidebarHeader = function SuiSidebarHeader(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_header",
      },
    ],
    defaultTagName: "div",
  });
};

export { SidebarHeader as Header };

export namespace Header {
  export type State = SidebarHeaderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarHeaderProps.Render;

    export type SuruUI = SidebarHeaderProps.SuruUI;

    export type BaseUI = SidebarHeaderProps.BaseUI;

    export type HTML = SidebarHeaderProps.HTML;
  }
}
