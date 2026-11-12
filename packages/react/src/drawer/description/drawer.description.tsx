import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useDrawerHeaderContext } from "../header/drawer.header.context.js";
import { DrawerDescriptionContext } from "./drawer.description.context.js";

/**
 * {@link DrawerDescription} が持つ状態です。
 */
export type DrawerDescriptionState = DrawerDescriptionContext;

export namespace DrawerDescriptionProps {
  export type Render = RenderProps<DrawerDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Drawer.Description>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // DrawerDescriptionProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Description>,
    keyof Render | keyof SuruUI
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

/** ドロワーの内容を表示するコンポーネントです。 */
export const DrawerDescription: IDrawerDescription = (props) => {
  const ctx = useDrawerHeaderContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Drawer.Description
      {...otherProps}
      {...proxyRenderProps<Drawer.Description.State, DrawerDescriptionState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <DrawerDescriptionContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="p"
              />
            </DrawerDescriptionContext>
          ),
          className: cn<DrawerDescriptionState>(
            className,
            "sui_drawer_description",
            (state) => `sui_drawer_description-swipe_direction_${state.swipeDirection}`,
            (state) => state.swiping && "sui_drawer_description-swiping",
            (state) => state.nestedDrawerSwiping && "sui_drawer_description-nested_drawer_swiping",
            (state) => state.nestedDrawerOpen && "sui_drawer_description-nested_drawer_open",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_drawer_description-transition_status_${state.transitionStatus}`,
            (state) => state.expanded && "sui_drawer_description-expanded",
            (state) => state.open && "sui_drawer_description-open",
            (state) => state.nested && "sui_drawer_description-nested",
          ),
        },
      )}
    />
  );
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
