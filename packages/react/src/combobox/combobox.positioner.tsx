import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type ComboboxContext, useComboboxContext } from "./combobox.context.js";

/**
 * {@link ComboboxPositioner} の状態です。
 */
export type ComboboxPositionerState = Override<ComboboxContext, Combobox.Positioner.State>;

export namespace ComboboxPositionerProps {
  export type Render = RenderProps<ComboboxPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Positioner>,
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
    React.ComponentProps<typeof Combobox.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxPositioner} に渡す props です。
 */
export type ComboboxPositionerProps = ComboboxPositionerProps.Render &
  ComboboxPositionerProps.SuruUI &
  ComboboxPositionerProps.BaseUI &
  ComboboxPositionerProps.HTML;

export type IComboboxPositioner = IComponent<ComboboxPositionerProps>;

/**
 * ポップアップを入力欄へ位置合わせする要素です。
 */
export const ComboboxPositioner: IComboboxPositioner = function SuiComboboxPositioner(props) {
  const ctx = useComboboxContext();
  const {
    side = "bottom",
    align = "start",
    style,
    render,
    className,
    sideOffset = 8,
    ...otherProps
  } = props;

  return (
    <Combobox.Positioner
      {...otherProps}
      side={side}
      align={align}
      {...proxyRenderProps<Combobox.Positioner.State, ComboboxPositionerState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ComboboxPositionerState>(
            className,
            "sui_combobox_positioner",
            (state) => state.open && "sui_combobox_positioner-open",
            (state) => `sui_combobox_positioner-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_combobox_positioner-align_${state.align}`,
            (state) => state.anchorHidden && "sui_combobox_positioner-anchorhidden",
            (state) => state.empty && "sui_combobox_positioner-empty",
          ),
        },
      )}
      sideOffset={sideOffset}
    />
  );
};

export { ComboboxPositioner as Positioner };

export namespace Positioner {
  export type State = ComboboxPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxPositionerProps.Render;

    export type SuruUI = ComboboxPositionerProps.SuruUI;

    export type BaseUI = ComboboxPositionerProps.BaseUI;

    export type HTML = ComboboxPositionerProps.HTML;
  }
}
