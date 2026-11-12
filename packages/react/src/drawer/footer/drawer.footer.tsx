import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useDrawerContentContext } from "../content/drawer.content.context.js";
import { DrawerFooterContext } from "./drawer.footer.context.js";

/**
 * {@link DrawerFooter} が持つ状態です。
 */
export type DrawerFooterState = DrawerFooterContext;

export namespace DrawerFooterProps {
  export type Render = RenderProps<DrawerFooterState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<BaseUIComponentProps<"div", never, never>, keyof Render | keyof SuruUI>;
}

/**
 * {@link DrawerFooter} に渡す props です。
 */
export type DrawerFooterProps = DrawerFooterProps.Render &
  DrawerFooterProps.SuruUI &
  DrawerFooterProps.BaseUI &
  DrawerFooterProps.HTML;

export type IDrawerFooter = IComponent<DrawerFooterProps>;

/** ドロワーのフッターコンポーネントです。 */
export const DrawerFooter: IDrawerFooter = (props) => {
  const ctx = useDrawerContentContext();
  const element = useRender({
    props: [
      props,
      {
        className: cn<DrawerFooterState>(
          "sui_drawer_footer",
          (state) => `sui_drawer_footer-swipe_direction_${state.swipeDirection}`,
          (state) => state.swiping && "sui_drawer_footer-swiping",
          (state) => state.nestedDrawerSwiping && "sui_drawer_footer-nested_drawer_swiping",
          (state) => state.nestedDrawerOpen && "sui_drawer_footer-nested_drawer_open",
          (state) =>
            state.transitionStatus !== undefined &&
            `sui_drawer_footer-transition_status_${state.transitionStatus}`,
          (state) => state.expanded && "sui_drawer_footer-expanded",
          (state) => state.open && "sui_drawer_footer-open",
          (state) => state.nested && "sui_drawer_footer-nested",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });

  return <DrawerFooterContext value={ctx}>{element}</DrawerFooterContext>;
};

export { DrawerFooter as Footer };
export namespace Footer {
  export type State = DrawerFooterState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerFooterProps.Render;

    export type SuruUI = DrawerFooterProps.SuruUI;

    export type BaseUI = DrawerFooterProps.BaseUI;

    export type HTML = DrawerFooterProps.HTML;
  }
}
