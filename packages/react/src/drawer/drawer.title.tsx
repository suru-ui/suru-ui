import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DrawerTitle} が持つ状態です。
 */
export type DrawerTitleState = Drawer.Title.State;

export namespace DrawerTitleProps {
  export type Render = RenderProps<DrawerTitleState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Title>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerTitleProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Title>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerTitle} に渡す props です。
 */
export type DrawerTitleProps = DrawerTitleProps.Render &
  DrawerTitleProps.SuruUI &
  DrawerTitleProps.BaseUI &
  DrawerTitleProps.HTML;

/**
 * ドロワーの見出しを表示するコンポーネントです。
 */
export const DrawerTitle: IComponent<DrawerTitleProps> = function SuiDrawerTitle(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Title {...otherProps} className={cn(className, "sui_drawer_title")} />;
};

export { DrawerTitle as Title };

export namespace Title {
  export type State = DrawerTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerTitleProps.Render;

    export type SuruUI = DrawerTitleProps.SuruUI;

    export type BaseUI = DrawerTitleProps.BaseUI;

    export type HTML = DrawerTitleProps.HTML;
  }
}
