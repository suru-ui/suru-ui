import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectListContext } from "../list/select.list.context.js";
import { SelectGroupContext } from "./select.group.context.js";

/**
 * {@link SelectGroup} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectGroupState<TValue = any> = SelectGroupContext<TValue>;

export namespace SelectGroupProps {
  export type Render<TValue = any> = RenderProps<SelectGroupState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.Group>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectGroupProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectGroup} に渡す props です。
 */
export type SelectGroupProps = SelectGroupProps.Render &
  SelectGroupProps.SuruUI &
  SelectGroupProps.BaseUI &
  SelectGroupProps.HTML;

export type ISelectGroup = IComponent<SelectGroupProps>;

/**
 * 関連する選択肢をまとめるグループ要素です。
 */
export const SelectGroup: ISelectGroup = function SuiSelectGroup(props) {
  const ctx = useSelectListContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Group
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Group.State, SelectGroupState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectGroupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectGroupContext>
          ),
          className: cn<SelectGroupState>(
            className,
            "sui_select_group",
            (state) => `sui_select_group-size_${state.size}`,
            (state) => `sui_select_group-radius_${state.radius}`,
            (state) => `sui_select_group-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_group-outlined",
            (state) => state.open && "sui_select_group-open",
            (state) => state.anchorHidden && "sui_select_group-anchor_hidden",
            (state) => `sui_select_group-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_select_group-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_select_group-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { SelectGroup as Group };

export namespace Group {
  export type State<TValue = any> = SelectGroupState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectGroupProps.Render<TValue>;

    export type SuruUI = SelectGroupProps.SuruUI;

    export type BaseUI = SelectGroupProps.BaseUI;

    export type HTML = SelectGroupProps.HTML;
  }
}
