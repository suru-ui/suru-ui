import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type SelectContext, useSelectContext } from "../root/select.root.context.js";

/**
 * {@link SelectGroupLabel} が持つ状態です。
 */
export type SelectGroupLabelState = Override<SelectContext, BaseSelect.GroupLabel.State>;

export namespace SelectGroupLabelProps {
  export type Render = RenderProps<SelectGroupLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.GroupLabel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectGroupLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.GroupLabel>,
    keyof Render | keyof SuruUI | keyof BaseUI
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

/**
 * 選択肢グループの見出し要素です。
 */
export const SelectGroupLabel: ISelectGroupLabel = function SuiSelectGroupLabel(props) {
  const ctx = useSelectContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.GroupLabel
      {...otherProps}
      {...proxyRenderProps<BaseSelect.GroupLabel.State, SelectGroupLabelState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<SelectGroupLabelState>(
            className,
            "sui_select_group_label",
            (state) => `sui_select_group_label-size_${state.size}`,
            (state) => `sui_select_group_label-radius_${state.radius}`,
            (state) => `sui_select_group_label-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_group_label-outlined",
          ),
        },
      )}
    />
  );
};

export { SelectGroupLabel as GroupLabel };

export namespace GroupLabel {
  export type State = SelectGroupLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectGroupLabelProps.Render;

    export type SuruUI = SelectGroupLabelProps.SuruUI;

    export type BaseUI = SelectGroupLabelProps.BaseUI;

    export type HTML = SelectGroupLabelProps.HTML;
  }
}
