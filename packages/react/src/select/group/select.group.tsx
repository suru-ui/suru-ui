import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type SelectContext, useSelectContext } from "../root/select.root.context.js";

/**
 * {@link SelectGroup} が持つ状態です。
 */
export type SelectGroupState = Override<SelectContext, BaseSelect.Group.State>;

export namespace SelectGroupProps {
  export type Render = RenderProps<SelectGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
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
  const ctx = useSelectContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Group
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Group.State, SelectGroupState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<SelectGroupState>(
            className,
            "sui_select_group",
            (state) => `sui_select_group-size_${state.size}`,
            (state) => `sui_select_group-radius_${state.radius}`,
            (state) => `sui_select_group-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_group-outlined",
          ),
        },
      )}
    />
  );
};

export { SelectGroup as Group };

export namespace Group {
  export type State = SelectGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectGroupProps.Render;

    export type SuruUI = SelectGroupProps.SuruUI;

    export type BaseUI = SelectGroupProps.BaseUI;

    export type HTML = SelectGroupProps.HTML;
  }
}
