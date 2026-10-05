import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import type { IComponent } from "../../types.js";

/**
 * {@link DrawerProvider} が持つ状態です。
 */
export type DrawerProviderState = Drawer.Provider.State;

export namespace DrawerProviderProps {
  export type Render = {};

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Provider>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerProviderProps:
      "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Provider>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerProvider} に渡す props です。
 */
export type DrawerProviderProps = DrawerProviderProps.Render &
  DrawerProviderProps.SuruUI &
  DrawerProviderProps.BaseUI &
  DrawerProviderProps.HTML;

export type IDrawerProvider = IComponent<DrawerProviderProps>;

/**
 * 複数のドロワーでインデント効果などの状態を共有するプロバイダーです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 */
export const DrawerProvider: IDrawerProvider = function SuiDrawerProvider(props) {
  return <Drawer.Provider {...props} />;
};

export { DrawerProvider as Provider };

export namespace Provider {
  export type State = DrawerProviderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerProviderProps.Render;

    export type SuruUI = DrawerProviderProps.SuruUI;

    export type BaseUI = DrawerProviderProps.BaseUI;

    export type HTML = DrawerProviderProps.HTML;
  }
}
