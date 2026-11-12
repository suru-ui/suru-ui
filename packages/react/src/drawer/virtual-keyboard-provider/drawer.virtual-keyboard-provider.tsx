import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import type { IComponent } from "../../types.js";

/**
 * {@link DrawerVirtualKeyboardProvider} が持つ状態です。
 */
export type DrawerVirtualKeyboardProviderState = Drawer.VirtualKeyboardProvider.State;

export namespace DrawerVirtualKeyboardProviderProps {
  export type Render = {};

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Drawer.VirtualKeyboardProvider>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // DrawerVirtualKeyboardProviderProps より :
      "children"
    >,
    keyof Render
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.VirtualKeyboardProvider>,
    keyof Render | keyof BaseUI
  >;
}

/**
 * {@link DrawerVirtualKeyboardProvider} に渡す props です。
 */
export type DrawerVirtualKeyboardProviderProps = DrawerVirtualKeyboardProviderProps.Render &
  DrawerVirtualKeyboardProviderProps.SuruUI &
  DrawerVirtualKeyboardProviderProps.BaseUI &
  DrawerVirtualKeyboardProviderProps.HTML;

export type IDrawerVirtualKeyboardProvider = IComponent<DrawerVirtualKeyboardProviderProps>;

/**
 * ソフトウェアキーボードに合わせたフォーカスとスクロールを管理するプロバイダーです。
 *
 * ボトムシート内にフォームを配置するときに使用します。
 */
export const DrawerVirtualKeyboardProvider: IDrawerVirtualKeyboardProvider = (props) => (
  <Drawer.VirtualKeyboardProvider {...props} />
);

export { DrawerVirtualKeyboardProvider as VirtualKeyboardProvider };
export namespace VirtualKeyboardProvider {
  export type State = DrawerVirtualKeyboardProviderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerVirtualKeyboardProviderProps.Render;

    export type SuruUI = DrawerVirtualKeyboardProviderProps.SuruUI;

    export type BaseUI = DrawerVirtualKeyboardProviderProps.BaseUI;

    export type HTML = DrawerVirtualKeyboardProviderProps.HTML;
  }
}
