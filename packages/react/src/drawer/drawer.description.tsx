import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DrawerDescription} が持つ状態です。
 */
export type DrawerDescriptionState = Drawer.Description.State;

export namespace DrawerDescriptionProps {
  export type Render = RenderProps<DrawerDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Description>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerDescriptionProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Description>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerDescription} に渡す props です。
 */
export type DrawerDescriptionProps = DrawerDescriptionProps.Render &
  DrawerDescriptionProps.SuruUI &
  DrawerDescriptionProps.BaseUI &
  DrawerDescriptionProps.HTML;

export type IDrawerDescription = IComponent<DrawerDescriptionProps>;

/**
 * ドロワーの内容を表示するコンポーネントです。
 */
export const DrawerDescription: IDrawerDescription = function SuiDrawerDescription(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Description {...otherProps} className={cn(className, "sui_drawer_description")} />;
};

export { DrawerDescription as Description };

export namespace Description {
  export type State = DrawerDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerDescriptionProps.Render;

    export type SuruUI = DrawerDescriptionProps.SuruUI;

    export type BaseUI = DrawerDescriptionProps.BaseUI;

    export type HTML = DrawerDescriptionProps.HTML;
  }
}
