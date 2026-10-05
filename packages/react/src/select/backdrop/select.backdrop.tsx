import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectContext } from "../root/select.root.context.js";
import { SelectBackdropContext } from "./select.backdrop.context.js";

/**
 * {@link SelectBackdrop} が持つ状態です。
 */
export type SelectBackdropState = SelectBackdropContext;

export namespace SelectBackdropProps {
  export type Render = RenderProps<SelectBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectBackdropProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectBackdrop} に渡す props です。
 */
export type SelectBackdropProps = SelectBackdropProps.Render &
  SelectBackdropProps.SuruUI &
  SelectBackdropProps.BaseUI &
  SelectBackdropProps.HTML;

export type ISelectBackdrop = IComponent<SelectBackdropProps>;

/**
 * ポップアップの背後に表示される要素です。
 */
export const SelectBackdrop: ISelectBackdrop = function SuiSelectBackdrop(props) {
  const ctx = useSelectContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Backdrop
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Backdrop.State, SelectBackdropState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectBackdropContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectBackdropContext>
          ),
          className: cn<SelectBackdropState>(
            className,
            "sui_select_backdrop",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_select_backdrop-transition_status_${state.transitionStatus}`,
            (state) => `sui_select_backdrop-size_${state.size}`,
            (state) => `sui_select_backdrop-radius_${state.radius}`,
            (state) => `sui_select_backdrop-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_backdrop-outlined",
            (state) => state.open && "sui_select_backdrop-open",
          ),
        },
      )}
    />
  );
};

export { SelectBackdrop as Backdrop };

export namespace Backdrop {
  export type State = SelectBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectBackdropProps.Render;

    export type SuruUI = SelectBackdropProps.SuruUI;

    export type BaseUI = SelectBackdropProps.BaseUI;

    export type HTML = SelectBackdropProps.HTML;
  }
}
