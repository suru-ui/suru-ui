import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectItemContext } from "../item/select.item.context.js";
import { SelectItemTextContext } from "./select.item-text.context.js";

/**
 * {@link SelectItemText} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectItemTextState<TValue = any> = SelectItemTextContext<TValue>;

export namespace SelectItemTextProps {
  export type Render<TValue = any> = RenderProps<SelectItemTextState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.ItemText>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectItemTextProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.ItemText>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link SelectItemText} に渡す props です。
 */
export type SelectItemTextProps = SelectItemTextProps.Render &
  SelectItemTextProps.SuruUI &
  SelectItemTextProps.BaseUI &
  SelectItemTextProps.HTML;

export type ISelectItemText = IComponent<SelectItemTextProps>;

/** 選択肢の表示テキストを包む要素です。 */
export const SelectItemText: ISelectItemText = (props) => {
  const ctx = useSelectItemContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.ItemText
      {...otherProps}
      {...proxyRenderProps<BaseSelect.ItemText.State, SelectItemTextState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectItemTextContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectItemTextContext>
          ),
          className: cn<SelectItemTextState>(
            className,
            "sui_select_item_text",
            (state) => `sui_select_item_text-size_${state.size}`,
            (state) => `sui_select_item_text-radius_${state.radius}`,
            (state) => `sui_select_item_text-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_item_text-outlined",
            (state) => state.disabled && "sui_select_item_text-disabled",
            (state) => state.selected && "sui_select_item_text-selected",
            (state) => state.highlighted && "sui_select_item_text-highlighted",
            (state) => state.open && "sui_select_item_text-open",
            (state) => state.anchorHidden && "sui_select_item_text-anchor_hidden",
            (state) => `sui_select_item_text-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_select_item_text-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_select_item_text-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { SelectItemText as ItemText };
export namespace ItemText {
  export type State<TValue = any> = SelectItemTextState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectItemTextProps.Render<TValue>;

    export type SuruUI = SelectItemTextProps.SuruUI;

    export type BaseUI = SelectItemTextProps.BaseUI;

    export type HTML = SelectItemTextProps.HTML;
  }
}
