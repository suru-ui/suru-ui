import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectPortalContext } from "../portal/select.portal.context.js";
import { SelectPositionerContext } from "./select.positioner.context.js";

/**
 * {@link SelectPositioner} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectPositionerState<TValue = any> = SelectPositionerContext<TValue>;

export namespace SelectPositionerProps {
  export type Render<TValue = any> = RenderProps<SelectPositionerState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.Positioner>,
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
      // SelectPositionerProps より:
      | "alignItemWithTrigger"
    >,
    keyof Render | keyof SuruUI
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
  const ctx = useSelectPortalContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Positioner
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Positioner.State, SelectPositionerState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectPositionerContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectPositionerContext>
          ),
          className: cn<SelectPositionerState>(
            className,
            "sui_select_positioner",
            (state) => `sui_select_positioner-size_${state.size}`,
            (state) => `sui_select_positioner-radius_${state.radius}`,
            (state) => `sui_select_positioner-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_positioner-outlined",
            (state) => state.open && "sui_select_positioner-open",
            (state) => state.anchorHidden && "sui_select_positioner-anchor_hidden",
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
  export type State<TValue = any> = SelectPositionerState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectPositionerProps.Render<TValue>;

    export type SuruUI = SelectPositionerProps.SuruUI;

    export type BaseUI = SelectPositionerProps.BaseUI;

    export type HTML = SelectPositionerProps.HTML;
  }
}
