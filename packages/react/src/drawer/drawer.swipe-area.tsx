import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DrawerSwipeArea} が持つ状態です。
 */
export type DrawerSwipeAreaState = Drawer.SwipeArea.State;

export namespace DrawerSwipeAreaProps {
  export type Render = RenderProps<DrawerSwipeAreaState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.SwipeArea>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerSwipeAreaProps:
      "disabled" | "swipeDirection",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.SwipeArea>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerSwipeArea} に渡す props です。
 */
export type DrawerSwipeAreaProps = DrawerSwipeAreaProps.Render &
  DrawerSwipeAreaProps.SuruUI &
  DrawerSwipeAreaProps.BaseUI &
  DrawerSwipeAreaProps.HTML;

/**
 * 画面端からのスワイプでドロワーを開く領域です。
 */
export const DrawerSwipeArea: IComponent<DrawerSwipeAreaProps> = function SuiDrawerSwipeArea(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <Drawer.SwipeArea
      {...otherProps}
      className={cn(
        className,
        "sui_drawer_swipe_area",
        (state) => `sui_drawer_swipe_area-swipe_direction_${state.swipeDirection}`,
      )}
    />
  );
};

export { DrawerSwipeArea as SwipeArea };

export namespace SwipeArea {
  export type State = DrawerSwipeAreaState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerSwipeAreaProps.Render;

    export type SuruUI = DrawerSwipeAreaProps.SuruUI;

    export type BaseUI = DrawerSwipeAreaProps.BaseUI;

    export type HTML = DrawerSwipeAreaProps.HTML;
  }
}
