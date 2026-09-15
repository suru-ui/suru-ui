import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link DrawerFooter} が持つ状態です。
 */
export type DrawerFooterState = {};

export namespace DrawerFooterProps {
  export type Render = RenderProps<DrawerFooterState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerFooter} に渡す props です。
 */
export type DrawerFooterProps = DrawerFooterProps.Render &
  DrawerFooterProps.SuruUI &
  DrawerFooterProps.BaseUI &
  DrawerFooterProps.HTML;

/**
 * ドロワーのフッターコンポーネントです。
 */
export const DrawerFooter: IComponent<DrawerFooterProps> = function SuiDrawerFooter(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_drawer_footer",
      },
    ],
    defaultTagName: "div",
  });
};

export { DrawerFooter as Footer };

export namespace Footer {
  export type State = DrawerFooterState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerFooterProps.Render;

    export type SuruUI = DrawerFooterProps.SuruUI;

    export type BaseUI = DrawerFooterProps.BaseUI;

    export type HTML = DrawerFooterProps.HTML;
  }
}
