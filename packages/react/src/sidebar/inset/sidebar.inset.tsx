import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import type { IComponent } from "../../types.js";
import { type SidebarContextState, useSidebarContext } from "../root/sidebar.root.context.js";

/**
 * {@link SidebarInset} の状態です。
 */
export type SidebarInsetState = SidebarContextState;

export namespace SidebarInsetProps {
  export type Render = RenderProps<SidebarInsetState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<BaseUIComponentProps<"main", never, never>, keyof Render | keyof SuruUI>;
}

/**
 * {@link SidebarInset} に渡す props です。
 */
export type SidebarInsetProps = SidebarInsetProps.Render &
  SidebarInsetProps.SuruUI &
  SidebarInsetProps.BaseUI &
  SidebarInsetProps.HTML;

export type ISidebarInset = IComponent<SidebarInsetProps>;

/**
 * メインコンテンツの領域です。
 *
 * {@link SidebarRoot} に `variant="inset"` を指定すると、押し込まれた外観になります。
 */
export const SidebarInset: ISidebarInset = (props) => {
  const ctx = useSidebarContext();

  return useRender({
    props: [
      props,
      {
        className: "sui_sidebar_inset",
      },
    ],
    state: ctx,
    defaultTagName: "main",
  });
};

export { SidebarInset as Inset };
export namespace Inset {
  export type State = SidebarInsetState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SidebarInsetProps.Render;

    export type SuruUI = SidebarInsetProps.SuruUI;

    export type BaseUI = SidebarInsetProps.BaseUI;

    export type HTML = SidebarInsetProps.HTML;
  }
}
