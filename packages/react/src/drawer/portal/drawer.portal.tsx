import { Drawer } from "@base-ui/react/drawer";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link DrawerPortal} が持つ状態です。
 */
export type DrawerPortalState = Drawer.Portal.State;

export namespace DrawerPortalProps {
  export type Render = RenderProps<DrawerPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Drawer.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DrawerPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Drawer.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DrawerPortal} に渡す props です。
 */
export type DrawerPortalProps = DrawerPortalProps.Render &
  DrawerPortalProps.SuruUI &
  DrawerPortalProps.BaseUI &
  DrawerPortalProps.HTML;

export type IDrawerPortal = IComponent<DrawerPortalProps>;

/**
 * ドロワーを DOM の別の場所に配置するコンポーネントです。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const DrawerPortal: IDrawerPortal = function SuiDrawerPortal(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Drawer.Portal
      {...otherProps}
      className={cn(className, "sui_drawer_portal")}
      data-scope={dataScope}
    />
  );
};

export { DrawerPortal as Portal };

export namespace Portal {
  export type State = DrawerPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DrawerPortalProps.Render;

    export type SuruUI = DrawerPortalProps.SuruUI;

    export type BaseUI = DrawerPortalProps.BaseUI;

    export type HTML = DrawerPortalProps.HTML;
  }
}
