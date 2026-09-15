import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link DrawerBody} が持つ状態です。
 */
export type DrawerBodyState = {};

export namespace DrawerBodyProps {
  export type Render = RenderProps<DrawerBodyState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerBody} に渡す props です。
 */
export type DrawerBodyProps = DrawerBodyProps.Render &
  DrawerBodyProps.SuruUI &
  DrawerBodyProps.BaseUI &
  DrawerBodyProps.HTML;

/**
 * ドロワーのボディーコンポーネントです。
 */
export const DrawerBody: IComponent<DrawerBodyProps> = function SuiDrawerBody(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_drawer_body",
      },
    ],
    defaultTagName: "div",
  });
};

export { DrawerBody as Body };

export namespace Body {
  export type State = DrawerBodyState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerBodyProps.Render;

    export type SuruUI = DrawerBodyProps.SuruUI;

    export type BaseUI = DrawerBodyProps.BaseUI;

    export type HTML = DrawerBodyProps.HTML;
  }
}
