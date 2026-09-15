import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DrawerViewport} が持つ状態です。
 */
export type DrawerViewportState = Drawer.Viewport.State;

export namespace DrawerViewportProps {
  export type Render = RenderProps<DrawerViewportState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerViewport} に渡す props です。
 */
export type DrawerViewportProps = DrawerViewportProps.Render &
  DrawerViewportProps.SuruUI &
  DrawerViewportProps.BaseUI &
  DrawerViewportProps.HTML;

/**
 * ポップアップの配置コンテナーコンポーネントです。
 *
 * スクロール可能なオーバーレイを作り、ポップアップを配置します。
 */
export const DrawerViewport: IComponent<DrawerViewportProps> = function SuiDrawerViewport(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Viewport {...otherProps} className={cn(className, "sui_drawer_viewport")} />;
};

export { DrawerViewport as Viewport };

export namespace Viewport {
  export type State = DrawerViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerViewportProps.Render;

    export type SuruUI = DrawerViewportProps.SuruUI;

    export type BaseUI = DrawerViewportProps.BaseUI;

    export type HTML = DrawerViewportProps.HTML;
  }
}
