import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useDrawerHeaderContext } from "../header/drawer.header.context.js";
import { DrawerControlsContext } from "./drawer.controls.context.js";

/**
 * {@link DrawerControls} が持つ状態です。
 */
export type DrawerControlsState = DrawerControlsContext;

export namespace DrawerControlsProps {
  export type Render = RenderProps<DrawerControlsState>;

  export type SuruUI = {
    /**
     * 絶対位置として配置するかを指定します。
     *
     * @default true
     */
    absolute?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerControls} に渡す props です。
 */
export type DrawerControlsProps = DrawerControlsProps.Render &
  DrawerControlsProps.SuruUI &
  DrawerControlsProps.BaseUI &
  DrawerControlsProps.HTML;

export type IDrawerControls = IComponent<DrawerControlsProps>;

/** ドロワーのコントロールコンポーネントです。 */
export const DrawerControls: IDrawerControls = (props) => {
  const ctx = useDrawerHeaderContext();
  const { absolute = true, ...otherDivProps } = props;
  const element = useRender({
    props: [
      otherDivProps,
      {
        className: cn<DrawerControlsState>(
          "sui_drawer_controls",
          absolute && "sui_drawer_controls-absolute",
          !absolute && "sui_drawer_controls-relative",
          (state) => `sui_drawer_controls-swipe_direction_${state.swipeDirection}`,
          (state) => state.swiping && "sui_drawer_controls-swiping",
          (state) => state.nestedDrawerSwiping && "sui_drawer_controls-nested_drawer_swiping",
          (state) => state.nestedDrawerOpen && "sui_drawer_controls-nested_drawer_open",
          (state) =>
            state.transitionStatus !== undefined &&
            `sui_drawer_controls-transition_status_${state.transitionStatus}`,
          (state) => state.expanded && "sui_drawer_controls-expanded",
          (state) => state.open && "sui_drawer_controls-open",
          (state) => state.nested && "sui_drawer_controls-nested",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });

  return <DrawerControlsContext value={ctx}>{element}</DrawerControlsContext>;
};

export { DrawerControls as Controls };
export namespace Controls {
  export type State = DrawerControlsState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerControlsProps.Render;

    export type SuruUI = DrawerControlsProps.SuruUI;

    export type BaseUI = DrawerControlsProps.BaseUI;

    export type HTML = DrawerControlsProps.HTML;
  }
}
