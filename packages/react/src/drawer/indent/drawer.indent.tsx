import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link DrawerIndent} が持つ状態です。
 */
export type DrawerIndentState = Drawer.Indent.State;

export namespace DrawerIndentProps {
  export type Render = RenderProps<DrawerIndentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Indent>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerIndentProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Indent>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerIndent} に渡す props です。
 */
export type DrawerIndentProps = DrawerIndentProps.Render &
  DrawerIndentProps.SuruUI &
  DrawerIndentProps.BaseUI &
  DrawerIndentProps.HTML;

export type IDrawerIndent = IComponent<DrawerIndentProps>;

/**
 * アプリケーションのメイン UI を囲み、ドロワーのインデント状態を受け取る要素です。
 */
export const DrawerIndent: IDrawerIndent = function SuiDrawerIndent(props) {
  const { className, ...otherProps } = props;

  return (
    <Drawer.Indent
      {...otherProps}
      className={cn(
        className,
        "sui_drawer_indent",
        (state) => state.active && "sui_drawer_indent-active",
      )}
    />
  );
};

export { DrawerIndent as Indent };

export namespace Indent {
  export type State = DrawerIndentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerIndentProps.Render;

    export type SuruUI = DrawerIndentProps.SuruUI;

    export type BaseUI = DrawerIndentProps.BaseUI;

    export type HTML = DrawerIndentProps.HTML;
  }
}
