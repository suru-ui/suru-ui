import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DrawerContent} が持つ状態です。
 */
export type DrawerContentState = Drawer.Content.State;

export namespace DrawerContentProps {
  export type Render = RenderProps<DrawerContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Content>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerContentProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Content>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerContent} に渡す props です。
 */
export type DrawerContentProps = DrawerContentProps.Render &
  DrawerContentProps.SuruUI &
  DrawerContentProps.BaseUI &
  DrawerContentProps.HTML;

/**
 * ドロワー内のテキスト選択とスワイプ操作を分けるコンテンツコンポーネントです。
 */
export const DrawerContent: IComponent<DrawerContentProps> = function SuiDrawerContent(props) {
  const { className, ...otherProps } = props;

  return <Drawer.Content {...otherProps} className={cn(className, "sui_drawer_content")} />;
};

export { DrawerContent as Content };

export namespace Content {
  export type State = DrawerContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerContentProps.Render;

    export type SuruUI = DrawerContentProps.SuruUI;

    export type BaseUI = DrawerContentProps.BaseUI;

    export type HTML = DrawerContentProps.HTML;
  }
}
