import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link DrawerVirtualKeyboardProvider} が持つ状態です。
 */
export type DrawerVirtualKeyboardProviderState = Drawer.VirtualKeyboardProvider.State;

export namespace DrawerVirtualKeyboardProviderProps {
  export type Render = RenderProps<DrawerVirtualKeyboardProviderState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.VirtualKeyboardProvider>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerVirtualKeyboardProviderProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.VirtualKeyboardProvider>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerVirtualKeyboardProvider} に渡す props です。
 */
export type DrawerVirtualKeyboardProviderProps = DrawerVirtualKeyboardProviderProps.Render &
  DrawerVirtualKeyboardProviderProps.SuruUI &
  DrawerVirtualKeyboardProviderProps.BaseUI &
  DrawerVirtualKeyboardProviderProps.HTML;

/**
 * ソフトウェアキーボードに合わせたフォーカスとスクロールを管理するプロバイダーです。
 *
 * ボトムシート内にフォームを配置するときに使用します。
 */
export const DrawerVirtualKeyboardProvider: IComponent<DrawerVirtualKeyboardProviderProps> =
  function SuiDrawerVirtualKeyboardProvider(props) {
    return <Drawer.VirtualKeyboardProvider {...props} />;
  };

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
