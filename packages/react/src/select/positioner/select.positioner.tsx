import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type SelectContext, useSelectContext } from "../root/select.root.context.js";

/**
 * {@link SelectPositioner} が持つ状態です。
 */
export type SelectPositionerState = Override<SelectContext, BaseSelect.Positioner.State>;

export namespace SelectPositionerProps {
  export type Render = RenderProps<SelectPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Positioner>,
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
      | "collisionAvoidance"
      // SelectPositionerProps:
      | "alignItemWithTrigger",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectPositioner} に渡す props です。
 */
export type SelectPositionerProps = SelectPositionerProps.Render &
  SelectPositionerProps.SuruUI &
  SelectPositionerProps.BaseUI &
  SelectPositionerProps.HTML;

export type ISelectPositioner = IComponent<SelectPositionerProps>;

/**
 * ポップアップをトリガーへ位置合わせする要素です。
 */
export const SelectPositioner: ISelectPositioner = function SuiSelectPositioner(props) {
  const ctx = useSelectContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Positioner
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Positioner.State, SelectPositionerState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<SelectPositionerState>(
            className,
            "sui_select_positioner",
            (state) => `sui_select_positioner-size_${state.size}`,
            (state) => `sui_select_positioner-radius_${state.radius}`,
            (state) => `sui_select_positioner-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_positioner-outlined",
            (state) => state.open && "sui_select_positioner-open",
            (state) => state.anchorHidden && "sui_select_positioner-anchorhidden",
            (state) => `sui_select_positioner-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_select_positioner-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { SelectPositioner as Positioner };

export namespace Positioner {
  export type State = SelectPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectPositionerProps.Render;

    export type SuruUI = SelectPositionerProps.SuruUI;

    export type BaseUI = SelectPositionerProps.BaseUI;

    export type HTML = SelectPositionerProps.HTML;
  }
}
