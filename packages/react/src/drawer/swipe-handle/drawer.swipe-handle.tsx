import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { type DrawerPopupContext, useDrawerPopupContext } from "../popup/drawer.popup.context.js";

/**
 * {@link DrawerSwipeHandle} が持つ状態です。
 */
export type DrawerSwipeHandleState = Readonly<DrawerPopupContext>;

export namespace DrawerSwipeHandleProps {
  export type Render = RenderProps<DrawerSwipeHandleState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerSwipeHandle} に渡す props です。
 */
export type DrawerSwipeHandleProps = DrawerSwipeHandleProps.Render &
  DrawerSwipeHandleProps.SuruUI &
  DrawerSwipeHandleProps.BaseUI &
  DrawerSwipeHandleProps.HTML;

export type IDrawerSwipeHandle = IComponent<DrawerSwipeHandleProps>;

/**
 * ドロワーをスワイプで操作するためのハンドルです。
 *
 * `DrawerPopup` の子として、`DrawerContent` より前に配置します。
 */
export const DrawerSwipeHandle: IDrawerSwipeHandle = function SuiDrawerSwipeHandle(props) {
  const ctx = useDrawerPopupContext();
  const element = useRender({
    props: [
      props,
      {
        className: cn<DrawerSwipeHandleState>(
          "sui_drawer_swipe_handle",
          (state) => `sui_drawer_swipe_handle-swipe_direction_${state.swipeDirection}`,
          (state) => state.swiping && "sui_drawer_swipe_handle-swiping",
          (state) => state.nestedDrawerSwiping && "sui_drawer_swipe_handle-nested_drawer_swiping",
          (state) => state.nestedDrawerOpen && "sui_drawer_swipe_handle-nested_drawer_open",
          (state) => state.open && "sui_drawer_swipe_handle-open",
          (state) => state.nested && "sui_drawer_swipe_handle-nested",
        ),
        "aria-hidden": "true",
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });

  return element;
};

export { DrawerSwipeHandle as SwipeHandle };

export namespace SwipeHandle {
  export type State = DrawerSwipeHandleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerSwipeHandleProps.Render;

    export type SuruUI = DrawerSwipeHandleProps.SuruUI;

    export type BaseUI = DrawerSwipeHandleProps.BaseUI;

    export type HTML = DrawerSwipeHandleProps.HTML;
  }
}
