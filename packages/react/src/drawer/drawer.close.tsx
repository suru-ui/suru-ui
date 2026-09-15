import { Drawer } from "@base-ui/react/drawer";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DrawerClose} が持つ状態です。
 */
export type DrawerCloseState = Drawer.Close.State;

export namespace DrawerCloseProps {
  export type Render = RenderProps<DrawerCloseState>;

  export type SuruUI = {
    /**
     * ボタンとしてレンダリングする要素です。
     */
    children: NonNullable<React.ComponentProps<typeof Drawer.Close>["render"]>;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Close>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // DrawerCloseProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Close>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerClose} に渡す props です。
 */
export type DrawerCloseProps = DrawerCloseProps.Render &
  DrawerCloseProps.SuruUI &
  DrawerCloseProps.BaseUI &
  DrawerCloseProps.HTML;

/**
 * ドロワーを閉じるボタンコンポーネントです。
 */
export const DrawerClose: IComponent<DrawerCloseProps> = function SuiDrawerClose(props) {
  const { children, className, ...otherProps } = props;

  return (
    <Drawer.Close {...otherProps} render={children} className={cn(className, "sui_drawer_close")} />
  );
};

export { DrawerClose as Close };

export namespace Close {
  export type State = DrawerCloseState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerCloseProps.Render;

    export type SuruUI = DrawerCloseProps.SuruUI;

    export type BaseUI = DrawerCloseProps.BaseUI;

    export type HTML = DrawerCloseProps.HTML;
  }
}
