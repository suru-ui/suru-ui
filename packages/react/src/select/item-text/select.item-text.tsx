import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectContext } from "../root/select.root.context.js";
import { SelectItemTextContext } from "./select.item-text.context.js";

/**
 * {@link SelectItemText} が持つ状態です。
 */
export type SelectItemTextState = SelectItemTextContext;

export namespace SelectItemTextProps {
  export type Render = RenderProps<SelectItemTextState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.ItemText>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectItemTextProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.ItemText>,
    keyof Render | keyof SuruUI | keyof BaseUI
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

/**
 * 選択肢の表示テキストを包む要素です。
 */
export const SelectItemText: ISelectItemText = function SuiSelectItemText(props) {
  const ctx = useSelectContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.ItemText
      {...otherProps}
      {...proxyRenderProps<BaseSelect.ItemText.State, SelectItemTextState>(
        (state) => ({ ...ctx, ...state }),
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
          ),
        },
      )}
    />
  );
};

export { SelectItemText as ItemText };

export namespace ItemText {
  export type State = SelectItemTextState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectItemTextProps.Render;

    export type SuruUI = SelectItemTextProps.SuruUI;

    export type BaseUI = SelectItemTextProps.BaseUI;

    export type HTML = SelectItemTextProps.HTML;
  }
}
