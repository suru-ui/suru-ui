import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import type { IComponent } from "../../types.js";

/**
 * {@link SidebarGroupContent} の状態です。
 */
export type SidebarGroupContentState = {};

export namespace SidebarGroupContentProps {
  export type Render = RenderProps<SidebarGroupContentState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarGroupContent} に渡す props です。
 */
export type SidebarGroupContentProps = SidebarGroupContentProps.Render &
  SidebarGroupContentProps.SuruUI &
  SidebarGroupContentProps.BaseUI &
  SidebarGroupContentProps.HTML;

export type ISidebarGroupContent = IComponent<SidebarGroupContentProps>;

/**
 * グループの内容です。
 *
 * ナビゲーションの項目などを配置します。
 */
export const SidebarGroupContent: ISidebarGroupContent = function SuiSidebarGroupContent(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_group_content",
      },
    ],
    defaultTagName: "div",
  });
};

export { SidebarGroupContent as GroupContent };

export namespace GroupContent {
  export type State = SidebarGroupContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarGroupContentProps.Render;

    export type SuruUI = SidebarGroupContentProps.SuruUI;

    export type BaseUI = SidebarGroupContentProps.BaseUI;

    export type HTML = SidebarGroupContentProps.HTML;
  }
}
