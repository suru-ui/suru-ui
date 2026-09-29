import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DrawerBackdrop} が持つ状態です。
 */
export type DrawerBackdropState = Drawer.Backdrop.State;

export namespace DrawerBackdropProps {
  export type Render = RenderProps<DrawerBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerBackdropProps:
      "forceRender",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerBackdrop} に渡す props です。
 */
export type DrawerBackdropProps = DrawerBackdropProps.Render &
  DrawerBackdropProps.SuruUI &
  DrawerBackdropProps.BaseUI &
  DrawerBackdropProps.HTML;

export type IDrawerBackdrop = IComponent<DrawerBackdropProps>;

/**
 * ポップアップの背後に表示されるオーバーレイコンポーネントです。
 */
export const DrawerBackdrop: IDrawerBackdrop = function SuiDrawerBackdrop(props) {
  const { className, ...otherProps } = props;

  return (
    <Drawer.Backdrop
      {...otherProps}
      className={cn(
        className,
        "sui_drawer_backdrop",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_drawer_backdrop-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { DrawerBackdrop as Backdrop };

export namespace Backdrop {
  export type State = DrawerBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerBackdropProps.Render;

    export type SuruUI = DrawerBackdropProps.SuruUI;

    export type BaseUI = DrawerBackdropProps.BaseUI;

    export type HTML = DrawerBackdropProps.HTML;
  }
}
