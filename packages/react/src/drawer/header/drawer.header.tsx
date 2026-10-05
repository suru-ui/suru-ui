import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import type { IComponent } from "../../types.js";

/**
 * {@link DrawerHeader} が持つ状態です。
 */
export type DrawerHeaderState = {};

export namespace DrawerHeaderProps {
  export type Render = RenderProps<DrawerHeaderState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerHeader} に渡す props です。
 */
export type DrawerHeaderProps = DrawerHeaderProps.Render &
  DrawerHeaderProps.SuruUI &
  DrawerHeaderProps.BaseUI &
  DrawerHeaderProps.HTML;

export type IDrawerHeader = IComponent<DrawerHeaderProps>;

/**
 * ドロワーのヘッダーコンポーネントです。
 */
export const DrawerHeader: IDrawerHeader = function SuiDrawerHeader(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_drawer_header",
      },
    ],
    defaultTagName: "div",
  });
};

export { DrawerHeader as Header };

export namespace Header {
  export type State = DrawerHeaderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerHeaderProps.Render;

    export type SuruUI = DrawerHeaderProps.SuruUI;

    export type BaseUI = DrawerHeaderProps.BaseUI;

    export type HTML = DrawerHeaderProps.HTML;
  }
}
