import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link DrawerIndentBackground} が持つ状態です。
 */
export type DrawerIndentBackgroundState = Drawer.IndentBackground.State;

export namespace DrawerIndentBackgroundProps {
  export type Render = RenderProps<DrawerIndentBackgroundState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Drawer.IndentBackground>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // DrawerIndentBackgroundProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.IndentBackground>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerIndentBackground} に渡す props です。
 */
export type DrawerIndentBackgroundProps = DrawerIndentBackgroundProps.Render &
  DrawerIndentBackgroundProps.SuruUI &
  DrawerIndentBackgroundProps.BaseUI &
  DrawerIndentBackgroundProps.HTML;

export type IDrawerIndentBackground = IComponent<DrawerIndentBackgroundProps>;

/**
 * ドロワーが開いているときの背景レイヤーです。
 *
 * `DrawerProvider` の子として `DrawerIndent` より前に配置します。
 */
export const DrawerIndentBackground: IDrawerIndentBackground = function SuiDrawerIndentBackground(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <Drawer.IndentBackground
      {...otherProps}
      className={cn<DrawerIndentBackgroundState>(
        className,
        "sui_drawer_indent_background",
        (state) => state.active && "sui_drawer_indent_background-active",
      )}
    />
  );
};

export { DrawerIndentBackground as IndentBackground };

export namespace IndentBackground {
  export type State = DrawerIndentBackgroundState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerIndentBackgroundProps.Render;

    export type SuruUI = DrawerIndentBackgroundProps.SuruUI;

    export type BaseUI = DrawerIndentBackgroundProps.BaseUI;

    export type HTML = DrawerIndentBackgroundProps.HTML;
  }
}
