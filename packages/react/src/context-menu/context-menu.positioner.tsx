import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ContextMenuPositioner} が持つ状態です。
 */
export type ContextMenuPositionerState = ContextMenu.Positioner.State;

export namespace ContextMenuPositionerProps {
  export type Render = RenderProps<ContextMenuPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.Positioner>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // UseAnchorPositioningSharedParameters:
      | "anchor"
      | "positionMethod"
      | "side"
      | "sideOffset"
      | "align"
      | "alignOffset"
      | "collisionBoundary"
      | "collisionPadding"
      | "sticky"
      | "arrowPadding"
      | "disableAnchorTracking"
      | "collisionAvoidance",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuPositioner} に渡す props です。
 */
export type ContextMenuPositionerProps = ContextMenuPositionerProps.Render &
  ContextMenuPositionerProps.SuruUI &
  ContextMenuPositionerProps.BaseUI &
  ContextMenuPositionerProps.HTML;

/**
 * ポップアップを右クリックまたは長押しした位置に合わせる要素です。
 */
export const ContextMenuPositioner: IComponent<ContextMenuPositionerProps> =
  function SuiContextMenuPositioner(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.Positioner
        {...otherProps}
        className={cn(className, "sui_context_menu_positioner")}
      />
    );
  };

export { ContextMenuPositioner as Positioner };

export namespace Positioner {
  export type State = ContextMenuPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuPositionerProps.Render;

    export type SuruUI = ContextMenuPositionerProps.SuruUI;

    export type BaseUI = ContextMenuPositionerProps.BaseUI;

    export type HTML = ContextMenuPositionerProps.HTML;
  }
}
