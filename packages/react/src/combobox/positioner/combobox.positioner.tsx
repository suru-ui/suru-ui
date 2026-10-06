import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxContext } from "../root/combobox.root.context.js";
import { ComboboxPositionerContext } from "./combobox.positioner.context.js";

/**
 * {@link ComboboxPositioner} の状態です。
 */
export type ComboboxPositionerState = ComboboxPositionerContext;

export namespace ComboboxPositionerProps {
  export type Render = RenderProps<ComboboxPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Positioner>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // UseAnchorPositioningSharedParameters より:
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
      | "collisionAvoidance"
    >,
    keyof Render | keyof SuruUI
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
          render: (htmlProps, state) => (
            <ComboboxPositionerContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ComboboxPositionerContext>
          ),
          className: cn<ComboboxPositionerState>(
            className,
            "sui_combobox_positioner",
            (state) => state.open && "sui_combobox_positioner-open",
            (state) => `sui_combobox_positioner-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_combobox_positioner-align_${state.align}`,
            (state) => state.anchorHidden && "sui_combobox_positioner-anchor_hidden",
            (state) => state.empty && "sui_combobox_positioner-empty",
            (state) => `sui_combobox_positioner-size_${state.size}`,
            (state) => `sui_combobox_positioner-color_${state.color}`,
            (state) => `sui_combobox_positioner-radius_${state.radius}`,
            (state) => `sui_combobox_positioner-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_positioner-outlined",
            (state) => state.multiple && "sui_combobox_positioner-multiple",
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
