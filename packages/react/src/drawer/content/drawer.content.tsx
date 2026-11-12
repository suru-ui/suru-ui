import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useDrawerPopupContext } from "../popup/drawer.popup.context.js";
import { DrawerContentContext } from "./drawer.content.context.js";

/**
 * {@link DrawerContent} が持つ状態です。
 */
export type DrawerContentState = DrawerContentContext;

export namespace DrawerContentProps {
  export type Render = RenderProps<DrawerContentState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Drawer.Content>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // DrawerContentProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<React.ComponentProps<typeof Drawer.Content>, keyof Render | keyof SuruUI>;
}

/**
 * {@link DrawerContent} に渡す props です。
 */
export type DrawerContentProps = DrawerContentProps.Render &
  DrawerContentProps.SuruUI &
  DrawerContentProps.BaseUI &
  DrawerContentProps.HTML;

export type IDrawerContent = IComponent<DrawerContentProps>;

/** ドロワー内のテキスト選択とスワイプ操作を分けるコンテンツコンポーネントです。 */
export const DrawerContent: IDrawerContent = (props) => {
  const ctx = useDrawerPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Drawer.Content
      {...otherProps}
      {...proxyRenderProps<Drawer.Content.State, DrawerContentState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <DrawerContentContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </DrawerContentContext>
          ),
          className: cn<DrawerContentState>(
            className,
            "sui_drawer_content",
            (state) => `sui_drawer_content-swipe_direction_${state.swipeDirection}`,
            (state) => state.swiping && "sui_drawer_content-swiping",
            (state) => state.nestedDrawerSwiping && "sui_drawer_content-nested_drawer_swiping",
            (state) => state.nestedDrawerOpen && "sui_drawer_content-nested_drawer_open",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_drawer_content-transition_status_${state.transitionStatus}`,
            (state) => state.expanded && "sui_drawer_content-expanded",
            (state) => state.open && "sui_drawer_content-open",
            (state) => state.nested && "sui_drawer_content-nested",
          ),
        },
      )}
    />
  );
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
