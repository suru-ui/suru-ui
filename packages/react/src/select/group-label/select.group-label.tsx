import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectGroupContext } from "../group/select.group.context.js";
import { SelectGroupLabelContext } from "./select.group-label.context.js";

/**
 * {@link SelectGroupLabel} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectGroupLabelState<TValue = any> = SelectGroupLabelContext<TValue>;

export namespace SelectGroupLabelProps {
  export type Render<TValue = any> = RenderProps<SelectGroupLabelState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.GroupLabel>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectGroupLabelProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.GroupLabel>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link SelectGroupLabel} に渡す props です。
 */
export type SelectGroupLabelProps = SelectGroupLabelProps.Render &
  SelectGroupLabelProps.SuruUI &
  SelectGroupLabelProps.BaseUI &
  SelectGroupLabelProps.HTML;

export type ISelectGroupLabel = IComponent<SelectGroupLabelProps>;

/** 選択肢グループの見出し要素です。 */
export const SelectGroupLabel: ISelectGroupLabel = (props) => {
  const ctx = useSelectGroupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.GroupLabel
      {...otherProps}
      {...proxyRenderProps<BaseSelect.GroupLabel.State, SelectGroupLabelState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectGroupLabelContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectGroupLabelContext>
          ),
          className: cn<SelectGroupLabelState>(
            className,
            "sui_select_group_label",
            (state) => `sui_select_group_label-size_${state.size}`,
            (state) => `sui_select_group_label-radius_${state.radius}`,
            (state) => `sui_select_group_label-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_group_label-outlined",
            (state) => state.open && "sui_select_group_label-open",
            (state) => state.anchorHidden && "sui_select_group_label-anchor_hidden",
            (state) => `sui_select_group_label-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_select_group_label-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_select_group_label-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { SelectGroupLabel as GroupLabel };
export namespace GroupLabel {
  export type State<TValue = any> = SelectGroupLabelState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectGroupLabelProps.Render<TValue>;

    export type SuruUI = SelectGroupLabelProps.SuruUI;

    export type BaseUI = SelectGroupLabelProps.BaseUI;

    export type HTML = SelectGroupLabelProps.HTML;
  }
}
