import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectGroupContext } from "../group/select.group.context.js";
import { useSelectListContext } from "../list/select.list.context.js";
import { SelectSeparatorContext } from "./select.separator.context.js";

/**
 * {@link SelectSeparator} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectSeparatorState<TValue = any> = SelectSeparatorContext<TValue>;

export namespace SelectSeparatorProps {
  export type Render<TValue = any> = RenderProps<SelectSeparatorState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.Separator>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectSeparatorProps より:
      "orientation"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectSeparator} に渡す props です。
 */
export type SelectSeparatorProps = SelectSeparatorProps.Render &
  SelectSeparatorProps.SuruUI &
  SelectSeparatorProps.BaseUI &
  SelectSeparatorProps.HTML;

export type ISelectSeparator = IComponent<SelectSeparatorProps>;

/**
 * 項目やグループを区切る要素です。
 */
export const SelectSeparator: ISelectSeparator = function SuiSelectSeparator(props) {
  const listCtx = useSelectListContext();
  const groupCtx = useSelectGroupContext(true);
  const ctx = groupCtx || listCtx;
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Separator
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Separator.State, SelectSeparatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectSeparatorContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectSeparatorContext>
          ),
          className: cn<SelectSeparatorState>(
            className,
            "sui_select_separator",
            (state) => `sui_select_separator-size_${state.size}`,
            (state) => `sui_select_separator-radius_${state.radius}`,
            (state) => `sui_select_separator-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_separator-outlined",
            (state) => state.open && "sui_select_separator-open",
            (state) => state.anchorHidden && "sui_select_separator-anchor_hidden",
            (state) => `sui_select_separator-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_select_separator-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_select_separator-transition_status_${state.transitionStatus}`,
            (state) => `sui_select_separator-orientation_${state.orientation}`,
          ),
        },
      )}
    />
  );
};

export { SelectSeparator as Separator };

export namespace Separator {
  export type State<TValue = any> = SelectSeparatorState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectSeparatorProps.Render<TValue>;

    export type SuruUI = SelectSeparatorProps.SuruUI;

    export type BaseUI = SelectSeparatorProps.BaseUI;

    export type HTML = SelectSeparatorProps.HTML;
  }
}
