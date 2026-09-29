import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link SidebarGroupLabel} の状態です。
 */
export type SidebarGroupLabelState = {};

export namespace SidebarGroupLabelProps {
  export type Render = RenderProps<SidebarGroupLabelState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SidebarGroupLabel} に渡す props です。
 */
export type SidebarGroupLabelProps = SidebarGroupLabelProps.Render &
  SidebarGroupLabelProps.SuruUI &
  SidebarGroupLabelProps.BaseUI &
  SidebarGroupLabelProps.HTML;

export type ISidebarGroupLabel = IComponent<SidebarGroupLabelProps>;

/**
 * グループのラベルです。
 */
export const SidebarGroupLabel: ISidebarGroupLabel = function SuiSidebarGroupLabel(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_group_label",
      },
    ],
    defaultTagName: "div",
  });
};

export { SidebarGroupLabel as GroupLabel };

export namespace GroupLabel {
  export type State = SidebarGroupLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarGroupLabelProps.Render;

    export type SuruUI = SidebarGroupLabelProps.SuruUI;

    export type BaseUI = SidebarGroupLabelProps.BaseUI;

    export type HTML = SidebarGroupLabelProps.HTML;
  }
}
