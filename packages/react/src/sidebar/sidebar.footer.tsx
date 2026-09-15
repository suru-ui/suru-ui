import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link SidebarFooter} の状態です。
 */
export type SidebarFooterState = {};

export namespace SidebarFooterProps {
  export type Render = RenderProps<SidebarFooterState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarFooter} に渡す props です。
 */
export type SidebarFooterProps = SidebarFooterProps.Render &
  SidebarFooterProps.SuruUI &
  SidebarFooterProps.BaseUI &
  SidebarFooterProps.HTML;

/**
 * サイドバー下部に固定される領域です。
 *
 * ユーザーメニューなどを配置します。
 */
export const SidebarFooter: IComponent<SidebarFooterProps> = function SuiSidebarFooter(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_footer",
      },
    ],
    defaultTagName: "div",
  });
};

export { SidebarFooter as Footer };

export namespace Footer {
  export type State = SidebarFooterState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarFooterProps.Render;

    export type SuruUI = SidebarFooterProps.SuruUI;

    export type BaseUI = SidebarFooterProps.BaseUI;

    export type HTML = SidebarFooterProps.HTML;
  }
}
