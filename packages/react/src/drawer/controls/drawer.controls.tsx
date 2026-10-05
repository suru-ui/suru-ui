import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link DrawerControls} が持つ状態です。
 */
export type DrawerControlsState = {};

export namespace DrawerControlsProps {
  export type Render = RenderProps<DrawerControlsState>;

  export type SuruUI = {
    /**
     * 絶対位置として配置するかを指定します。
     *
     * @default true
     */
    absolute?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerControls} に渡す props です。
 */
export type DrawerControlsProps = DrawerControlsProps.Render &
  DrawerControlsProps.SuruUI &
  DrawerControlsProps.BaseUI &
  DrawerControlsProps.HTML;

export type IDrawerControls = IComponent<DrawerControlsProps>;

/**
 * ドロワーのコントロールコンポーネントです。
 */
export const DrawerControls: IDrawerControls = function SuiDrawerControls(props) {
  const { absolute = true, ...otherDivProps } = props;

  return useRender({
    props: [
      otherDivProps,
      {
        className: cn(
          "sui_drawer_controls",
          absolute && "sui_drawer_controls-absolute",
          !absolute && "sui_drawer_controls-relative",
        ),
      },
    ],
    defaultTagName: "div",
  });
};

export { DrawerControls as Controls };

export namespace Controls {
  export type State = DrawerControlsState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerControlsProps.Render;

    export type SuruUI = DrawerControlsProps.SuruUI;

    export type BaseUI = DrawerControlsProps.BaseUI;

    export type HTML = DrawerControlsProps.HTML;
  }
}
