import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useDrawerHeaderContext } from "../header/drawer.header.context.js";
import { DrawerTitleContext } from "./drawer.title.context.js";

/**
 * {@link DrawerTitle} が持つ状態です。
 */
export type DrawerTitleState = DrawerTitleContext;

export namespace DrawerTitleProps {
  export type Render = RenderProps<DrawerTitleState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Drawer.Title>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // DrawerTitleProps より:
      never
    >,
    keyof Render | keyof SuruUI
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

export type IDrawerTitle = IComponent<DrawerTitleProps>;

/**
 * ドロワーの見出しを表示するコンポーネントです。
 */
export const DrawerTitle: IDrawerTitle = function SuiDrawerTitle(props) {
  const ctx = useDrawerHeaderContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Drawer.Title
      {...otherProps}
      {...proxyRenderProps<Drawer.Title.State, DrawerTitleState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <DrawerTitleContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="h2"
              />
            </DrawerTitleContext>
          ),
          className: cn<DrawerTitleState>(
            className,
            "sui_drawer_title",
            (state) => `sui_drawer_title-swipe_direction_${state.swipeDirection}`,
            (state) => state.swiping && "sui_drawer_title-swiping",
            (state) => state.nestedDrawerSwiping && "sui_drawer_title-nested_drawer_swiping",
            (state) => state.nestedDrawerOpen && "sui_drawer_title-nested_drawer_open",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_drawer_title-transition_status_${state.transitionStatus}`,
            (state) => state.expanded && "sui_drawer_title-expanded",
            (state) => state.open && "sui_drawer_title-open",
            (state) => state.nested && "sui_drawer_title-nested",
          ),
        },
      )}
    />
  );
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
