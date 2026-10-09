import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useDrawerContentContext } from "../content/drawer.content.context.js";
import { DrawerBodyContext } from "./drawer.body.context.js";

/**
 * {@link DrawerBody} が持つ状態です。
 */
export type DrawerBodyState = DrawerBodyContext;

export namespace DrawerBodyProps {
  export type Render = RenderProps<DrawerBodyState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerBody} に渡す props です。
 */
export type DrawerBodyProps = DrawerBodyProps.Render &
  DrawerBodyProps.SuruUI &
  DrawerBodyProps.BaseUI &
  DrawerBodyProps.HTML;

export type IDrawerBody = IComponent<DrawerBodyProps>;

/**
 * ドロワーのボディーコンポーネントです。
 */
export const DrawerBody: IDrawerBody = function SuiDrawerBody(props) {
  const ctx = useDrawerContentContext();
  const element = useRender({
    props: [
      props,
      {
        className: cn<DrawerBodyState>(
          "sui_drawer_body",
          (state) => `sui_drawer_body-swipe_direction_${state.swipeDirection}`,
          (state) => state.swiping && "sui_drawer_body-swiping",
          (state) => state.nestedDrawerSwiping && "sui_drawer_body-nested_drawer_swiping",
          (state) => state.nestedDrawerOpen && "sui_drawer_body-nested_drawer_open",
          (state) =>
            state.transitionStatus !== undefined &&
            `sui_drawer_body-transition_status_${state.transitionStatus}`,
          (state) => state.expanded && "sui_drawer_body-expanded",
          (state) => state.open && "sui_drawer_body-open",
          (state) => state.nested && "sui_drawer_body-nested",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });

  return <DrawerBodyContext value={ctx}>{element}</DrawerBodyContext>;
};

export { DrawerBody as Body };

export namespace Body {
  export type State = DrawerBodyState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerBodyProps.Render;

    export type SuruUI = DrawerBodyProps.SuruUI;

    export type BaseUI = DrawerBodyProps.BaseUI;

    export type HTML = DrawerBodyProps.HTML;
  }
}
