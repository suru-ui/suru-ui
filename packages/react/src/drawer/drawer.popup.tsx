import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DrawerPopup} が持つ状態です。
 */
export type DrawerPopupState = Drawer.Popup.State;

export namespace DrawerPopupProps {
  export type Render = RenderProps<DrawerPopupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerPopupProps:
      "initialFocus" | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerPopup} に渡す props です。
 */
export type DrawerPopupProps = DrawerPopupProps.Render &
  DrawerPopupProps.SuruUI &
  DrawerPopupProps.BaseUI &
  DrawerPopupProps.HTML;

export type IDrawerPopup = IComponent<DrawerPopupProps>;

/**
 * ドロワーの本文を表示するコンポーネントです。
 *
 * `initialFocus` と `finalFocus` を使うと、開閉時に移動するフォーカス先を指定できます。
 */
export const DrawerPopup: IDrawerPopup = function SuiDrawerPopup(props) {
  const { className, ...otherProps } = props;

  return (
    <Drawer.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_drawer_popup",
        (state) => `sui_drawer_popup-swipe_direction_${state.swipeDirection}`,
        (state) => state.swiping && "sui_drawer_popup-swiping",
        (state) => state.nestedDrawerSwiping && "sui_drawer_popup-nested_drawer_swiping",
        (state) => state.nestedDrawerOpen && "sui_drawer_popup-nested_drawer_open",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_drawer_popup-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { DrawerPopup as Popup };

export namespace Popup {
  export type State = DrawerPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerPopupProps.Render;

    export type SuruUI = DrawerPopupProps.SuruUI;

    export type BaseUI = DrawerPopupProps.BaseUI;

    export type HTML = DrawerPopupProps.HTML;
  }
}
