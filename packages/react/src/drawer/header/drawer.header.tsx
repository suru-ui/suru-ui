import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useDrawerContentContext } from "../content/drawer.content.context.js";
import { DrawerHeaderContext } from "./drawer.header.context.js";

/**
 * {@link DrawerHeader} が持つ状態です。
 */
export type DrawerHeaderState = DrawerHeaderContext;

export namespace DrawerHeaderProps {
  export type Render = RenderProps<DrawerHeaderState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerHeader} に渡す props です。
 */
export type DrawerHeaderProps = DrawerHeaderProps.Render &
  DrawerHeaderProps.SuruUI &
  DrawerHeaderProps.BaseUI &
  DrawerHeaderProps.HTML;

export type IDrawerHeader = IComponent<DrawerHeaderProps>;

/**
 * ドロワーのヘッダーコンポーネントです。
 */
export const DrawerHeader: IDrawerHeader = function SuiDrawerHeader(props) {
  const ctx = useDrawerContentContext();
  const element = useRender({
    props: [
      props,
      {
        className: cn<DrawerHeaderState>(
          "sui_drawer_header",
          (state) => `sui_drawer_header-swipe_direction_${state.swipeDirection}`,
          (state) => state.swiping && "sui_drawer_header-swiping",
          (state) => state.nestedDrawerSwiping && "sui_drawer_header-nested_drawer_swiping",
          (state) => state.nestedDrawerOpen && "sui_drawer_header-nested_drawer_open",
          (state) =>
            state.transitionStatus !== undefined &&
            `sui_drawer_header-transition_status_${state.transitionStatus}`,
          (state) => state.expanded && "sui_drawer_header-expanded",
          (state) => state.open && "sui_drawer_header-open",
          (state) => state.nested && "sui_drawer_header-nested",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });

  return <DrawerHeaderContext value={ctx}>{element}</DrawerHeaderContext>;
};

export { DrawerHeader as Header };

export namespace Header {
  export type State = DrawerHeaderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerHeaderProps.Render;

    export type SuruUI = DrawerHeaderProps.SuruUI;

    export type BaseUI = DrawerHeaderProps.BaseUI;

    export type HTML = DrawerHeaderProps.HTML;
  }
}
